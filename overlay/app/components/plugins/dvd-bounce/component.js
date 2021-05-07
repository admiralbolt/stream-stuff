import SocketClientComponent from 'overlay/components/socket-client/component';
import { inject as service } from '@ember/service';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';

let HEARTBEAT = 25;
let DVD_WIDTH = 100;
let DVD_HEIGHT = 44;
let CANVAS_WIDTH = 1920;
let CANVAS_HEIGHT = 1080;

export default class DvdBounceComponent extends SocketClientComponent {
  @service keyValue;

  @tracked showDvd = true;
  @tracked posX = 0;
  @tracked posY = 0;
  @tracked dvdLogoNum = 0;

  velX = 1;
  velY = 1;

  constructor() {
    super(...arguments, 7010);
    this.initialize();
    this.reset();
    this.moveLogo.perform();
  }

  async initialize() {
    this.showDvd = await this.keyValue.getValue('dvd_bounce_show');
  }

  get cssString() {
    return `position: absolute; top: ${this.posY}px; left: ${this.posX}px;`;
  }

  // We want to generate a starting position that is guaranteed to hit a corner.
  // With an initial velocity of (1, 1), the math to find a point is:
  // |x - y| = 0 mod gcd(W - w, H - h)
  // Credit: http://prgreen.github.io/blog/2013/09/30/the-bouncing-dvd-logo-explained/
  // In our case that's 28.
  reset() {
    // Pick a starting line, and shift our initial positions so they are in range.
    let xStart = Math.floor(Math.random() * (60 + 30) - 30);
    let yStart = 0;
    if (xStart < 0) {
      yStart = xStart * -1;
      xStart = 0;
    }
    // Now we pick any point on this line that's still in bounds.
    let maxShiftY = CANVAS_HEIGHT - DVD_HEIGHT - yStart - 1;
    let maxShiftX = CANVAS_WIDTH - DVD_WIDTH - xStart - 1;
    let shift = Math.floor(Math.random() * Math.min(maxShiftY, maxShiftX));

    this.posX = xStart + shift;
    this.posY = yStart + shift;
  }

  @task
  *moveLogo() {
    while (true) {
      this.posX = Math.max(0, Math.min(CANVAS_WIDTH, this.posX + this.velX));
      this.posY = Math.max(0, Math.min(CANVAS_HEIGHT, this.posY + this.velY));
      this.handleCollisions();
      yield timeout(HEARTBEAT);
    }
  }

  @task
  *corner() {
    for(let i = 0; i < 48; ++i) {
      this.incrementLogo();
      yield timeout(4 * HEARTBEAT);
    }

    this.showDvd = false;
    this.reset();
    yield timeout(1500);
    this.showDvd = true;
    this.moveLogo.perform();
  }

  incrementLogo() {
    this.dvdLogoNum = (this.dvdLogoNum + 1) % 8;
  }

  handleCollisions() {
    if ((this.posX <= 0 || CANVAS_WIDTH <= this.posX + DVD_WIDTH) &&
        (this.posY <= 0 || CANVAS_HEIGHT <= this.posY + DVD_HEIGHT)) {
      this.moveLogo.cancelAll();
      this.corner.perform();
      return;
    }

    if (this.posX <= 0 || CANVAS_WIDTH <= this.posX + DVD_WIDTH) {
      this.velX *= -1;
      this.incrementLogo();
    }

    if (this.posY <= 0 || CANVAS_HEIGHT <= this.posY + DVD_HEIGHT) {
      this.velY *= -1;
      this.incrementLogo();
    }
  }

  messageHandler(event) {
    let data = JSON.parse(event.data);
    if (data.hasOwnProperty('showDvd') && data.showDvd !== this.showDvd) {
      if (data.showDvd) {
        this.showDvd = true;
        this.moveLogo.perform();
      } else {
        this.showDvd = false;
        this.moveLogo.cancelAll();
      }
    }
  }

}
