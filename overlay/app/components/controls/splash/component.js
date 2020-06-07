import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';

let TITLE = 'splash_screen_title';
let PREVIEW = 'splash_screen_preview';
let TIMER = 'splash_screen_timer';
let TIMER_RUNNING = 'splash_screen_timer_running';

let END_TIMER = 'splash_screen_end_timer';
let TRANSITION_TO_SCENE = 'splash_screen_transition_to_scene';

export default class SplashComponent extends Component {
  @service keyValue;
  @service obs;
  @service websockets;

  socket = null;

  @tracked title;
  @tracked preview;
  // Timer for the preview
  @tracked timer;
  @tracked timerRunning;
  // Secret timer for shutting down the stream.
  @tracked endTimer;
  @tracked endTimerRunning;

  @tracked transitionToScene;

  constructor() {
    super(...arguments);
    this.initialize();
  }

  async initialize() {
    this.title = await this.keyValue.getValue(TITLE);
    this.preview = await this.keyValue.getValue(PREVIEW);
    this.timer = await this.keyValue.getValue(TIMER);
    this.timerRunning = await this.keyValue.getValue(TIMER_RUNNING);
    this.endTimer = await this.keyValue.getValue(END_TIMER);
    this.transitionToScene = await this.keyValue.getValue(TRANSITION_TO_SCENE);

    this.socket = this.websockets.socketFor('ws://localhost:7002/');
    this.socket.on('open', this.openHandler, this);
  }

  openHandler() {
    if (this.timerRunning) {
      this.startTimer();
    }
    this.updateInfo();
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

    this.keyValue.createOrUpdate(TITLE, this.title);
    this.keyValue.createOrUpdate(PREVIEW, this.preview);
    this.keyValue.createOrUpdate(TIMER, this.timer);
  }

  @action
  startTimer() {
    this.obs.send('SetMute', {
      'source': this.obs.MIC_SOURCE,
      'mute': true
    });
    this.runTimer.perform();
    this.socket.send({
      info: {
        showTimer: true
      }
    }, true);
    this.keyValue.createOrUpdate(TIMER_RUNNING, true);
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
    this.keyValue.createOrUpdate(TIMER_RUNNING, false);
    this.timerRunning = false;
  }

  @task
  *runTimer() {
    while (this.timer > 0) {
      this.keyValue.createOrUpdate(TIMER, --this.timer);
      this.socket.send({
        info: {
          timer: this.timer
        }
      }, true);
      yield timeout(1000);
    }
    this.timerRunning = false;
    this.stopTimer();

    // We only call this if the timer naturally runs out, transition to the
    // target scene.
    this.obs.send('SetCurrentScene', {
      'scene-name': this.transitionToScene
    });
    this.obs.send('SetMute', {
      'source': this.obs.MIC_SOURCE,
      'mute': false
    });
  }

  @action
  startEndTimer() {
    this.updateInfo();
    this.runEndTimer.perform();
    this.endTimerRunning = true;
    this.obs.send('SetCurrentScene', {
      'scene-name': 'Splash'
    });
    this.obs.send('SetMute', {
      'source': this.obs.MIC_SOURCE,
      'mute': true
    });
  }

  @action
  stopEndTimer() {
    this.runEndTimer.cancelAll();
    this.endTimerRunning = false;
  }

  @task
  *runEndTimer() {
    while (this.endTimer > 0) {
      this.keyValue.createOrUpdate(END_TIMER, --this.endTimer);
      yield timeout(1000);
    }

    this.endTimerRunning = false;
    this.obs.send('StopStreaming', {});
  }

  @action
  setTransitionScene(scene) {
    this.transitionToScene = scene;
    this.keyValue.createOrUpdate(TRANSITION_TO_SCENE, scene);
  }

}
