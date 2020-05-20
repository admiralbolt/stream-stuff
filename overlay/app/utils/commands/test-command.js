import { Command } from 'commander';
import CommandBase from 'overlay/utils/commands/command-base';


export default class TestCommand extends CommandBase {
  name = '!test';
  description = 'Test Command that does stuff.';

  attachProps(command) {
    command.requiredOption('--sauce', 'Adds some sauce');
  }

  parseAndExecute(emberContext, target, twitchContext, command, args) {
    super.parseAndExecute(emberContext, target, twitchContext, command, args);

    emberContext.client.say(target, 'cool');
  }

}
