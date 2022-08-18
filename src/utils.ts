import * as path from 'path'
import * as vscode from 'vscode'
import { FileTrieNode } from './FileTrie'
import { IconPath, Query, QueryHit, SearchResult } from './types'

const iconFile = path.join(__filename, '..', '..', 'resources', 'file.svg')
const iconFolderPath = path.join(__filename, '..', '..', 'resources', 'folder.svg')

export const fileTrieNodeToTreeItem = (fileTrieNode: FileTrieNode): vscode.TreeItem => {
	let iconPath: IconPath | undefined = undefined

	const description: string = fileTrieNode.isSearchLine ? fileTrieNode.description! : `(${fileTrieNode.findingsNum})` 

	let collapsibleState = vscode.TreeItemCollapsibleState.Collapsed
	if (fileTrieNode.isSearchLine) {
		collapsibleState = vscode.TreeItemCollapsibleState.None
		iconPath = new vscode.ThemeIcon('search-show-context')
	}

	let resourceUri: vscode.Uri | undefined = undefined
	if (new RegExp(/\.[a-z]{2,4}$/, 'ig').test(fileTrieNode.path || '')) {
		resourceUri = vscode.Uri.file(fileTrieNode.ctx?.filePath || '')
		iconPath = new vscode.ThemeIcon('file')
	} else if (!fileTrieNode.isLeaf()) {
		resourceUri = vscode.Uri.file(fileTrieNode.ctx?.filePath || '')
	}

	const label: vscode.TreeItemLabel = {
		label: fileTrieNode.path || '',
	}

	let command: vscode.Command | undefined = undefined
	if (fileTrieNode.isSearchLine) {
		const uri = vscode.Uri.file(fileTrieNode.ctx?.filePath || '')

		const lineNumber: number = (fileTrieNode.lineNumber || 0) - 1
		const offsetStart: number = fileTrieNode.offset || 0
		const offsetEnd: number = (fileTrieNode.offset || 0) + fileTrieNode.query.length

		const options: vscode.TextDocumentShowOptions = {
			selection: new vscode.Range(
				new vscode.Position(lineNumber, offsetStart),
				new vscode.Position(lineNumber, offsetEnd)
			),
		}

		label.highlights = [[offsetStart, offsetEnd]];

		command = {
			title: 'Open Line',
			command: 'searchTree.openFile',
			tooltip: 'Open Line',
			arguments: [uri, options],
		}
	}

	const treeItem: vscode.TreeItem = {
		label,
		collapsibleState,
		iconPath,
		description,
		resourceUri,
		command,
	}
	return treeItem
}

export const ctxToFileTree = (query: Query, ctx: SearchResult): FileTrieNode[] => { 
	const trieNodes: FileTrieNode[] = ctx.queryHits.map((queryHit: QueryHit) => {
		const node = new FileTrieNode(query, ctx, queryHit.line)
		node.isSearchLine = true
		// node.description = `[${queryHit.lineNumber}:${queryHit.offset}]`
		node.lineNumber = queryHit.lineNumber
		node.offset = queryHit.offset
		return node
	})
	return trieNodes
}