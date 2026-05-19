import { injectable } from '@theia/core/shared/inversify';
import { LocalizationContribution, LocalizationRegistry } from '@theia/core/lib/node/i18n/localization-contribution';
import * as zhCnTranslations from './i18n/nls.zh-cn.json';

@injectable()
export class ZhCnLocalizationContribution implements LocalizationContribution {

  async registerLocalizations(registry: LocalizationRegistry): Promise<void> {
    registry.registerLocalizationFromRequire('zh-cn', require('@theia/core/i18n/nls.zh-cn.json'));

    registry.registerLocalizationFromRequire('zh-cn', zhCnTranslations);
  }
}
