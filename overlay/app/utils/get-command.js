import TestCommand from 'overlay/utils/test-command';

let COMMANDS = [new TestCommand()];
let COMMAND_MAP = {};
COMMANDS.reduce(function(result, item, index, array) {
  result[item.name] = item;
}, COMMAND_MAP);

export default function getCommand(name) {
  return COMMAND_MAP[name] || undefined;
}
