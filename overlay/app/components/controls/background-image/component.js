import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class BackgroundImageComponent extends Component {
  @service keyValue;
  @service websockets;

  @tracked newImageUrl;

  constructor() {
    super(...arguments);
    this.initialize();
  }

  async initialize() {
    this.socket = this.websockets.socketFor('ws://localhost:7008/');
  }

  @action
  async updateImage() {
    this.socket.send({
      "imageUrl": this.newImageUrl
    }, true);
    await this.keyValue.createOrUpdate('background_image_url', this.newImageUrl);
    this.newImageUrl = '';
  }

}
