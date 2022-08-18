import * as vscode from 'vscode'
export interface QueryHit {
    link: string
    line: string
    lineNumber: number
    offset: number
}
export interface SearchResult {
    filePath: string
    totalHits: number
    queryHits: QueryHit[]
}

export type Query = string;
export type Folder = string;
export type Path = string
export type IconPath = string | vscode.Uri | { light: string | vscode.Uri; dark: string | vscode.Uri } | vscode.ThemeIcon;