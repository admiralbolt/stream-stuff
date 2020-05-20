import { Command } from 'commander';
import CommandBase from 'overlay/utils/commands/command-base';


export default class SmallBrain extends CommandBase {
  name = '!smallbrain';
  description = 'This streamer is the big dumb, reduce the size of the brain.';

  parseAndExecute(emberContext, target, twitchContext, command, args) {
    super.parseAndExecute(emberContext, target, twitchContext, command, args);

    emberContext.brain.atomicAdjustSize.perform(/*increment=*/false);
  }

}
