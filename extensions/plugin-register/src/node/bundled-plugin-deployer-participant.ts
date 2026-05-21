import * as fs from 'fs';
import * as path from 'path';
import { injectable } from '@theia/core/shared/inversify';
import { PluginDeployerParticipant, PluginDeployerStartContext } from '@theia/plugin-ext/lib/common/plugin-protocol';

@injectable()
export class BundledPluginDeployerParticipant implements PluginDeployerParticipant {

  async onWillStart(context: PluginDeployerStartContext): Promise<void> {
    const pluginsDir = this.resolveBundledPluginsDir();

    if (pluginsDir && fs.existsSync(pluginsDir)) {
      // 将内置插件注册为系统插件，效果等同 THEIA_DEFAULT_PLUGINS，
      // 同时避免包裹或替换 Electron 主进程。
      context.systemEntries.push(`local-dir:${pluginsDir}`);
    }
  }

  protected resolveBundledPluginsDir(): string | undefined {
    const appProjectPath = process.env.THEIA_APP_PROJECT_PATH;

    if (!appProjectPath) {
      return undefined;
    }

    if (appProjectPath.includes('.asar')) {
      // 打包后 Theia 代码位于 app.asar，插件由 extraResources 复制到同级 app/plugins。
      return path.join(path.dirname(appProjectPath), 'app', 'plugins');
    }

    // 开发模式下 THEIA_APP_PROJECT_PATH 指向 electron 包目录。
    return path.join(appProjectPath, 'plugins');
  }
}
