import { ContainerModule } from '@theia/core/shared/inversify';
import { PluginDeployerParticipant } from '@theia/plugin-ext/lib/common/plugin-protocol';
import { BundledPluginDeployerParticipant } from './bundled-plugin-deployer-participant';

export default new ContainerModule(bind => {
  bind(BundledPluginDeployerParticipant).toSelf().inSingletonScope();
  bind(PluginDeployerParticipant).toService(BundledPluginDeployerParticipant);
});
