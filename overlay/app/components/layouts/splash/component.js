import SocketClientComponent from 'overlay/components/socket-client/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';

let MIN_ANGLE = (-Math.PI / 2.0) - Math.PI / 8.0;
let MAX_ANGLE = (-Math.PI / 2.0) + Math.PI / 8.0;

let TITLE = 'splash_screen_title';
let PREVIEW = 'splash_screen_preview';
let TIMER = 'splash_screen_timer';

// Credit where it's due:
// https://codepen.io/jlong64/pen/jwJpc
// Thanks Jarod Long!

export default class SplashComponent extends SocketClientComponent {
  @service keyValue;

  @tracked title;
  @tracked preview;
  @tracked timer;
  @tracked showTimer = false;

  @tracked frontRain = [];
  @tracked midRain = [];
  @tracked backRain = [];

  constructor() {
    super(...arguments, 7002);
    this.initialize();

    this.frontRain = this.generateRainPosition();
    this.midRain = this.generateRainPosition();
    this.backRain = this.generateRainPosition();
  }

  generateRainPosition(min = 2, max = 5) {
    let rain = [];
    let increment = Math.random() * (max - min) + min;
    let left = 0;
    while (left < 100) {
      left += increment;
      rain.push(left);
      increment = Math.random() * (max - min) + min;
    }
    return rain;
  }

  async initialize() {
    this.title = await this.keyValue.getValue(TITLE);
    this.preview = await this.keyValue.getValue(PREVIEW);
    this.timer = await this.keyValue.getValue(TIMER);
  }

  get readableTimer() {
    let minutes = Math.floor(this.timer / 60);
    let seconds = this.timer % 60;
    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  }

  messageHandler(event) {
    let data = JSON.parse(event.data);

    if (!data.info) return;

    if (data.info.title) this.title = data.info.title;
    if (data.info.preview) this.preview = data.info.preview;
    if (data.info.hasOwnProperty('timer')) this.timer = data.info.timer;
    if (data.info.hasOwnProperty('showTimer')) this.showTimer = data.info.showTimer;
  }

  // ALL the lightning bolt logic below.

  canvas = null;
  context = null;

  scale = 1.0;
  width = 1920;
  height = 1080;

  // ms in between each storm function call.
  tick = 25;

  // Flash params.
  flashOpacity = 0.0;
  maxFlash = 0.07;
  shouldFlash = false;
  flashHitPeak = false;

  // Controls how long the flashes / bolt stay on screen.
  boltFlashDuration = 0.25;
  boltFadeDuration = 0.5
  totalBoltDuration = (this.boltFlashDuration + this.boltFadeDuration) * 1000;

  bolts = []

  @action
  makeItRain() {
    this.canvas = document.getElementById('lightning');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context = this.canvas.getContext('2d');
    this.storm.perform();
  }

  //====== LIGHTNING CODE BELOW, BEWARE =======//
  launchBolt(x, y, length, direction) {
    this.shouldFlash = true;
    let boltCanvas = document.createElement('canvas');
    boltCanvas.width = this.width;
    boltCanvas.height = this.height;

    this.bolts.push({
      canvas: boltCanvas,
      duration: 0.0
    });

    this.drawBolt.perform(x, y, length, direction, boltCanvas, MIN_ANGLE, MAX_ANGLE);
  }

  @task
  *drawBolt(x, y, length, direction, boltCanvas, minAngle, maxAngle) {
    let originalDirection = direction;
    let boltContext = boltCanvas.getContext('2d');

    let i = 0;
    while (length > 0) {

      let x1 = Math.floor(x);
      let y1 = Math.floor(y);
      x += Math.cos(direction);
      y -= Math.sin(direction);
      --length;

      if (x1 != Math.floor(x) || y1 != Math.floor(y)) {
        let alpha = Math.min(1.0, length / 800.0);
        boltContext.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        boltContext.fillRect(x1, y1, 3.0, 1.0);

        direction = Math.max(minAngle, Math.min(maxAngle,
          direction + (-Math.PI / 16.0 + Math.random() * (Math.PI / 8.0))
        ));

        // 2% chance to split a lightning bolt.
        if (Math.random() < Math.max(0.015, length / 100000)) {
          if (Math.random() < 0.3) {
            yield timeout(0);
          }
          let directionMod = (-Math.PI / 6.0) + Math.random() * (Math.PI / 3.0);
          this.drawBolt.perform(
            x1, y1, length * (0.3 + Math.random() * 0.4),
            originalDirection + directionMod,
            boltCanvas, minAngle + directionMod, maxAngle + directionMod
          );
        // 5% chance to change directions.
        } else if (Math.random() < 0.05) {
          if (Math.random() < 0.3) {
            yield timeout(0);
          }
          this.drawBolt.perform(
            x1, y1, length,
            originalDirection + (-Math.PI / 6.0 + Math.random() * (Math.PI / 3.0)),
            boltCanvas, minAngle, maxAngle
          );
          length = 0;
        }
      }
    }
  }

  @task
  *storm() {
    while(true) {
      // Generates a lightning bolt if one isn't already being rendered.
      if (this.bolts.length == 0 && Math.random() < 0.05) {
        let x = Math.floor(-10 + Math.random() * (this.width + 20.0));
        let y = Math.floor(Math.random() * 200 + 20.0);
        let length = Math.floor((this.height / 2.0) + Math.random() * 2 * this.height / 3.0);
        this.launchBolt(x, y, length, Math.PI * 3.0 / 2.0);
      }

      this.context.clearRect(0, 0, this.width, this.height);

      if (this.shouldFlash) {
        if (this.flashHitPeak) {
          this.flashOpacity -= this.tick / 2000.0;
          if (this.flashOpacity <= 0) {
            this.flashOpacity = 0;
            this.shouldFlash = false;
            this.flashHitPeak = false;
          }
        } else {
          this.flashOpacity = Math.max(this.maxFlash, this.flashOpacity + this.tick / 2000.0);
          if (this.flashOpacity == this.maxFlash) this.flashHitPeak = true;

        }
        this.context.fillStyle = `rgba(255, 255, 255, ${this.flashOpacity})`;
        this.context.fillRect(0, 0, this.width, this.height);
      }

      for (let [index, bolt] of this.bolts.entries()) {
        bolt.duration += this.tick;

        if (bolt.duration >= this.totalBoltDuration) {
          this.bolts.splice(index, 1);
          --index;
          continue;
        }

        this.context.globalAlpha = 1;
        // this.context.globalAlpha = Math.max(0.0, Math.min(1.0, (this.totalBoltDuration - bolt.duration) / this.boltFadeDuration));
        this.context.drawImage(bolt.canvas, 0.0, 0.0);
      }

      yield timeout(this.tick);
    }
  }

}
