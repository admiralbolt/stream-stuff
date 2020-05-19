import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MeleeControlsComponent extends Component {
  @service websockets;
  socket = null;

  player1 = '';
  player2 = '';
  player3 = '';
  player4 = '';

  constructor() {
    super(...arguments);
    this.socket = this.websockets.socketFor('ws://localhost:7000/');
    this.player1 = localStorage.getItem('meleePlayer1') || '';
    this.player2 = localStorage.getItem('meleePlayer2') || '';
    this.player3 = localStorage.getItem('meleePlayer3') || '';
    this.player4 = localStorage.getItem('meleePlayer4') || '';
  }

  @action
  updatePlayerNames() {
    localStorage.setItem('meleePlayer1', this.player1);
    localStorage.setItem('meleePlayer2', this.player2);
    localStorage.setItem('meleePlayer3', this.player3);
    localStorage.setItem('meleePlayer4', this.player4);
    this.socket.send({
      player1: this.player1,
      player2: this.player2,
      player3: this.player3,
      player4: this.player4
    }, true);
  }
}
