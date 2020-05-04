import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MeleeLayoutComponent extends Component {
  @service websockets;
  socket = null;

  @tracked playerNames = {
    player1: '',
    player2: '',
    player3: '',
    player4: ''
  };

  constructor() {
    super(...arguments);
    const socket = this.websockets.socketFor('ws://localhost:7000/');

    socket.on('open', this.openHandler, this);
    socket.on('message', this.messageHandler, this);
    socket.on('close', this.closeHandler, this);

    this.socket = socket;
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.socket.off('open', this.openHandler);
    this.socket.off('message', this.messageHandler);
    this.socket.off('close', this.closeHandler);
  }

  openHandler(event) {
    console.log(`On open was called: ${event}`);
  }

  messageHandler(event) {
    this.playerNames = JSON.parse(event.data);
  }

  closeHandler(event) {
    console.log(`Close was called: ${event}`);
  }

}
