# Theia

基于 [Theia](https://theia-ide.org/) 的代码编辑器。

## 先决条件

请安装所有必要的[先决条件](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites)。

## 运行程序

```bash
pnpm compile
pnpm start
```

## 开发应用

```bash
pnpm dev
```

## 打包应用

```bash
pnpm build
```

- `pnpm dev`: 监听源码变化，重新编译并自动重启 Electron 客户端。
- `pnpm start`: 直接启动当前已编译产物，不监听变化。
- `pnpm compile`: 编译 Theia/Electron 可运行产物，不生成安装包。
- `pnpm build`: 使用 `electron-builder` 生成平台分发产物；在 macOS 上生成 `.dmg`/`.zip`，Windows/Linux 产物需要在对应平台或配套构建环境中生成。

## 安装第三方扩展

- 已启用插件宿主、VS Code 扩展兼容层和 Open VSX 扩展市场，可在 Extensions 视图中搜索并安装扩展。
- 构建时会下载 Chinese (Simplified) Language Pack，并将默认界面语言设置为简体中文。
- 构建时会下载 `vscode-builtin-extensions`，补齐 VS Code 内置扩展能力。当前保留基础编辑、Git、终端建议、Notebook、Python、SQL、Markdown/JSON/YAML/XML/HTML/CSS/TypeScript、dotenv/ini/log 等常用能力，并通过 `theiaPluginsExcludeIds` 排除 JavaScript Debugger、Extension Authoring、内置主题、Emmet、Less、SCSS、R、reStructuredText、C/C++、C#、Java、Go、Rust、Ruby、PHP、Docker、GitHub 增强等暂不需要的扩展。

## Theia 官方扩展

以 `theia-ide` 完全体为参照，当前项目已经显式引入以下官方扩展。

基础扩展：

```text
@theia/ai-core: AI 能力基础服务和通用模型/代理抽象。
@theia/ai-mcp: MCP 协议集成，连接 MCP 工具和服务。
@theia/bulk-edit: 批量编辑支持，用于重命名、代码操作等跨文件修改。
@theia/callhierarchy: 调用层级视图，查看函数/方法调用关系。
@theia/console: 控制台视图和控制台输出能力。
@theia/core: Theia 核心框架、依赖注入、命令、菜单、偏好等基础设施。
@theia/debug: 调试框架和 Debug 视图。
@theia/editor: 编辑器基础能力。
@theia/editor-preview: 编辑器预览标签页能力。
@theia/electron: Electron 桌面应用运行支持。
@theia/external-terminal: 打开系统外部终端。
@theia/file-search: 文件名快速搜索。
@theia/filesystem: 文件系统访问和文件服务。
@theia/markers: Problems/诊断标记视图。
@theia/messages: 通知、消息弹窗和消息服务。
@theia/monaco: Monaco 编辑器集成。
@theia/navigator: 文件资源管理器视图。
@theia/notebook: Notebook 基础支持。
@theia/outline-view: 当前文件符号大纲视图。
@theia/output: Output 输出面板。
@theia/plugin-ext: Theia 插件宿主基础能力。
@theia/plugin-ext-vscode: VS Code 扩展兼容层。
@theia/preferences: 设置/偏好系统和设置 UI。
@theia/process: 后端进程启动和管理支持。
@theia/scm: Source Control 源代码管理视图和 API。
@theia/search-in-workspace: 工作区全文搜索。
@theia/task: 任务系统，支持运行 task、构建、脚本等。
@theia/terminal: 内置终端。
@theia/terminal-manager: 终端实例管理。
@theia/test: 测试视图和测试 API。
@theia/timeline: Timeline 时间线视图。
@theia/typehierarchy: 类型层级视图。
@theia/userstorage: 用户级存储能力。
@theia/variable-resolver: 变量解析，例如任务/配置里的 ${workspaceFolder}。
@theia/vsx-registry: Open VSX 扩展市场集成。
@theia/workspace: 工作区打开、保存、管理能力。
```

相比 `theia-ide` 完全体，当前项目尚未引入：

```text
@theia/ai-anthropic: Anthropic/Claude 模型 provider 集成。
@theia/ai-chat: AI Chat 后端和聊天能力。
@theia/ai-chat-ui: AI Chat 前端 UI。
@theia/ai-claude-code: Claude Code 集成。
@theia/ai-code-completion: AI 代码补全能力。
@theia/ai-codex: OpenAI Codex 集成。
@theia/ai-copilot: GitHub Copilot 集成。
@theia/ai-core-ui: AI 基础 UI 组件和配置界面。
@theia/ai-editor: 编辑器内 AI 操作能力。
@theia/ai-google: Google/Gemini 模型 provider 集成。
@theia/ai-history: AI 对话和通信历史。
@theia/ai-huggingface: Hugging Face provider 集成。
@theia/ai-ide: AI IDE Agent 能力。
@theia/ai-llamafile: Llamafile 本地模型集成。
@theia/ai-mcp-server: 内置 MCP Server 能力。
@theia/ai-mcp-ui: MCP 工具/服务相关 UI。
@theia/ai-ollama: Ollama 本地模型集成。
@theia/ai-openai: OpenAI/OpenAI-compatible provider 集成。
@theia/ai-scanoss: SCANOSS AI 集成。
@theia/ai-terminal: 终端中的 AI 辅助能力。
@theia/ai-vercel-ai: Vercel AI SDK provider 集成。
@theia/collaboration: 多人实时协作能力。
@theia/dev-container: Dev Container 开发容器能力。
@theia/getting-started: 欢迎页/Getting Started 页面。
@theia/keymaps: 自定义快捷键映射支持。
@theia/memory-inspector: 内存检查器，偏嵌入式/调试场景。
@theia/metrics: Prometheus 指标端点和运行时 metrics。
@theia/mini-browser: 内置 Mini Browser 视图。
@theia/plugin-dev: Theia/VS Code 插件开发辅助能力。
@theia/preview: 文件预览能力。
@theia/property-view: 属性面板视图。
@theia/remote: 远程开发基础能力。
@theia/remote-wsl: WSL 远程开发能力。
@theia/scanoss: SCANOSS 开源合规/依赖扫描集成。
@theia/secondary-window: 二级窗口/多窗口支持。
@theia/toolbar: 顶部工具栏支持。
```

产品侧扩展没有沿用 `theia-ide-*`，当前项目使用：

```text
theia-extension-workbench-layout
theia-extension-zh-cn-language-pack
```
