import type { AppUpdater, ProgressInfo, UpdateCheckResult, UpdateInfo } from 'electron-updater';
import { injectable } from '@theia/core/shared/inversify';
import { APP_UPDATER_URL } from '../common/app-updater-constants';
import { AppUpdaterRpcClient, AppUpdaterRpcService } from '../common/app-updater-rpc';
import { toErrorMessage } from '../common/app-updater-utils';

@injectable()
export class AppUpdaterRpcServiceImpl extends AppUpdaterRpcService {

  /** 当前连接到后端的前端回调。 */
  protected readonly clients: AppUpdaterRpcClient[] = [];

  protected _autoUpdater: AppUpdater | undefined;

  public constructor() {
    super();
  }

  /** electron-updater 只能在 Electron main 里初始化。 */
  protected get autoUpdater(): AppUpdater {
    if (!this._autoUpdater) {
      const { autoUpdater } = require('electron-updater') as typeof import('electron-updater');

      autoUpdater.autoDownload = false;
      // 开发态也读取 electron/dev-app-update.yml，便于本地验证真实更新链路。
      autoUpdater.forceDevUpdateConfig = true;

      // 运行时指定更新源，避免开发态和打包产物读取不同配置。
      autoUpdater.setFeedURL({
        provider: 'generic',
        url: APP_UPDATER_URL
      });

      autoUpdater.on('update-available', (info: UpdateInfo) => {
        this.broadcast(client => client.onUpdateAvailable(info));
      });
      autoUpdater.on('update-not-available', () => {
        this.broadcast(client => client.onUpdateNotAvailable());
      });
      autoUpdater.on('download-progress', (progress: ProgressInfo) => {
        this.broadcast(client => client.onDownloadProgress(progress));
      });
      autoUpdater.on('update-downloaded', () => {
        this.broadcast(client => client.onUpdateDownloaded());
        this.autoUpdater.quitAndInstall();
      });
      autoUpdater.on('error', (error: unknown) => {
        const message = toErrorMessage(error);
        this.broadcast(client => client.onUpdateError(message));
      });

      this._autoUpdater = autoUpdater;
    }
    return this._autoUpdater;
  }

  /** 检查更新。 */
  public async checkForUpdates(): Promise<UpdateCheckResult | null> {
    return this.autoUpdater.checkForUpdates();
  }

  /** 下载更新。 */
  public async downloadUpdate(): Promise<void> {
    await this.autoUpdater.downloadUpdate();
  }

  /** 安装更新。 */
  public quitAndInstall(): void {
    this.autoUpdater.quitAndInstall();
  }

  /** 前端建立 RPC 连接后注册回调。 */
  public setClient(client: AppUpdaterRpcClient | undefined): void {
    if (client && !this.clients.includes(client)) {
      this.clients.push(client);
    }
  }

  /** 前端断开 RPC 连接后移除回调。 */
  public disconnectClient(client: AppUpdaterRpcClient): void {
    const index = this.clients.indexOf(client);
    if (index !== -1) {
      this.clients.splice(index, 1);
    }
  }

  /** 清理所有前端回调。 */
  public dispose(): void {
    this.clients.splice(0, this.clients.length);
  }

  protected broadcast(callback: (client: AppUpdaterRpcClient) => void): void {
    for (const client of [...this.clients]) {
      callback(client);
    }
  }
}
