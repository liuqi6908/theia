import type { ProgressInfo, UpdateCheckResult, UpdateInfo } from 'electron-updater';
import type { RpcServer } from '@theia/core/lib/common/messaging/proxy-factory';

export const AppUpdaterRpcClient = Symbol('AppUpdaterRpcClient');

/** 后端回调前端的更新事件。 */
export interface AppUpdaterRpcClient {
  /** 发现可用更新。 */
  onUpdateAvailable(info: UpdateInfo): void;

  /** 没有可用更新。 */
  onUpdateNotAvailable(): void;

  /** 下载进度变化。 */
  onDownloadProgress(progress: ProgressInfo): void;

  /** 更新包下载完成。 */
  onUpdateDownloaded(): void;

  /** 检查或下载失败。 */
  onUpdateError(message: string): void;
}

export const AppUpdaterRpcService = Symbol('AppUpdaterRpcService');

/** 前端主动调用的更新服务。 */
export interface AppUpdaterRpcService extends RpcServer<AppUpdaterRpcClient> {
  /** 建立 RPC 连接时注册前端回调。 */
  setClient(client: AppUpdaterRpcClient | undefined): void;

  /** 释放服务端资源。 */
  dispose(): void;

  /** 检查是否存在可用更新。 */
  checkForUpdates(): Promise<UpdateCheckResult | null>;

  /** 下载已发现的新版本。 */
  downloadUpdate(): Promise<void>;

  /** 退出并安装已下载的新版本。 */
  quitAndInstall(): void;

  /** 清理断开的前端回调。 */
  disconnectClient(client: AppUpdaterRpcClient): void;
}
