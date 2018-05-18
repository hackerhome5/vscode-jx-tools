'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const k8s = require('@kubernetes/client-node');

import { PipelineExplorer } from './PipelineExplorer';
import { openDevPod } from './OpenDevPod';
import { NotifyPromote } from './NotifyPromote';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-jx-tools" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposableActivity = new NotifyPromote().subscribe();
    context.subscriptions.push(disposableActivity);

    // add the Tree viewer
    let subscriptions = new PipelineExplorer().subscribe(context);
    
    subscriptions.push(vscode.commands.registerCommand('vsJenkinsX.openDevPod', openDevPod));

    subscriptions.forEach((element) => {
        context.subscriptions.push(element);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}