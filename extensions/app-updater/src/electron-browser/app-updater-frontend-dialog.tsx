import * as React from '@theia/core/shared/react';
import { useSnapshot } from 'valtio';
import { AppUpdaterFrontendClient } from './app-updater-frontend-client';

export type AppUpdaterFrontendDialogProps = {
  /** 由 Widget 注入后传入的前端 updater client。 */
  client: AppUpdaterFrontendClient;
};

export function AppUpdaterFrontendDialog({ client }: AppUpdaterFrontendDialogProps): React.ReactElement | null {
  const {
    updateAvailable,
    downloading,
    progress,
    downloaded,
    error
  } = useSnapshot(client.state);

  React.useEffect(() => {
    if (updateAvailable && !downloading && !downloaded && !error) {
      // 强制更新模式下发现新版本后自动下载。
      client.downloadUpdate();
    }
  }, [client, downloaded, downloading, error, updateAvailable]);

  if (!updateAvailable) {
    // 没有更新时不渲染遮罩。
    return null;
  }

  const percent = Math.max(0, Math.min(100, progress?.percent ?? 0));
  const percentText = `${percent.toFixed(2)}%`;

  return (
    <div className="app-updater-backdrop" role="dialog" aria-modal="true">
      <div className="app-updater-dialog">
        <h2>发现新版本</h2>
        <p>ChatPython 正在更新，完成后将自动重启。</p>
        <div className="app-updater-version">
          <span>新版本</span>
          <strong>{updateAvailable.version}</strong>
        </div>
        <div className="app-updater-progress">
          <progress value={percent} max={100} />
          <span>{downloaded ? '准备安装' : percentText}</span>
        </div>
        {error && (
          <div className="app-updater-error">
            <span>更新失败：{error}</span>
            <button type="button" onClick={() => client.downloadUpdate()}>重试</button>
          </div>
        )}
      </div>
    </div>
  );
}
