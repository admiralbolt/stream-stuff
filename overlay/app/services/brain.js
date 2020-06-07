import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';

export default class BrainService extends Service {
  @service websockets;
  @service keyValue;
  socket = null;

  @tracked brainSize;
  @tracked showBrain;

  constructor() {
    super(...arguments);
    this.initialize();
  }

  async initialize() {
    this.brainSize = await this.keyValue.getValue('brain_plugin_size');
    this.showBrain = await this.keyValue.getValue('brain_plugin_show');
    this.socket = this.websockets.socketFor('ws://localhost:7003/');
    this.socket.on('open', this.openHandler, this);
  }

  async openHandler() {
    this.socket.send({
      brainSize: this.brainSize,
      showBrain: this.showBrain
    }, true);
  }

  async updateBrain(info) {
    let sendData = {};
    if (info.size) {
      this.brainSize = info.size;
      this.keyValue.createOrUpdate('brain_plugin_size', this.brainSize);
      sendData.brainSize = this.brainSize;
    }

    if (info.hasOwnProperty('show')) {
      this.showBrain = info.show;
      this.keyValue.createOrUpdate('brain_plugin_show', this.showBrain);
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
