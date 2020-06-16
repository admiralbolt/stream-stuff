import SocketClientComponent from 'overlay/components/socket-client/component';
import { tracked } from '@glimmer/tracking';
import { isEmpty, isNone } from '@ember/utils';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';
import { htmlSafe } from '@ember/template';

let HEARTBEAT = 25;


/**
The Canvas is used as a way to draw ANY html over the current scene. It should
be added as a browser source and should be the highest index.

Messages sent to the canvas have the following options:
  * id: (Required) An id string that should match the root html id.
  * type: (Required) The type of message: [create, delete]

  CREATE OPTIONS
  ==============
  * html: (Required)
      A string containing the html to display.
  * timer: (Optional, default=null)
      Milliseconds until the element should be deleted. If no timer is specified,
      the element will persist until a delete call is made.
  * position: (Optional, default={x: 0, y:0})
      The starting position of the element.
  * randomPosition: (Optional, default=false)
      Create the element at a random position on the screen.
  * velocity: (Optional, default={x: 0, y: 0})
      The direction in which to move the element as time goes on.
  * randomVelocity: (Optional, default=false)
      Give the element a random velocity upon creation.
  * timerOpacity: (Optional, default=true)
      Give a timer element opacity based on it's time remaining.


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


class ElementData {
  @tracked timer;
  @tracked timerOpacity;
  @tracked velocityX;
  @tracked velocityY;
  @tracked positionX;
  @tracked positionY;
  @tracked html;

  @tracked maxTimer;

  get cssString() {
    let css = `position: absolute; top: ${this.positionY}px; left: ${this.positionX}px;`;
    if (this.timerOpacity) {
      css += ` opacity: ${this.timer / this.maxTimer};`
    }
    return htmlSafe(css);
  }

  parsePosition(startingPosition, randomPosition = false) {
    if (randomPosition) {
      this.positionX = Math.random() * 1920;
      this.positionY = Math.random() * 1080;
      return;
    }

    this.positionX = startingPosition.x || 0;
    this.positionY = startingPosition.y || 0;
  }

  parseVelocity(startingVelocity, randomVelocity = false) {
    if (randomVelocity) {
      this.velocityX = (Math.random() * 6) - 3;
      this.velocityY = (Math.random() * 6) - 3;
      return;
    }

    this.velocityX = startingVelocity.x || 0;
    this.velocityY = startingVelocity.y || 0;
  }

  constructor(timer, html, velocity, randomVelocity, position, randomPosition, timerOpacity) {
    this.timer = timer;
    this.timerOpacity = timerOpacity;
    this.maxTimer = timer;
    this.html = html;

    this.parseVelocity(velocity, randomVelocity);
    this.parsePosition(position, randomPosition);
  }
}


export default class CanvasComponent extends SocketClientComponent {
  // A tracked dictionary mapping item ids to their properties. Each item
  // has a few tracked properties:
  //  timer -> The number of milliseconds left to stay on the canvas.
  //  velocity -> The direction in which to move the item.
  //  html -> The actual html itself.
  @tracked items;

  constructor() {
    super(...arguments, 7004);
    this.items = {};
    this.heartbeat.perform();
  }



  @task
  *heartbeat() {
    while (true) {
      let items = this.items;
      let deleteKeys = [];
      for (let key in this.items) {
        if (!this.items.hasOwnProperty(key)) continue;

        let props = this.items[key];

        // Tick down the timers and remove elements as necessary.
        if (!isNone(props.timer)) {
          props.timer -= HEARTBEAT;
          if (props.timer < 0) {
            deleteKeys.push(key);
            continue;
          }
        }

        // Apply velocity to any items that have it.
        if (props.velocityX == 0 && props.velocityY == 0) continue;

        props.positionX += props.velocityX;
        props.positionY += props.velocityY;
      }

      deleteKeys.forEach(deleteKey => {
        if (!items.hasOwnProperty(deleteKey)) return;

        delete items[deleteKey];
      });

      this.items = items;
      yield timeout(HEARTBEAT);
    }
  }

  messageHandler(event) {
    this.messageHandlerTask.perform(event);
  }

  @task()
  *messageHandlerTask(event) {
    let data = JSON.parse(event.data);
    if (isNone(data.id) || isEmpty(data.id) || isNone(data.type) || isEmpty(data.type)) return;

    let messageType = data.type.toLowerCase();
    switch(messageType) {
      case 'create':
        if (isNone(data.html) || isEmpty(data.html)) return;

        let items = this.items;
        items[data.id] = new ElementData(
          data.timer,
          data.html,
          data.velocity || {},
          data.randomVelocity,
          data.position || {},
          data.randomPosition,
          isNone(data.timerOpacity) ? true : data.timerOpacity
        );
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
