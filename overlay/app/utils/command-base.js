import { Command } from 'commander';

export default class CommandBase {

  // Override this in the child
  attachProps(command) {

  }

  // Override this in the child
  parseAndExecute(emberContext, target, twitchContext, command, args) {
    command.exitOverride((err) => {
      emberContext.client.say(target,
        `@${twitchContext['display-name']} Command ${command.name()} failed: ${err.message}`
      );
    });

    // Default is to remove the first two argumnets from the arg array.
    // Specifying from: 'user' doesn't remove any args.
    command.parse(args, {
      from: 'user'
    });
  }

  getInstance() {
    let command = new Command();
    command.addHelpCommand(false);
    command.description(this.description);
    command.name(this.name);
    this.attachProps(command);
    return command;
  }

}
