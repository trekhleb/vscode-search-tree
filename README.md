# vscode-search-tree

🔎 **(Draft!)** VSCode extension to show the search results in a tree view

## Issue

Currently, the search results in VSCode cannot be grouped in a Tree View structure.

See the https://github.com/microsoft/vscode/issues/20224 issue that is opened for *5+* years now.

Let me quote some folks:

> *"holy sh❋t, how can this still be missing after 5 years... back to eclipse it is"* - *fm-swe* [[1](https://github.com/microsoft/vscode/issues/20224)]
  
> *"Unfortunately no."* - *leo-diehl* [[2](https://stackoverflow.com/questions/54133206/any-way-to-view-vscode-find-in-files-results-organized-by-folder-hierarchy)]

## Suggestion

Add a possibility to show search results in a tree view, for faster information lookup.

## What was currently done

- Custom "Search Tree" view container in a side-bar
- Custom command: via Cmd+Shift+P: "Search Tree: Search"
- Custom Input dialog for the search query
- Custom hotkey: Ctrl+Shift+F
- Custom search engine: via https://www.npmjs.com/package/fast-find-in-files
- Tree view provider: https://code.visualstudio.com/api/extension-guides/tree-view
    - Custom folder icons
    - Custom numbers (of search results)
    - "Native" file icons via 
    - "Native" in-place search in the tree (just start typing while in the Search Tree panel)
- Open the file line in the code browser
- Auto-scroll to and auto-highlight the found text

## Implementation Issues

- Not possible (at least not documented): attach input field to the TreeView (https://code.visualstudio.com/api/extension-guides/tree-view)
- Not possible (at least not documented): attach a custom view to the Search view container (https://code.visualstudio.com/api/references/contribution-points#contributes.views)
- Not possible (at least not documented): re-use the Search API (https://code.visualstudio.com/api/references/vscode-api)

## @TODO

- Make the Search Tree to be a part of Search view container
- Auto-focus on the Search Tree view when Ctrl+Shift+F 
- In-place (non-popup) input field
- Collapse/Expand all
- Light/Dark mode icons
- Search in specific folders (via regexp)
- Search in specific files (via regexp)
- Auto-highlight the search phrase in the search result line

Docs: https://code.visualstudio.com/api