import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import tmi from 'tmi';
import config from '../config/environment';
import { Command } from 'commander';
import getCommand from 'overlay/utils/get-command';
import { isNone } from '@ember/utils';

const OPTS = {
  identity: {
    username: 'admiral_lightning_bot',
    password: config.twitchOauthToken
  },
  channels: [
    'admirallightningbolt'
  ]
};

let GENERIC_RESPONSES = {
  'fuck you': 'no u'
};

export default class TwitchChatService extends Service {
  @tracked client = null;
  @tracked botIsAlive = null;

  testCommand = null;

  init() {
    super.init(...arguments);
    this.botIsAlive = localStorage.getItem('botIsAlive');
    if (this.botIsAlive) this.start();

    this.testCommand = new Command();
    this.testCommand.requiredOption('--sauce', 'Sauce');
  }

  messageHandler(target, context, msg, self) {
    // Ignore messages from self... For now...
    if (self) return;

    let [inputCommand, ...args] = msg.split(/\s+/);
    let commandGenerator = getCommand(inputCommand.toLowerCase());
    if (!isNone(commandGenerator)) {
      let command = commandGenerator.getInstance();
      // If --help is included, print help and exit.
      if (args.includes('--help')) {
        this.client.say(target, command.helpInformation());
        return;
      }

      commandGenerator.parseAndExecute(this, target, context, command, args);
    }

    if (msg.toLowerCase() in GENERIC_RESPONSES) {
      this.client.say(target, GENERIC_RESPONSES[msg.toLowerCase()]);
    }
  }

  connectionHandler() {
    console.log('connected!');
  }

  start() {
    console.log('Activating skynet');
    this.client = new tmi.client(OPTS);
    this.client.on('message', function(target, context, msg, self) {
      this.messageHandler(target, context, msg, self);
    }.bind(this));
    this.client.on('connected', this.connectionHandler);
    this.client.connect();
    this.botIsAlive = true;
    localStorage.setItem('botIsAlive', true);
  }

  stop() {
    console.log('Preventing skynet');
    this.client.disconnect();
    this.botIsAlive = false;
    localStorage.removeItem('botIsAlive');
  }
}
