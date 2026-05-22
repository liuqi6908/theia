import { ElectronIpcConnectionProvider } from '@theia/core/lib/electron-browser/messaging/electron-ipc-connection-source';
import { ContainerModule } from '@theia/core/shared/inversify';
import { APP_UPDATER_RPC_PATH } from '../common/app-updater-constants';
import { AppUpdaterRpcClient, AppUpdaterRpcService } from '../common/app-updater-rpc';
import { AppUpdaterFrontendClient } from './app-updater-frontend-client';
import { AppUpdaterRpcClientImpl } from './app-updater-rpc-client';
import { AppUpdaterRepoClient } from './app-updater-repo-client';
import { AppUpdaterFrontendContribution } from './app-updater-frontend-contribution';
import { AppUpdaterFrontendWidget } from './app-updater-frontend-widget';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import '../../src/electron-browser/style/index.css';

export default new ContainerModule(bind => {
  // 前端状态容器，供 RPC client 与前端动作服务共用。
  bind(AppUpdaterRepoClient).toSelf().inSingletonScope();
  // 前端动作服务，供 Widget 与命令使用。
  bind(AppUpdaterFrontendClient).toSelf().inSingletonScope();
  // RPC 回调实现，供后端推送更新事件。
  bind(AppUpdaterRpcClientImpl).toSelf().inSingletonScope();
  // class token 对应前端 RPC 回调，类似 NestJS 的 useClass。
  bind(AppUpdaterRpcClient).toService(AppUpdaterRpcClientImpl);

  // class token 对应后端 RPC proxy，类似 NestJS 的 useFactory。
  bind(AppUpdaterRpcService).toDynamicValue(context => {
    const client = context.container.get<AppUpdaterRpcClient>(AppUpdaterRpcClient);
    // 创建 Electron main 服务代理，同时把前端回调传给主进程。
    return ElectronIpcConnectionProvider.createProxy<AppUpdaterRpcService>(
      context.container,
      APP_UPDATER_RPC_PATH,
      client
    );
  }).inSingletonScope();

  // 遮罩 Widget 独立注册，启动时挂到 document.body。
  bind(AppUpdaterFrontendWidget).toSelf().inSingletonScope();
  // 前端贡献负责启动检查、命令和菜单。
  bind(AppUpdaterFrontendContribution).toSelf().inSingletonScope();
  // 挂入 Theia 前端生命周期。
  bind(FrontendApplicationContribution).toService(AppUpdaterFrontendContribution);
  // 挂入 Theia 命令注册。
  bind(CommandContribution).toService(AppUpdaterFrontendContribution);
  // 挂入 Theia 菜单注册。
  bind(MenuContribution).toService(AppUpdaterFrontendContribution);
});
