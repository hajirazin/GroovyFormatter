import * as vscode from 'vscode';

export default function formatter() {

    // 👎 formatter implemented as separate command
    vscode.commands.registerCommand('extension.format-groovy', () => {
        const { activeTextEditor } = vscode.window;
        vscode.window.showInformationMessage('In formatter, ' + (activeTextEditor && activeTextEditor.document.languageId));
        if (activeTextEditor && activeTextEditor.document.languageId === 'groovy') {
            const { document } = activeTextEditor;
            const firstLine = document.lineAt(0);

            if (firstLine.text !== '42') {
                const edit = new vscode.WorkspaceEdit();
                edit.insert(document.uri, firstLine.range.start, '42\n');

                return vscode.workspace.applyEdit(edit);
            }
        }
    });


    // 👍 formatter implemented using API
    vscode.languages.registerDocumentFormattingEditProvider('groovy', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {

            const firstLine = document.lineAt(0);
            if (firstLine.text !== '42') {
                return [vscode.TextEdit.insert(firstLine.range.start, '42\n')];
            }

            return [vscode.TextEdit.insert(firstLine.range.start, '')];
        }
    });
}