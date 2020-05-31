import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';


export default class SplashComponent extends Component {
  @service websockets;
  @service obs;
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
    this.socket = this.websockets.socketFor('ws://localhost:7002/');
    this.socket.on('open', this.openHandler, this);

    this.title = localStorage.getItem('splashTitle') || '';
    this.preview = localStorage.getItem('splashPreview') || '';
    this.timer = parseInt(localStorage.getItem('splashTimer')) || 0;
    let timerRunning = localStorage.getItem('splashTimerRunning');
    this.timerRunning = timerRunning != null ? (timerRunning == 'true') : false;

    this.endTimer = parseInt(localStorage.getItem('endTimer')) || 0;
    this.transitionToScene = localStorage.getItem('transitionToScene');
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

    localStorage.setItem('splashTitle', this.title);
    localStorage.setItem('splashPreview', this.preview);
    localStorage.setItem('splashTimer', this.timer);
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
    localStorage.setItem('endTimerRunning', true);
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
    localStorage.setItem('endTimerRunning', false);
  }

  @task
  *runEndTimer() {
    while (this.endTimer > 0) {
      localStorage.setItem('endTimer', --this.endTimer);
      yield timeout(1000);
    }

    this.endTimerRunning = false;
    localStorage.setItem('endTimerRunning', false);
    this.obs.send('StopStreaming', {});
  }

  @action
  setTransitionScene(scene) {
    this.transitionToScene = scene;
    localStorage.setItem('transitionToScene', scene);
  }

}
