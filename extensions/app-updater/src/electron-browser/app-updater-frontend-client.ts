import { MessageService } from '@theia/core/lib/common';
import { injectable } from '@theia/core/shared/inversify';
import { AppUpdaterRpcService } from '../common/app-updater-rpc';
import { toErrorMessage } from '../common/app-updater-utils';
import { AppUpdaterRepoClient, AppUpdaterStore } from './app-updater-repo-client';

@injectable()
export class AppUpdaterFrontendClient {

  /** 前端更新状态，Dialog 直接订阅。 */
  public readonly state: AppUpdaterStore;

  public constructor(
    private readonly _repo: AppUpdaterRepoClient,
    private readonly _rpcSrv: AppUpdaterRpcService,
    private readonly _msgSrv: MessageService
  ) {
    this.state = this._repo.state;
  }

  /** 主动检查更新。 */
  public async checkUpdate(notify = true): Promise<void> {
    if (this.state.checking) {
      return;
    }
    this.state.checking = true;
    this.state.error = undefined;
    try {
      console.info('[app-updater] frontend checkUpdate called');
      const result = await this._rpcSrv.checkForUpdates();
      console.info('[app-updater] frontend checkUpdate result', result);
      this.state.updateCheckResult = result ?? undefined;
      if (result?.isUpdateAvailable) {
        this.state.updateAvailable = result.updateInfo;
        this.state.error = undefined;
      }
      else {
        this.state.updateAvailable = undefined;
      }
      if (notify && !result?.isUpdateAvailable) {
        this._msgSrv.info('当前版本是最新的');
      }
    }
    catch (error) {
      this.state.error = toErrorMessage(error);
      if (notify) {
        this._msgSrv.error(`检查更新失败：${this.state.error}`);
      }
    }
    finally {
      this.state.checking = false;
    }
  }

  /** 下载已发现的更新。 */
  public async downloadUpdate(): Promise<void> {
    const { updateAvailable } = this.state;
    if (!updateAvailable || this.state.downloading) {
      return;
    }
    this.state.downloading = true;
    this.state.error = undefined;
    try {
      console.info('[app-updater] frontend downloadUpdate called');
      await this._rpcSrv.downloadUpdate();
    }
    catch (error) {
      this.state.error = toErrorMessage(error);
      console.error('[app-updater] frontend downloadUpdate error', this.state.error);
      this.state.downloading = false;
    }
  }
}
