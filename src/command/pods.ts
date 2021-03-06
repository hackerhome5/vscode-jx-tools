import * as vscode from 'vscode';
import { TerminalCache, executeInTerminal } from '../term';

export function openDevPod(terminals: TerminalCache) {
    console.log("Opening DevPod");

    const workspaces = vscode.workspace.workspaceFolders;
    let path = "";
    let name = "";
    if (workspaces) {
        for (let ws of workspaces) {
            let uri = ws.uri;
            name = ws.name;
            if (uri) {
                path = uri.fsPath;
                if (path) {
                    break;
                }
            }
        }
    }
    console.log(`found workspace folder ${path}`);

    const argsSync = ['sync'];
    executeInTerminal(terminals, argsSync, 'Sync: ' + name, true);

    let jxConfig  = vscode.workspace.getConfiguration("jx", 
        vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document.uri : null);
    var ports = '';
    if (jxConfig) {
        let portsValues = jxConfig['devPodPorts'];
        if (portsValues !== null && typeof portsValues !== 'undefined'){
            ports = portsValues.join(',');
        }
    }

    var  argsDevpod = ['create', 'devpod', '--reuse', '--sync'];
    if (ports !== null && ports !== '' && typeof ports !== 'undefined') {
        argsDevpod.push(`--ports=${ports}`);
    }
    executeInTerminal(terminals, argsDevpod, 'DevPod: ' + name);
}
