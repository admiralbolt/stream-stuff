import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { rawTimeout, timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';

let TITLE = 'splash_screen_title';
let PREVIEW = 'splash_screen_preview';
let TIMER = 'splash_screen_timer';
let TIMER_RUNNING = 'splash_screen_timer_running';
let SHOW_CONTENT = 'splash_screen_show_content';

let END_TIMER = 'splash_screen_end_timer';
let TRANSITION_TO_SCENE = 'splash_screen_transition_to_scene';

export default class SplashComponent extends Component {
  @service keyValue;
  @service obs;
  @service twitchApi;
  @service websockets;

  socket = null;

  @tracked showContent;
  @tracked title;
  @tracked preview;
  // Timer for the preview
  @tracked timer;
  @tracked timerRunning;
  // Secret timer for shutting down the stream.
  @tracked endTimer;
  @tracked endTimerRunning;

  @tracked transitionToScene;

  @alias('twitchApi.streamTitle') streamTitle;
  @alias('twitchApi.streamGame') streamGame;

  constructor() {
    super(...arguments);
    this.initialize();
  }

  async initialize() {
    this.title = await this.keyValue.getValue(TITLE);
    this.preview = await this.keyValue.getValue(PREVIEW);
    this.showContent = await this.keyValue.getValue(SHOW_CONTENT);
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
        timer: this.timer,
        showContent: this.showContent
      }
    }, true);

    this.keyValue.createOrUpdate(TITLE, this.title);
    this.keyValue.createOrUpdate(PREVIEW, this.preview);
    this.keyValue.createOrUpdate(TIMER, this.timer);
    this.keyValue.createOrUpdate(SHOW_CONTENT, this.showContent);
  }

  @action
  startTimer() {
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
    let prev_date = new Date();
    while (this.timer > 0) {
      yield this.keyValue.createOrUpdate(TIMER, --this.timer);
      yield this.socket.send({
        info: {
          timer: this.timer
        }
      }, true);

      // So. For some reason, when you aren't focused on the tab in which the
      // timer is running, timeout & rawTimeout take ~twice as long. I *think*
      // this has something to do with chrome throttling setTimeout / ember
      // runloop shenanigans. But, allegedly chrome only throttles up to 1/sec
      // which is what we are doing here.
      //
      // This is a MASSIVE hack, that detects if the current tab is focused or
      // not, and adjusts the base delay between 1000 milliseconds and 500
      // milliseconds so that the actual delay is consistent.
      //
      // What the actual fuck.
      let delay = (document.hidden ? 500 : 1000) - (new Date() - prev_date) - 1;
      yield rawTimeout(delay);
      prev_date = new Date();
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
    this.showContent = false;
    this.updateInfo();
  }

  @action
  async updateStream() {
    await this.twitchApi.updateStreamInfo(this.streamTitle, this.streamGame);
  }

  @action
  async startStream() {
    this.showContent = true;
    this.updateInfo();
    await this.updateStream();
    this.obs.send('SetCurrentScene', {
      'scene-name': 'Splash'
    });
    this.obs.send('SetMute', {
      'source': this.obs.MIC_SOURCE,
      'mute': true
    });
    this.obs.send('StartStreaming', {});
    this.startTimer();
  }

  @action
  endStream() {
    this.showContent = true;
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
    let prev_date = new Date();
    while (this.endTimer > 0) {
      this.keyValue.createOrUpdate(END_TIMER, --this.endTimer);
      let delay = (document.hidden ? 500 : 1000) - (new Date() - prev_date) - 1;
      yield timeout(delay);
      prev_date = new Date();
    }

    this.endTimerRunning = false;
    this.obs.send('StopStreaming', {});
  }

  @action
  setTransitionScene(scene) {
    this.transitionToScene = scene;
    this.keyValue.createOrUpdate(TRANSITION_TO_SCENE, scene);
  }

  @action
  setDefaultPre() {
    this.title = 'Stream Starting Soon!';
    // This looks weird but necessary for whitespace to render correctly.
    this.preview = `<b>Today's Stream:</b><br />
<ul>
<li> </li>
</ul>`;
    this.timer = 180;
  }

  @action
  setDefaultPost() {
    this.title = 'Stream Has Ended!';
    this.preview = 'Thanks for tuning in!';
    this.endTimer = 180;
  }

  @action
  toggleShowContent() {
    this.showContent = !this.showContent;
    this.updateInfo();
  }

}
