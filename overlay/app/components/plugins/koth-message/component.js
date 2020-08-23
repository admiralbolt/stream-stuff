import SocketClientComponent from 'overlay/components/socket-client/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

let KING_OF_THE_HILL_MESSAGE = 'king_of_the_hill_message';
let KING_OF_THE_HILL_AUTHOR = 'king_of_the_hill_author';

export default class KothMessageComponent extends SocketClientComponent {
  @service keyValue;

  @tracked message;
  @tracked author;

  constructor() {
    super(...arguments, 7007);
    this.initialize();
  }

  async initialize() {
    this.message = await this.keyValue.getValue(KING_OF_THE_HILL_MESSAGE);
    this.author = await this.keyValue.getValue(KING_OF_THE_HILL_AUTHOR);
  }

  messageHandler(event) {
    let data = JSON.parse(event.data);

    if (!data.hasOwnProperty('message') || !data.hasOwnProperty('author')) return
    this.message = data['message'];
    this.author = data['author'];
  }

};
