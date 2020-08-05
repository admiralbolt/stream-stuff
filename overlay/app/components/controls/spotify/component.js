import Component from '@glimmer/component';
import ENV from 'overlay/config/environment';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

let IS_POLLING = 'spotify_should_poll';
let IS_VISIBLE = 'spotify_is_visible';

export default class SpotifyComponent extends Component {
  @service keyValue;
  @service websockets;

  @tracked isPolling = false;
  @tracked isVisible = true;

  socket = null;

  constructor() {
    super(...arguments);
    this.socket = this.websockets.socketFor('ws://localhost:7001/');
    this.initialize();
  }

  async initialize() {
    this.isPolling = await this.keyValue.getValue(IS_POLLING);
    this.isVisible = await this.keyValue.getValue(IS_VISIBLE);
  }

  @action
  togglePolling() {
    if (this.isPolling) {
      fetch(`${ENV.host}/toggle_spotify_polling`);
      this.isPolling = false;
    } else {
      fetch(`${ENV.host}/toggle_spotify_polling`);
      this.isPolling = true;
    }
  }

  @action
  toggleVisibility() {
    if (this.isVisible) {
      this.keyValue.createOrUpdate(IS_VISIBLE, false);
      this.isVisible = false;
      this.socket.send({
        show: false
      }, true);
    } else {
      this.keyValue.createOrUpdate(IS_VISIBLE, true);
      this.isVisible = true;
      this.socket.send({
        show: true
      }, true);
    }
  }

}
