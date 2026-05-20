# 工作台布局扩展

当前产品级别的 Theia 工作台布局定制。

目前只定制官方 `@theia/outline-view` 大纲视图：

- 启动时默认隐藏大纲。
- 手动打开大纲时默认放左侧。
- 其他大纲功能继续使用 Theia 官方实现。

实现入口：

- `src/browser/outline-view-contribution.ts`：覆盖大纲默认布局。
- `src/browser/frontend-module.ts`：把官方大纲贡献替换为自定义贡献。
