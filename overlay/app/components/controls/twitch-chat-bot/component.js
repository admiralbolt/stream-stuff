import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

let EMOTES_ENABLED = 'twitch_chat_bot_emotes_enabled';
let REDEMPTIONS_ENABLED = 'twitch_chat_redemptions_enabled';

export default class TwitchChatBotComponent extends Component {
  @service keyValue;
  @service twitchApi;

  @tracked emotesEnabled = true;
  @tracked redemptionsEnabled = true;

  constructor() {
    super(...arguments);
    // Initialize service so it starts... We do this by accessing any property.
    this.twitchApi.streamTitle;
    this.initialize();
  }

  async initialize() {
    this.emotesEnabled = await this.keyValue.getValue(EMOTES_ENABLED);
    this.redemptionsEnabled = await this.keyValue.getValue(REDEMPTIONS_ENABLED);
  }

  @action
  toggleEmotes() {
    this.emotesEnabled = !this.emotesEnabled;
    this.keyValue.createOrUpdate(EMOTES_ENABLED, this.emotesEnabled);
  }

  @action
  toggleRedemptions() {
    this.redemptionsEnabled = !this.redemptionsEnabled;
    this.keyValue.createOrUpdate(REDEMPTIONS_ENABLED, this.redemptionsEnabled);
  }

}
