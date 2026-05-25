# ChatPython App Updater

该扩展用于给 Electron 版 ChatPython 接入强制自动更新。

## 目录

扩展按运行环境拆分：

- `common`：RPC Symbol token、接口、常量和工具函数。
- `electron-browser`：Electron 前端专用 UI、命令和贡献。
- `electron-main`：Electron 主进程专用服务与系统能力接入。

## 关键入口

- `src/index.ts`：公共 `common` API 出口，供其他扩展按包名导入。
- `src/electron-browser/index.ts`：Electron 前端 API 出口，供其他前端扩展注入更新服务。
- `src/electron-main/index.ts`：Electron 主进程 API 出口，供需要扩展更新服务实现的模块使用。
- `src/common/app-updater-rpc.ts`：定义前后端共用的 RPC Symbol token 与接口。
- `src/electron-browser/app-updater-frontend-module.ts`：绑定前端服务、Widget 和后端 RPC proxy。
- `src/electron-browser/app-updater-frontend-client.ts`：提供前端命令和 UI 可调用的更新动作。
- `src/electron-browser/app-updater-repo-client.ts`：保存前端更新状态。
- `src/electron-main/app-updater-electron-main-module.ts`：绑定 Electron main 服务和 RPC 连接。
- `src/electron-main/app-updater-rpc-service.ts`：调用 `electron-updater` 执行检查、下载和安装。

## DI 风格

本扩展使用同名 `Symbol` 和 `interface` 作为 Inversify token 与类型契约。

具体实现类使用 `Impl` 后缀，并通过 `toService` 绑定到 Symbol token。

接口在运行期会被擦除，成员属性需要通过 `@inject(AppUpdaterRpcService)` 显式声明 token。

其他扩展如果只需要触发检查更新，优先注入前端动作服务：

```ts
import { inject, injectable } from '@theia/core/shared/inversify';
import { AppUpdaterFrontendClient } from 'theia-extension-app-updater/lib/electron-browser';

@injectable()
export class OtherContribution {
  @inject(AppUpdaterFrontendClient)
  protected readonly updater!: AppUpdaterFrontendClient;
}
```

如果只需要 RPC token 或类型，可以从包根导入：

```ts
import { AppUpdaterRpcService } from 'theia-extension-app-updater';
```

后端类似 NestJS 的 `useClass`：

```ts
bind(AppUpdaterRpcServiceImpl).toSelf().inSingletonScope();
bind(AppUpdaterRpcService).toService(AppUpdaterRpcServiceImpl);
```

前端类似 NestJS 的 `useFactory`：

```ts
bind(AppUpdaterRpcService).toDynamicValue(context =>
  ElectronIpcConnectionProvider.createProxy<AppUpdaterRpcService>(
    context.container,
    APP_UPDATER_RPC_PATH,
    client
  )
).inSingletonScope();
```

## 与 ChatApp updater hook 的对应关系

Theia 版本会把 ChatApp 中分散的 IPC channel 收敛成一组 JSON-RPC `Server/Client` 协议接口。可以按下面方式理解：

| ChatApp `use-updater.ts` | Theia `app-updater-rpc.ts` | 作用 |
| --- | --- | --- |
| `ipcInvokeEx(Ipc.UPDATER_CHECK_UPDATES, ...)` | `AppUpdaterRpcService.checkForUpdates()` | 前端请求后端检查更新 |
| `ipcInvokeEx(Ipc.UPDATER_DOWNLOAD_UPDATES, ...)` | `AppUpdaterRpcService.downloadUpdate()` | 前端请求后端下载更新 |
| 后端调用 `autoUpdater.quitAndInstall()` | `AppUpdaterRpcService.quitAndInstall()` | 退出应用并安装已下载版本 |
| IPC listener 清理函数 `offs.forEach(off => off())` | `AppUpdaterRpcService.disconnectClient(client)` | 前端连接断开时清理回调 client |
| `ipcOn(Ipc.UPDATER_UPDATE_AVAILABLE, ...)` | `AppUpdaterRpcClient.onUpdateAvailable(info)` | 后端通知前端发现新版本 |
| `ipcOn(Ipc.UPDATER_UPDATE_NOT_AVAILABLE, ...)` | `AppUpdaterRpcClient.onUpdateNotAvailable()` | 后端通知前端没有新版本 |
| `ipcOn(Ipc.UPDATER_DOWNLOAD_PROGRESS, ...)` | `AppUpdaterRpcClient.onDownloadProgress(progress)` | 后端通知前端下载进度 |
| `ipcOn(Ipc.UPDATER_UPDATE_DOWNLOADED, ...)` | `AppUpdaterRpcClient.onUpdateDownloaded()` | 后端通知前端下载完成 |
| `ipcOn(Ipc.UPDATER_ERROR, ...)` | `AppUpdaterRpcClient.onUpdateError(message)` | 后端通知前端检查或下载失败 |

两边用的是同一批 `electron-updater` 类型：`UpdateInfo`、`ProgressInfo`、`UpdateCheckResult`。
