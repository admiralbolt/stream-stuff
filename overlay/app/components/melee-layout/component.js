import SocketClientComponent from 'overlay/components/socket-client/component';
import { tracked } from '@glimmer/tracking';

export default class MeleeLayoutComponent extends SocketClientComponent {
  @tracked playerNames = {
    player1: '',
    player2: '',
    player3: '',
    player4: ''
  };

  constructor() {
    super(...arguments, 7000);
  }

  messageHandler(event) {
    this.playerNames = JSON.parse(event.data);
  }

}
