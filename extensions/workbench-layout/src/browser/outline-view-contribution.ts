import { FrontendApplication } from '@theia/core/lib/browser';
import { ApplicationShell } from '@theia/core/lib/browser/shell/application-shell';
import { injectable } from '@theia/core/shared/inversify';
import { OutlineViewContribution } from '@theia/outline-view/lib/browser/outline-view-contribution';

/**
 * 调整官方大纲视图的默认布局：启动隐藏，手动打开时放左侧。
 */
@injectable()
export class LayoutOutlineViewContribution extends OutlineViewContribution {

  /**
   * 保留官方默认配置，只把大纲默认区域改到左侧。
   */
  override get defaultViewOptions(): ApplicationShell.WidgetOptions {
    return {
      ...super.defaultViewOptions,
      area: 'left',
      rank: 500,
    };
  }

  /**
   * 覆盖官方启动自动打开逻辑，让大纲默认隐藏。
   */
  override async initializeLayout(_: FrontendApplication): Promise<void> {
    // NOOP
  }
}
