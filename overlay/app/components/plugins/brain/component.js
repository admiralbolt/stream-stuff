import SocketClientComponent from 'overlay/components/socket-client/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SpotifyComponent extends SocketClientComponent {
  @service keyValue;
  
  @tracked brainSize;
  @tracked showBrain = true;

  constructor() {
    super(...arguments, 7003);
    this.initialize();
  }

  async initialize() {
    this.brainSize = await this.keyValue.getValue('brain_plugin_size');
    this.showBrain = await this.keyValue.getValue('brain_plugin_show');
  }

  messageHandler(event) {
    let data = JSON.parse(event.data);
    if (data.brainSize) this.brainSize = data.brainSize;
    if (data.hasOwnProperty('showBrain')) this.showBrain = data.showBrain;
  }

  get adjustedWidth() {
    return this.brainSize;
  }

}
