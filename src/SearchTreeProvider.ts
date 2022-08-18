import * as vscode from 'vscode'
import * as path from 'path'
import { fastFindInFiles } from 'fast-find-in-files'
import { Folder, Path, Query, SearchResult } from './types'
import { ctxToFileTree, fileTrieNodeToTreeItem } from './utils'
import { FileTrie, FileTrieNode } from './FileTrie'

export class SearchTreeProvider implements vscode.TreeDataProvider<FileTrieNode> {
	private results: FileTrie | undefined;
	private query: Query = ''

	private _onDidChangeTreeData: vscode.EventEmitter<FileTrieNode | undefined | null | void> = new vscode.EventEmitter<FileTrieNode | undefined | null | void>();
	
	readonly onDidChangeTreeData: vscode.Event<FileTrieNode | undefined | null | void> = this._onDidChangeTreeData.event

	constructor(private workspaceRoot: string | undefined) {}

	getTreeItem(element: FileTrieNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return fileTrieNodeToTreeItem(element)
	}

	getChildren(element?: FileTrieNode): Thenable<(FileTrieNode)[]> {
		return new Promise((resolve) => {
			if (!this.results) {
				// No results
				resolve([])
			} else if (element) {
				if (element.isLeaf()) {
					// Children (search result lines) of a FILE
					resolve(ctxToFileTree(this.query, element.ctx!))
				} else {
					// Children of FOLDER.
					resolve(Object.values(element.children))
				}
			} else {
				// Children of ROOT.
				resolve(Object.values(this.results.head.children))
			}
		});
	}

	search(query: Query | undefined): void {
		if (!query || !this.workspaceRoot) {
			return
		}

		this.query = query

		const search = async (query: Query, folder: Folder) => {
			// @see: https://www.npmjs.com/package/fast-find-in-files
			const results: SearchResult[] = fastFindInFiles(folder, query)
			
			const fileTrie = new FileTrie(query)
			results.forEach((result: SearchResult) => {
				const cleanPath: Path = result.filePath.replace(`${this.workspaceRoot}/`, '')
				fileTrie.add(result, cleanPath)
			})

			// dsfasdf

			this.results = fileTrie

			this._onDidChangeTreeData.fire()
		};

		search(query, this.workspaceRoot)
	}
}


