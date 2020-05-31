import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import tmi from 'tmi';
import config from 'overlay/config/environment';
import getCommand from 'overlay/utils/commands/get-command';
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
  @service brain;
  @service websockets;

  @tracked client = null;
  @tracked botIsAlive = null;
  @tracked emotesEnabled = false;

  canvasSocket = null;

  init() {
    super.init(...arguments);
    this.botIsAlive = localStorage.getItem('botIsAlive');
    if (this.botIsAlive) this.start();

    this.emotesEnabled = localStorage.getItem('emotesEnabled') == 'true';

    this.canvasSocket = this.websockets.socketFor('ws://localhost:7004/');
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

    // Emote handling. Only use the first emote.
    if (this.emotesEnabled) {
      if (!isNone(context.emotes)) {
        for (let emoteId in context.emotes) {
          if (context.emotes.hasOwnProperty(emoteId)) {
            for (let i = 0; i < context.emotes[emoteId].length; ++i) {
              this.canvasSocket.send({
                id: `${context['display-name']}_${emoteId}_${Math.random()}`,
                type: 'create',
                html: `<img src="https://static-cdn.jtvnw.net/emoticons/v1/${emoteId}/1.0" />`,
                randomVelocity: true,
                randomPosition: true,
                timer: 3000 + Math.floor(Math.random() * 1000)
              }, true);
            }
          }
        }
      }
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

  toggleEmotes() {
    this.emotesEnabled = !this.emotesEnabled;
    localStorage.setItem('emotesEnabled', this.emotesEnabled);
  }
}
