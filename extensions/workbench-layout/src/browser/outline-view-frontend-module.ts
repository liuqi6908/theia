import { ContainerModule } from '@theia/core/shared/inversify';
import { OutlineViewContribution } from '@theia/outline-view/lib/browser/outline-view-contribution';
import { LayoutOutlineViewContribution } from './outline-view-contribution';

export default new ContainerModule((bind, _unbind, isBound, rebind) => {
  const bound = isBound(OutlineViewContribution)
  if (bound) {
    rebind(OutlineViewContribution)
      .to(LayoutOutlineViewContribution)
      .inSingletonScope();
  }
  else {
     bind(OutlineViewContribution)
      .to(LayoutOutlineViewContribution)
      .inSingletonScope();
  }
});
