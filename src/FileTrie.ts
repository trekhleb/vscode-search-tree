import * as path from 'path'
import { Path, Query, SearchResult } from './types'

export class FileTrie {
	head: FileTrieNode
	query: Query

	constructor(query: Query) {
		this.head = new FileTrieNode('')
		this.query = query
	}

	add(ctx: SearchResult | undefined, filePath: Path) {
		const pathParts: string[] = filePath.split(path.sep)
		let node = this.head
		pathParts.forEach((pathPart: Path) => {
			node = node.has(pathPart) ? node.get(pathPart)! : node.add(this.query, ctx, pathPart)
		})

		this.recalculateFindingsNum(this.head)
	}

	recalculateFindingsNum(node: FileTrieNode): number {
		const children: FileTrieNode[] = Object.values(node.children)
		if (!children.length) {
			node.findingsNum = node.ctx?.totalHits || 0
			return node.findingsNum 
		}
		
		let nodeFindingsNum: number = 0
		for (let i = 0; i < children.length; i++) {
			nodeFindingsNum = nodeFindingsNum + this.recalculateFindingsNum(children[i])
		}
		node.findingsNum = nodeFindingsNum
		return node.findingsNum
	}
}

export class FileTrieNode {
	path: Path | undefined
	children: Record<Path, FileTrieNode>
	ctx: SearchResult | undefined
	findingsNum: number = 0
	description: string | undefined
	isSearchLine: boolean = false
	fullFilePath: string | undefined
	lineNumber: number | undefined
	offset: number | undefined
	query: Query

	constructor(query: Query, ctx?: SearchResult | undefined, filePath?: Path | undefined) {
		this.query = query
		this.path = filePath
		this.children = {}
		this.ctx = ctx
		this.description = undefined
	}

	has(filePath: Path): boolean {
		return !!this.children[filePath]
	}

	add(query: Query, ctx: SearchResult | undefined, filePath: Path,): FileTrieNode {
		const childNode = new FileTrieNode(query, ctx, filePath)
		this.children[filePath] = childNode
		return childNode
	}

	get(filePath: Path): FileTrieNode | undefined {
		return this.has(filePath) ? this.children[filePath] : undefined
	}

	isLeaf(): boolean {
		return !Object.keys(this.children).length
	}
}
