import { RpcConnectionHandler } from '@theia/core/lib/common/messaging/proxy-factory';
import { ElectronConnectionHandler } from '@theia/core/lib/electron-main/messaging/electron-connection-handler';
import { APP_UPDATER_RPC_PATH } from '../common/app-updater-constants';
import { AppUpdaterRpcClient, AppUpdaterRpcService } from '../common/app-updater-rpc';
import { ContainerModule } from '@theia/core/shared/inversify';
import { AppUpdaterRpcServiceImpl } from './app-updater-rpc-service';

export default new ContainerModule(bind => {
  // 后端服务只需要一个实例，里面会保存当前连接的前端 clients。
  bind(AppUpdaterRpcServiceImpl).toSelf().inSingletonScope();
  // class token 对应真实 Electron 后端服务，类似 NestJS 的 useClass。
  bind(AppUpdaterRpcService).toService(AppUpdaterRpcServiceImpl);

  // 注册 Electron main RPC：前端用同一个 path 创建 proxy 后，会进入这里。
  bind(ElectronConnectionHandler).toDynamicValue(context =>
    new RpcConnectionHandler<AppUpdaterRpcClient>(
      APP_UPDATER_RPC_PATH,
      client => {
        console.info(`[app-updater] electron-main rpc connected: ${APP_UPDATER_RPC_PATH}`);
        const service = context.container.get<AppUpdaterRpcService>(AppUpdaterRpcService);
        service.setClient(client);
        // 前端窗口关闭后移除 client，避免后端继续推送更新事件。
        client.onDidCloseConnection(() => service.disconnectClient(client));
        return service;
      }
    )
  ).inSingletonScope();
});
