# Theia

基于 [Theia](https://theia-ide.org/) 的代码编辑器。

## 先决条件

请安装所有必要的[先决条件](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites)。

## 运行程序

```bash
pnpm build
pnpm start
```

## 开发应用

```bash
pnpm watch
pnpm start
```

## 安装第三方扩展

应用已启用 Theia 的插件宿主、VS Code 扩展兼容层和 Open VSX 扩展市场。启动后打开左侧活动栏的 Extensions 视图，搜索需要的扩展并点击 Install 即可安装。

应用内置了 Chinese (Simplified) Language Pack，并将默认界面语言设置为简体中文。应用还会下载 `vscode-builtin-extensions`，用于补齐 VS Code 内置扩展能力，其中包括提供 Git 集成的 `vscode.git` 和 `vscode.git-base`。构建时会通过 `pnpm --filter theia-electron download:plugins` 下载内置扩展，启动时会从 `electron/plugins` 加载。

## Theia 官方扩展

以 `theia-ide` 完全体为参照，当前项目已经引入以下官方扩展。

直接引入：

```text
@theia/core
@theia/editor
@theia/electron
@theia/filesystem
@theia/markers
@theia/messages
@theia/monaco
@theia/navigator
@theia/plugin-ext
@theia/plugin-ext-vscode
@theia/preferences
@theia/process
@theia/terminal
@theia/vsx-registry
@theia/workspace
```

间接引入：

```text
@theia/ai-core
@theia/ai-mcp
@theia/bulk-edit
@theia/callhierarchy
@theia/console
@theia/debug
@theia/editor-preview
@theia/file-search
@theia/notebook
@theia/outline-view
@theia/output
@theia/scm
@theia/search-in-workspace
@theia/task
@theia/terminal-manager
@theia/test
@theia/timeline
@theia/typehierarchy
@theia/userstorage
@theia/variable-resolver
```

相比 `theia-ide` 完全体，当前项目尚未引入：

```text
@theia/ai-anthropic
@theia/ai-chat
@theia/ai-chat-ui
@theia/ai-claude-code
@theia/ai-code-completion
@theia/ai-codex
@theia/ai-copilot
@theia/ai-core-ui
@theia/ai-editor
@theia/ai-google
@theia/ai-history
@theia/ai-huggingface
@theia/ai-ide
@theia/ai-llamafile
@theia/ai-mcp-server
@theia/ai-mcp-ui
@theia/ai-ollama
@theia/ai-openai
@theia/ai-scanoss
@theia/ai-terminal
@theia/ai-vercel-ai
@theia/collaboration
@theia/dev-container
@theia/external-terminal
@theia/getting-started
@theia/keymaps
@theia/memory-inspector
@theia/metrics
@theia/mini-browser
@theia/plugin-dev
@theia/preview
@theia/property-view
@theia/remote
@theia/remote-wsl
@theia/scanoss
@theia/secondary-window
@theia/toolbar
```

产品侧扩展没有沿用 `theia-ide-*`，当前项目使用：

```text
theia-extension-workbench-layout
theia-extension-zh-cn-language-pack
```
