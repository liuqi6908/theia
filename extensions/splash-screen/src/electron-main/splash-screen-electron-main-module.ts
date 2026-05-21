import { ElectronMainApplication } from '@theia/core/lib/electron-main/electron-main-application';
import { ContainerModule } from '@theia/core/shared/inversify';
import { SplashScreenElectronMainApplication } from './splash-screen-electron-main-application';

export default new ContainerModule((bind, _unbind, isBound, rebind) => {
  bind(SplashScreenElectronMainApplication).toSelf().inSingletonScope();

  if (isBound(ElectronMainApplication)) {
    rebind(ElectronMainApplication).toService(SplashScreenElectronMainApplication);
  }
  else {
    bind(ElectronMainApplication).toService(SplashScreenElectronMainApplication);
  }
});
