import type { ProgressInfo, UpdateCheckResult, UpdateInfo } from 'electron-updater';
import { injectable } from '@theia/core/shared/inversify';
import { proxy } from 'valtio';

export type AppUpdaterStore = {
  /** 是否正在检查更新。 */
  checking: boolean;
  /** 最近一次检查结果。 */
  updateCheckResult?: UpdateCheckResult;
  /** 可用的新版本信息。 */
  updateAvailable?: UpdateInfo;
  /** 是否正在下载更新。 */
  downloading: boolean;
  /** 当前下载进度。 */
  progress?: ProgressInfo;
  /** 检查或下载错误。 */
  error?: string;
  /** 更新包是否已下载完成。 */
  downloaded: boolean;
};

@injectable()
export class AppUpdaterRepoClient {

  /** 前端更新状态，Dialog 直接订阅。 */
  public readonly state = proxy<AppUpdaterStore>({
    checking: false,
    downloading: false,
    downloaded: false
  });
}
