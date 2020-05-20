import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';

export default class BrainService extends Service {
  @service websockets;
  socket = null;

  @tracked brainSize;
  @tracked showBrain;

  constructor() {
    super(...arguments);
    this.socket = this.websockets.socketFor('ws://localhost:7003/');
    this.socket.on('open', this.openHandler, this);
    this.brainSize = parseInt(localStorage.getItem('brainSize') || 0);
    this.showBrain = localStorage.getItem('showBrain') == 'true';
  }

  openHandler() {
    this.socket.send({
      brainSize: this.brainSize,
      showBrain: this.showBrain
    }, true);
  }

  updateBrain(info) {
    let sendData = {};
    if (info.size) {
      this.brainSize = info.size;
      localStorage.setItem('brainSize', this.brainSize);
      sendData.brainSize = this.brainSize;
    }

    if (info.hasOwnProperty('show')) {
      this.showBrain = info.show;
      localStorage.setItem('showBrain', this.showBrain);
      sendData.showBrain = this.showBrain;
    }

    if (sendData) this.socket.send(sendData, true);
  }

  @task({enqueue: true})
  *atomicAdjustSize(increment) {
    this.updateBrain({
      size: increment ? this.brainSize + 1 : this.brainSize - 1
    });
  }


}
