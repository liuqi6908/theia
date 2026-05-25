import type { ProgressInfo, UpdateInfo } from 'electron-updater';
import { inject, injectable } from '@theia/core/shared/inversify';
import { AppUpdaterRpcClient } from '../common/app-updater-rpc';
import { AppUpdaterRepoClient } from './app-updater-repo-client';

@injectable()
export class AppUpdaterRpcClientImpl implements AppUpdaterRpcClient {

  @inject(AppUpdaterRepoClient)
  protected readonly _repo!: AppUpdaterRepoClient;

  /** 后端发现新版本。 */
  public onUpdateAvailable(info: UpdateInfo): void {
    this._repo.state.updateAvailable = info;
    this._repo.state.checking = false;
    this._repo.state.error = undefined;
  }

  /** 后端确认没有新版本。 */
  public onUpdateNotAvailable(): void {
    this._repo.state.updateAvailable = undefined;
    this._repo.state.checking = false;
  }

  /** 后端推送下载进度。 */
  public onDownloadProgress(progress: ProgressInfo): void {
    this._repo.state.progress = progress;
  }

  /** 后端通知下载完成。 */
  public onUpdateDownloaded(): void {
    this._repo.state.downloaded = true;
    this._repo.state.downloading = false;
  }

  /** 后端通知检查或下载失败。 */
  public onUpdateError(message: string): void {
    this._repo.state.error = message;
    this._repo.state.checking = false;
    this._repo.state.downloading = false;
  }
}
