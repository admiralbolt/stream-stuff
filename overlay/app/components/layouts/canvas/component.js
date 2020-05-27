import SocketClientComponent from 'overlay/components/socket-client/component';
import { tracked } from '@glimmer/tracking';
import { isEmpty, isNone } from '@ember/utils';

/**
The Canvas is used as a way to draw ANY html over the current scene. It should
be added as a browser source and should be the highest index.

Messages sent to the canvas have the following options:
  * id: (Required) An id string that should match the root html id.
  * type: (Required) The type of message: [create, delete]

  CREATE OPTIONS
  ==============
  * html: (Required) A string containing the html to display.

  DELETE OPTIONS
  ==============
  Nothing special yet :)

{
  "html": "<h1 id='hello'>Hello</b>",
  "id": "hello",
  "type": "create"
}

{
  "id": "hello",
  "type": "delete"
}

*/
export default class CanvasComponent extends SocketClientComponent {
  // A tracked dictionary mapping item ids -> html.
  @tracked items;

  constructor() {
    super(...arguments, 7004);
    this.items = {};
  }

  messageHandler(event) {
    let data = JSON.parse(event.data);
    if (isNone(data.id) || isEmpty(data.id) || isNone(data.type) || isEmpty(data.type)) return;

    let messageType = data.type.toLowerCase();
    switch(messageType) {
      case 'create':
        if (isNone(data.html) || isEmpty(data.html)) return;

        let items = this.items;
        items[data.id] = data.html;
        this.items = items;

        break;

      case 'delete':
        if (!this.items.hasOwnProperty(data.id)) return;

        let items2 = this.items;
        delete items2[data.id];
        this.items = items2;
        break;

      default:
        console.log(`Unknown message type: ${messageType}`);
        return;
    }
  }

}
