import { HelloWorldCommandContribution, HelloWorldMenuContribution } from './hello-world-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';

export default new ContainerModule(bind => {
  bind(CommandContribution).to(HelloWorldCommandContribution);
  bind(MenuContribution).to(HelloWorldMenuContribution);
});
