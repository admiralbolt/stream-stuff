import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

/**
  To use this component extend it and add a port param to the super call:
  super(...arguments, portNumber);

  Then, override any methods you wish to use directly!
*/
export default class SocketClientComponent extends Component {
  @service websockets;
  socket = null;
  port = null;

  constructor() {
    super(...arguments);
    this.port = arguments[2];
    const socket = this.websockets.socketFor(`ws://localhost:${this.port}/`);

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
    console.log(`message received: ${JSON.parse(event.data)}`);
  }

  closeHandler(event) {
    console.log(`Close was called: ${event}`);
  }

}
