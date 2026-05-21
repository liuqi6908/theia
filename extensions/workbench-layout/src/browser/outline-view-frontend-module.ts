import { FrontendApplication, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { ContainerModule, inject, injectable } from '@theia/core/shared/inversify';
import { OutlineViewContribution } from '@theia/outline-view/lib/browser/outline-view-contribution';
import { LayoutOutlineViewContribution } from './outline-view-contribution';

@injectable()
class HideOutlineOnStartupContribution implements FrontendApplicationContribution {

  constructor(
    @inject(LayoutOutlineViewContribution)
    protected readonly outline: LayoutOutlineViewContribution,
  ) { }

  async onDidInitializeLayout(_: FrontendApplication): Promise<void> {
    // 兜底关闭恢复出来的大纲。
    await this.outline.closeView();
  }
}

export default new ContainerModule((bind, _unbind, isBound, rebind) => {
  // 官方已注册命令、菜单和工具栏，这里只替换实现。
  bind(LayoutOutlineViewContribution).toSelf().inSingletonScope();
  bind(FrontendApplicationContribution).to(HideOutlineOnStartupContribution).inSingletonScope();

  if (isBound(OutlineViewContribution)) {
    rebind(OutlineViewContribution).toService(LayoutOutlineViewContribution);
  }
  else {
    bind(OutlineViewContribution).toService(LayoutOutlineViewContribution);
  }
});
