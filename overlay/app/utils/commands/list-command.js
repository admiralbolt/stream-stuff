import BigBrain from 'overlay/utils/commands/big-brain';
import SmallBrain from 'overlay/utils/commands/small-brain';
import TestCommand from 'overlay/utils/commands/test-command';
import CommandBase from 'overlay/utils/commands/command-base';

let COMMANDS = [
  new BigBrain(),
  new SmallBrain(),
  new TestCommand()
];

export class ListCommand extends CommandBase {
  name = '!commands';
  description = 'Tells you what admiral_lightning_bot can do.';

  parseAndExecute(emberContext, target, twitchContext, command, args) {
    super.parseAndExecute(emberContext, target, twitchContext, command, args);

    let commandsStr = 'Commands: ';
    for (let command of COMMANDS) {
      commandsStr += `${command.name}, \n`;
    }

    commandsStr += ' Use the --help flag for individual command options and descriptions';

    emberContext.client.say(target, commandsStr);
  }

}

COMMANDS.push(new ListCommand());
export { COMMANDS };
