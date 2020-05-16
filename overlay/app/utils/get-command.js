import TestCommand from 'overlay/utils/test-command';

export default function getCommand(name) {
  let commands = [new TestCommand()];

  let commandMap = {};
  commands.reduce(function(result, item, index, array) {
    result[item.name] = item;
  }, commandMap);

  return commandMap[name] || undefined;
}
