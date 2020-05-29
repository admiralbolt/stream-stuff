import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class TwitchChatBotComponent extends Component {
  @service twitchChat;

  @alias('twitchChat.botIsAlive') botIsAlive;
  @alias('twitchChat.emotesEnabled') emotesEnabled;

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
}
