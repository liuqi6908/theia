import { FrontendApplication, FrontendApplicationContribution, Widget } from '@theia/core/lib/browser';
import { CommonMenus } from '@theia/core/lib/browser/common-menus';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from '@theia/core/lib/common';
import { injectable } from '@theia/core/shared/inversify';
import { AppUpdaterFrontendClient } from './app-updater-frontend-client';
import { AppUpdaterFrontendWidget } from './app-updater-frontend-widget';

export const APP_UPDATER_CHECK_FOR_UPDATES_COMMAND: Command = {
  id: 'app-updater.check-for-updates',
  label: '检查更新...'
};

@injectable()
export class AppUpdaterFrontendContribution implements FrontendApplicationContribution, CommandContribution, MenuContribution {

  public constructor(
    private readonly _widget: AppUpdaterFrontendWidget,
    private readonly _client: AppUpdaterFrontendClient
  ) { }

  public onStart(_app: FrontendApplication): void {
    this.attachWidget();
    // 启动后静默检查，手动命令才弹出“已是最新”提示。
    this._client.checkUpdate(false);
  }

  public registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(APP_UPDATER_CHECK_FOR_UPDATES_COMMAND, {
      execute: () => this._client.checkUpdate(true)
    });
  }

  public registerMenus(registry: MenuModelRegistry): void {
    registry.registerMenuAction(CommonMenus.HELP, {
      commandId: APP_UPDATER_CHECK_FOR_UPDATES_COMMAND.id
    });
  }

  protected attachWidget(): void {
    if (!this._widget.isAttached) {
      // 遮罩需要覆盖整个窗口，直接挂到 body。
      Widget.attach(this._widget, document.body);
    }
    this._widget.update();
  }
}
