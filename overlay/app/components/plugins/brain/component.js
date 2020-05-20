import SocketClientComponent from 'overlay/components/socket-client/component';
import { tracked } from '@glimmer/tracking';

export default class SpotifyComponent extends SocketClientComponent {
  @tracked brainSize;
  @tracked showBrain;

  constructor() {
    super(...arguments, 7003);
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
