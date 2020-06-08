import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class TwitchChatBotComponent extends Component {
  @service twitchApi;
  @service twitchChat;

  @alias('twitchChat.botIsAlive') botIsAlive;
  @alias('twitchChat.emotesEnabled') emotesEnabled;

  constructor() {
    super(...arguments);
    // Initialize service so it starts... We do this by accessing any property.
    this.twitchApi.access_token;
  }

  @action
  toggleBot() {
    if (this.botIsAlive) {
      this.twitchChat.stop();
    } else {
      this.twitchChat.start();
    }
  }

  @action
  toggleEmotes() {
    this.twitchChat.toggleEmotes();
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
