import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
import { CommonMenus } from '@theia/core/lib/browser';

export const ExtensionCommand: Command = {
  id: 'Extension.command',
  label: 'Say Hello'
};

@injectable()
export class ExtensionCommandContribution implements CommandContribution {
  
  @inject(MessageService)
  protected readonly messageService!: MessageService;

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(ExtensionCommand, {
      execute: () => this.messageService.info('Hello World!')
    });
  }
}

@injectable()
export class ExtensionMenuContribution implements MenuContribution {

  registerMenus(menus: MenuModelRegistry): void {
    menus.registerMenuAction(CommonMenus.EDIT_FIND, {
      commandId: ExtensionCommand.id,
      label: ExtensionCommand.label
    });
  }
}
