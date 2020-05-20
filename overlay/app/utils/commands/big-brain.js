import { Command } from 'commander';
import CommandBase from 'overlay/utils/commands/command-base';


export default class BigBrain extends CommandBase {
  name = '!bigbrain';
  description = 'This streamer is 3 smart 5 you, increase the size of the brain.';

  parseAndExecute(emberContext, target, twitchContext, command, args) {
    super.parseAndExecute(emberContext, target, twitchContext, command, args);

    emberContext.brain.atomicAdjustSize.perform(/*increment=*/true);
  }

}
