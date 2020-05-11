import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import config from '../../config/environment';


export default class ControlPanelComponent extends Component {
  @service websockets;
  @service store;
  socket = null;

  // A list of all sounds loaded from the rest api.
  sounds = null;

  player1 = 'Me';
  player2 = 'BrickLee';
  player3 = '';
  player4 = '';

  constructor() {
    super(...arguments);
    this.sounds = this.store.findAll('sound')
    const socket = this.websockets.socketFor('ws://localhost:7000/');

    socket.on('open', this.openHandler, this);
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

  closeHandler(event) {
    console.log(`Close was called: ${event}`);
  }

  @action
  updatePlayerNames() {
    this.socket.send({
      player1: this.player1,
      player2: this.player2,
      player3: this.player3,
      player4: this.player4
    }, true);
  }

  @action
  playSound(soundId) {
    fetch(`${config.host}/play_sound/?sound_id=${soundId}`);
  }

}
