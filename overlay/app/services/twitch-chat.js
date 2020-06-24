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

let IS_BOT_ALIVE = 'twitch_chat_bot_is_alive';
let EMOTES_ENABLED = 'twitch_chat_bot_emotes_enabled';

export default class TwitchChatService extends Service {
  @service brain;
  @service keyValue;
  @service poll;
  @service store;
  @service websockets;

  @tracked client = null;
  @tracked botIsAlive = null;
  @tracked emotesEnabled = false;

  canvasSocket = null;
  customEmotes = null;

  init() {
    super.init(...arguments);
    this.initialize();
  }

  async initialize() {
    this.botIsAlive = await this.keyValue.getValue(IS_BOT_ALIVE);
    if (this.botIsAlive) this.start();

    this.emotesEnabled = await this.keyValue.getValue(EMOTES_ENABLED);

    this.customEmotes = {};
    // this.store.findAll('customemote', function(emotes) {
    //   console.log(
    // }.bind(this));
    let emotes = await this.store.findAll('customemote');
    emotes.forEach(emote => {
      this.customEmotes[emote.name] = emote.url;
    });

    this.canvasSocket = this.websockets.socketFor('ws://localhost:7004/');
  }

  _sendImage(username, emote, url) {
    this.canvasSocket.send({
      id: `${username}_${emote}_${Math.random()}`,
      type: 'create',
      html: `<img src="${url}" />`,
      randomVelocity: true,
      randomPosition: true,
      timer: 3000 + Math.floor(Math.random() * 1000)
    }, true);
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

    // Emote handling.
    if (this.emotesEnabled) {
      // Load twitch tv emotes.
      if (!isNone(context.emotes)) {
        for (let emoteId in context.emotes) {
          if (context.emotes.hasOwnProperty(emoteId)) {
            for (let i = 0; i < context.emotes[emoteId].length; ++i) {
              this._sendImage(context['display-name'], emoteId, `https://static-cdn.jtvnw.net/emoticons/v1/${emoteId}/1.0`);
            }
          }
        }
      }

      // Load custom emotes
      [inputCommand, ...args].forEach(word => {
        if (word in this.customEmotes) {
          this._sendImage(context['display-name'], word, this.customEmotes[word]);
        }
      });

      if (this.poll.isRunning) {
        // Check to see if the message is a single digit,
        // indicates the user voted for the given choice.
        if (msg.length == 1 && msg >= '1' && msg <= '9') {
          this.poll.vote(context['display-name'], parseInt(msg));
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
    this.keyValue.createOrUpdate(IS_BOT_ALIVE, true);
  }

  stop() {
    console.log('Preventing skynet');
    this.client.disconnect();
    this.botIsAlive = false;
    this.keyValue.createOrUpdate(IS_BOT_ALIVE, false);
  }

  toggleEmotes() {
    this.emotesEnabled = !this.emotesEnabled;
    this.keyValue.createOrUpdate(EMOTES_ENABLED, this.emotesEnabled);
  }
}
