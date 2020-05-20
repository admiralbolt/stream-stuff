import BigBrain from 'overlay/utils/commands/big-brain';
import SmallBrain from 'overlay/utils/commands/small-brain';
import TestCommand from 'overlay/utils/commands/test-command';

let COMMANDS = [
  new BigBrain(),
  new SmallBrain(),
  new TestCommand()
];

export default function getCommand(name) {
  let COMMAND_MAP = {};
  for (let command of COMMANDS) {
    COMMAND_MAP[command.name] = command;
  }

  return COMMAND_MAP[name] || undefined;
}
