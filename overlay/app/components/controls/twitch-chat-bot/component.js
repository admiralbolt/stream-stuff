import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

let EMOTES_ENABLED = 'twitch_chat_bot_emotes_enabled';

export default class TwitchChatBotComponent extends Component {
  @service keyValue;
  @service twitchApi;

  @tracked emotesEnabled = false;

  constructor() {
    super(...arguments);
    // Initialize service so it starts... We do this by accessing any property.
    this.twitchApi.access_token;
    this.initialize();
  }

  async initialize() {
    this.emotesEnabled = await this.keyValue.getValue(EMOTES_ENABLED);
  }

  @action
  toggleEmotes() {
    this.keyValue.createOrUpdate(EMOTES_ENABLED, this.emotesEnabled);
  }

  @action
  authorizeTwitch() {
    this.twitchApi.authorize();
  }

  @action
  getTokens() {
    this.twitchApi.getTokens();
  }
}
