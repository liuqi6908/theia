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

- 已启用插件宿主、VS Code 扩展兼容层和 Open VSX 扩展市场，可在 Extensions 视图中搜索并安装扩展。
- 构建时会下载 Chinese (Simplified) Language Pack，并将默认界面语言设置为简体中文。
- 构建时会下载 `vscode-builtin-extensions`，补齐 VS Code 内置扩展能力，包括 Git 集成、内置语言支持、主题、调试、Emmet、Markdown/JSON/HTML/CSS/TypeScript 等常用能力。

## Theia 官方扩展

以 `theia-ide` 完全体为参照，当前项目已经显式引入以下官方扩展。

基础扩展：

```text
@theia/ai-core
@theia/ai-mcp
@theia/bulk-edit
@theia/callhierarchy
@theia/console
@theia/core
@theia/debug
@theia/editor
@theia/editor-preview
@theia/electron
@theia/file-search
@theia/filesystem
@theia/markers
@theia/messages
@theia/monaco
@theia/navigator
@theia/notebook
@theia/outline-view
@theia/output
@theia/plugin-ext
@theia/plugin-ext-vscode
@theia/preferences
@theia/process
@theia/scm
@theia/search-in-workspace
@theia/task
@theia/terminal
@theia/terminal-manager
@theia/test
@theia/timeline
@theia/typehierarchy
@theia/userstorage
@theia/variable-resolver
@theia/vsx-registry
@theia/workspace
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
