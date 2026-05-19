import { ContainerModule } from '@theia/core/shared/inversify';
import { LocalizationContribution } from '@theia/core/lib/node/i18n/localization-contribution';
import { ZhCnLocalizationContribution } from './zh-cn-localization-contribution';

export default new ContainerModule(bind => {
  bind(ZhCnLocalizationContribution).toSelf().inSingletonScope();
  bind(LocalizationContribution).toService(ZhCnLocalizationContribution);
});
