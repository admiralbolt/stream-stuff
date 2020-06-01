import SocketClientComponent from 'overlay/components/socket-client/component';
import { tracked } from '@glimmer/tracking';

class Player {
  @tracked name;
  @tracked icon = null;
  @tracked port;
}

export default class PlayersComponent extends SocketClientComponent {
  constructor() {
    super(...arguments, 7000);
  }

  messageHandler(event) {
    let data = JSON.parse(event.data);
  }

}
