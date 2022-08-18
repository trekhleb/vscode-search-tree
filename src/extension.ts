import * as vscode from 'vscode'

import { SearchTreeProvider } from './SearchTreeProvider'

export function activate(context: vscode.ExtensionContext) {
	// Get the project root folder path.
	const workspaceFolders: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders
	const rootPath = (workspaceFolders && workspaceFolders.length) ? workspaceFolders[0].uri.fsPath : undefined

	// Register the Tree Data Provider for search.
	const searchTreeProvider = new SearchTreeProvider(rootPath)
	vscode.window.registerTreeDataProvider('searchTreeResults', searchTreeProvider)

	// Register the "Search" command.
	vscode.commands.registerCommand('searchTree.search', () => {
		const opts: vscode.InputBoxOptions = {
			title: 'Search Tree',
			placeHolder: 'Search',
		}
		vscode.window.showInputBox(opts).then((searchInput: string | undefined) => {
			searchTreeProvider.search(searchInput)
		})
	})

	// Register the "Open File" command.
	vscode.commands.registerCommand('searchTree.openFile', (resource: vscode.Uri, options: vscode.TextDocumentShowOptions) => {
		vscode.window.showTextDocument(resource, options)
	});
}

export function deactivate() {}
