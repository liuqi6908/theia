import { FrontendApplicationConfig } from '@theia/application-package/lib/application-props';
import { ElectronMainApplication } from '@theia/core/lib/electron-main/electron-main-application';
import { injectable } from '@theia/core/shared/inversify';

const SPLASH_SCREEN_CONTENT = 'resources/splash.html';

@injectable()
export class SplashScreenElectronMainApplication extends ElectronMainApplication {

  override start(config: FrontendApplicationConfig): Promise<void> {
    return super.start(this.withSplashScreen(config));
  }

  protected withSplashScreen(config: FrontendApplicationConfig): FrontendApplicationConfig {
    return {
      ...config,
      electron: {
        ...config.electron,
        // 启动页资源按应用根目录解析，开发和打包后都指向 electron/resources。
        splashScreenOptions: {
          minDuration: 600,
          maxDuration: 30000,
          width: 480,
          height: 288,
          ...config.electron?.splashScreenOptions,
          content: config.electron?.splashScreenOptions?.content || SPLASH_SCREEN_CONTENT
        },
        // 主窗口等前端 ready 后再出现，避免启动页和空白工作台同时闪现。
        showWindowEarly: false
      }
    };
  }
}
