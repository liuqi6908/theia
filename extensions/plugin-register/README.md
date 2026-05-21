# 内置插件注册扩展

把 `electron/plugins` 目录中的 VS Code 插件注册为 Theia 系统插件。

这个扩展用于替代在 Electron 启动脚本里直接设置 `THEIA_DEFAULT_PLUGINS` 的方式，让插件注册逻辑留在 Theia 扩展体系内。

行为说明：

- 开发模式下读取 `electron/plugins`。
- 打包后读取 `Resources/app/plugins`。
- 插件以 `local-dir:` 系统插件入口加入部署流程。
- 不修改插件文件，也不接管 Electron 主进程。

实现入口：

- `src/node/bundled-plugin-deployer-participant.ts`：根据运行环境解析内置插件目录，并注册系统插件入口。
- `src/node/plugin-register-backend-module.ts`：把部署参与者绑定到 Theia 后端容器。
