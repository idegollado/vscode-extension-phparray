// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const parser = require('fast-xml-parser');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('This is the console context');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('phparray.xml2php', function () {
		// The code you place here will be executed every time your command is executed
		var editor = vscode.window.activeTextEditor;
		// Display a message box to the user
		let xmlData = editor.document.getText(editor.selection);
		
		if(parser.validate(xmlData) === true) {
			const jsonData = parser.parse(xmlData, {
				ignoreNameSpace: true
			});
			const terminal = vscode.window.createTerminal("xml To php");
			const jsonString = JSON.stringify(jsonData);

			const phpArray = jsonString
			.replace(/\{/g,"[")
			.replace(/\}/g, "]")
			.replace(/:/g,"=>");

			terminal.sendText("echo " + phpArray)
			terminal.show(true) 
			vscode.window.showInformationMessage("xml to Php converted correctly!");
		} else {	
			vscode.window.showInformationMessage("Invalid xml data");	
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
