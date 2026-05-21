@/Users/green/.codex/RTK.md

# Theia 项目协作规范

## 基本原则

- 先阅读现有实现和配置，再做改动。
- 保持改动范围收敛，避免顺手重构无关代码。
- 不要回退用户或其他工具已经产生的改动。
- 新增或修改代码时，遵循本文件的代码、注释和提交规范。

## 代码与注释

- 生成代码尽量补充必要注释。
- 注释使用中文，短小精悍，只解释意图、原因和非显而易见的行为。
- 不写复述语法的注释。
- 修改已有行为时，同步更新附近过期注释。

## 构建与验证

- 使用 `pnpm` 执行项目脚本。
- 修改扩展后，优先运行对应 filter 的 build，例如：

```bash
rtk pnpm --filter theia-extension-plugin-loader build
```

- 修改 Electron 打包配置后，优先做静态检查；需要验证产物时再运行对应打包脚本。

## Electron 目录

- `electron/lib`、`electron/plugins`、`electron/dist` 属于构建或下载产物，默认不提交。
- `electron/resources` 只保留 electron-builder 默认会使用的根目录资源，例如 `icon.icns`、`icon.ico`。
- 如果能依赖 electron-builder 默认规则，就不要额外写显式资源路径。

## 提交日志

- 使用 Conventional Commits：`type(scope): summary`。
- `summary` 用简洁中文，不加句号。
- 示例：

```text
feat(plugin-loader): 加载打包内置插件
build(electron): 精简默认打包资源
docs(gitignore): 补充忽略规则注释
```
