# vscode-search-tree

🔎 **(Draft!)** VSCode extension to show the search results in a tree view

> The work on this extension is on-pause for now since VSCode team has put the [#20224](https://github.com/microsoft/vscode/issues/20224) issue into their *"Aug-2022 iteration"* [#157454](https://github.com/microsoft/vscode/issues/157454) to "Explore showing search results as a tree view". If this will be done in a VSCode core it would be ideal solution and this extension won't be needed.

## Issue

Currently, the search results in VSCode cannot be grouped in a Tree View structure. See https://github.com/microsoft/vscode/issues/20224.

Let me quote some folks:

> - *"holy sh∗t, how can this still be missing after 5 years... back to eclipse it is"* - fm-swe [[1](https://github.com/microsoft/vscode/issues/20224)]
> - *"Unfortunately no."* - leo-diehl [[2](https://stackoverflow.com/questions/54133206/any-way-to-view-vscode-find-in-files-results-organized-by-folder-hierarchy)]

## Suggestion

Add a possibility to show search results in a tree view, for faster and less overwhelming information lookup.

## Current state of the plugin

The code is super-raw, not optimized and not tested. Basically it is not ready to be published as of now. 

However, here is what was done currently:

- [x] Custom "Search Tree" view container in a side-bar
- [x] Custom command via `Cmd+Shift+P`: "Search Tree: Search"
- [x] Custom Input dialog for the search query
- [x] Custom hotkey: `Ctrl+Shift+F`
- [x] Custom search engine: via [fast-find-in-files](https://www.npmjs.com/package/fast-find-in-files) package
- [x] [Tree view provider](https://code.visualstudio.com/api/extension-guides/tree-view) was used
    - Custom numbers (of search results)
    - "Native" file icons
- [x] Open the file line in the code browser
- [x] Auto-scroll to and auto-highlight the found text

## Implementation issues

It is not clear (not possible, or at least not documented) how to do the following:

- [ ] Attach input field to the [TreeView](https://code.visualstudio.com/api/extension-guides/tree-view)
- [ ] Attach a custom view to the Search [view container](https://code.visualstudio.com/api/references/contribution-points#contributes.views)
- [ ] Re-use the VSCode Search [API](https://code.visualstudio.com/api/references/vscode-api)

## ToDo

- [ ] Make the Search Tree to be a part of Search view container
- [ ] Auto-focus on the Search Tree view when pressing `Ctrl+Shift+F`
- [ ] In-place (non-popup) input field
- [ ] Collapse/Expand all
- [ ] Light/Dark mode icons
- [ ] Search in specific folders (via regexp)
- [ ] Search in specific files (via regexp)
- [ ] Optimize search engine for large amount of files

## Developing

Install dependencies

```
npm install
```

Run the extension in the development mode in VSCode

```
"Run and Debug" → "Run Extension"
```

## Docs

- [VSCode Extension API](https://code.visualstudio.com/api)
