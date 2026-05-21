import { FrontendApplication } from '@theia/core/lib/browser';
import { ApplicationShell } from '@theia/core/lib/browser/shell/application-shell';
import { TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { injectable } from '@theia/core/shared/inversify';
import { OutlineViewContribution } from '@theia/outline-view/lib/browser/outline-view-contribution';

/**
 * 调整大纲视图布局。
 */
@injectable()
export class LayoutOutlineViewContribution extends OutlineViewContribution {

  /**
   * 手动打开时放左侧。
   */
  override get defaultViewOptions(): ApplicationShell.WidgetOptions {
    return {
      ...super.defaultViewOptions,
      area: 'left',
      rank: 500,
    };
  }

  /**
   * 跳过官方默认打开。
   */
  override async initializeLayout(_: FrontendApplication): Promise<void> {
    // 空实现，避免默认布局自动打开大纲。
  }

  /**
   * 避免重复注册官方工具栏按钮。
   */
  override async registerToolbarItems(_: TabBarToolbarRegistry): Promise<void> {
    // 工具栏已由官方贡献注册。
  }
}
