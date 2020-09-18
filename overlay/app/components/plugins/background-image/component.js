import SocketClientComponent from 'overlay/components/socket-client/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class BackgroundImageComponent extends SocketClientComponent {
  @service keyValue;
  @tracked imageUrl;

  constructor() {
    super(...arguments, 7008);
    this.initialize();
  }

  async initialize() {
    this.imageUrl = await this.keyValue.getValue('background_image_url');
  }

  messageHandler(event) {
    let data = JSON.parse(event.data);
    if (!data.imageUrl) return;

    this.imageUrl = data.imageUrl;
  }

}
