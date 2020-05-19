import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';

export default class SplashComponent extends Component {
  @service websockets;
  socket = null;

  @tracked title;
  @tracked preview;
  @tracked timer;
  @tracked timerRunning;

  constructor() {
    super(...arguments);
    this.socket = this.websockets.socketFor('ws://localhost:7002/');
    this.socket.on('open', this.openHandler, this);

    this.title = localStorage.getItem('splashTitle') || '';
    this.preview = localStorage.getItem('splashPreview') || '';
    this.timer = localStorage.getItem('splashTimer') || 0;
    let timerRunning = localStorage.getItem('splashTimerRunning');
    this.timerRunning = timerRunning != null ? (timerRunning == 'true') : false;
  }

  openHandler() {
    if (this.timerRunning) {
      this.startTimer();
    }
  }

  @action
  updateInfo() {
    this.socket.send({
      info: {
        title: this.title,
        preview: this.preview,
        timer: this.timer
      }
    }, true);

    localStorage.setItem('splashTitle', this.title);
    localStorage.setItem('splashPreview', this.preview);
    localStorage.setItem('splashTimer', this.timer);
  }

  @action
  startTimer() {
    this.runTimer.perform();
    this.socket.send({
      info: {
        showTimer: true
      }
    }, true);
    localStorage.setItem('splashTimerRunning', true);
    localStorage.setItem('splashShowTimer', true);
    this.timerRunning = true;
  }

  @action
  stopTimer() {
    this.runTimer.cancelAll();
    this.socket.send({
      info: {
        showTimer: false
      }
    }, true);
    localStorage.setItem('splashTimerRunning', false);
    localStorage.setItem('splashShowTimer', false);
    this.timerRunning = false;
  }

  @task
  *runTimer() {
    while (this.timer > 0) {
      localStorage.setItem('splashTimer', --this.timer);
      this.socket.send({
        info: {
          timer: this.timer
        }
      }, true);
      yield timeout(1000);
    }
    this.showTimer = false;
    this.socket.send({
      info: {
        showTimer: false,
        timer: 0
      }
    }, true);
  }

}
