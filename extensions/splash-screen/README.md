# 启动页扩展

为 Electron 版 ChatPython 注入独立启动页窗口。

Theia 官方已经支持 `splashScreenOptions`，这个扩展在 Electron main 阶段补齐产品默认配置，避免把启动页逻辑散落在生成代码或启动脚本里。

行为说明：

- 启动时创建独立的透明无边框 splash window。
- splash 内容加载 `electron/resources/splash.html`。
- 主窗口等前端 `ready` 后再显示，减少空白窗口闪现。
- 默认尺寸为 `480x288`，最短展示 `600ms`，最长等待 `30000ms`。

实现入口：

- `src/electron-main/splash-screen-electron-main-application.ts`：继承并包装 `ElectronMainApplication`，启动前注入 splash 配置。
- `src/electron-main/splash-screen-electron-main-module.ts`：在 Electron main 容器里替换默认应用实现。
- `../../electron/resources/splash.html`：启动页静态页面。
