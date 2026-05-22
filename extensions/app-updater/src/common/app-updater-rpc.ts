import type { ProgressInfo, UpdateCheckResult, UpdateInfo } from 'electron-updater';
import type { RpcServer } from '@theia/core/lib/common/messaging/proxy-factory';

/** 前端主动调用的更新服务。 */
export abstract class AppUpdaterRpcService implements RpcServer<AppUpdaterRpcClient> {
  /** 建立 RPC 连接时注册前端回调。 */
  public abstract setClient(client: AppUpdaterRpcClient | undefined): void;

  /** 释放服务端资源。 */
  public abstract dispose(): void;

  /** 检查是否存在可用更新。 */
  public abstract checkForUpdates(): Promise<UpdateCheckResult | null>;

  /** 下载已发现的新版本。 */
  public abstract downloadUpdate(): Promise<void>;

  /** 退出并安装已下载的新版本。 */
  public abstract quitAndInstall(): void;

  /** 清理断开的前端回调。 */
  public abstract disconnectClient(client: AppUpdaterRpcClient): void;
}

/** 后端回调前端的更新事件。 */
export abstract class AppUpdaterRpcClient {
  /** 发现可用更新。 */
  public abstract onUpdateAvailable(info: UpdateInfo): void;

  /** 没有可用更新。 */
  public abstract onUpdateNotAvailable(): void;

  /** 下载进度变化。 */
  public abstract onDownloadProgress(progress: ProgressInfo): void;

  /** 更新包下载完成。 */
  public abstract onUpdateDownloaded(): void;

  /** 检查或下载失败。 */
  public abstract onUpdateError(message: string): void;
}
