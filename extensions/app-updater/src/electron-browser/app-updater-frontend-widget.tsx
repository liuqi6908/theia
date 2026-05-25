import { ReactWidget } from '@theia/core/lib/browser';
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify';
import * as React from '@theia/core/shared/react';
import { AppUpdaterFrontendClient } from './app-updater-frontend-client';
import { AppUpdaterFrontendDialog } from './app-updater-frontend-dialog';

@injectable()
export class AppUpdaterFrontendWidget extends ReactWidget {

  public static readonly ID = 'app-updater-widget';

  @inject(AppUpdaterFrontendClient)
  protected readonly _client!: AppUpdaterFrontendClient;

  @postConstruct()
  protected init(): void {
    this.id = AppUpdaterFrontendWidget.ID;
    this.node.classList.add('app-updater-root');
    this.title.label = 'App Updater';
    this.title.closable = false;
    this.update();
  }

  protected render(): React.ReactNode {
    // Dialog 是 React 函数组件，通过 props 接收 DI 创建的 client。
    return <AppUpdaterFrontendDialog client={this._client} />;
  }
}
