import { COMMANDS } from 'overlay/utils/commands/list-command';

export default function getCommand(name) {
  let COMMAND_MAP = {};
  for (let command of COMMANDS) {
    COMMAND_MAP[command.name] = command;
  }

  return COMMAND_MAP[name] || undefined;
}
