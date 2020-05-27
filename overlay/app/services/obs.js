import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import OBSWebSocket from 'obs-websocket-js';

export default class ObsService extends Service {
  // An obs websocket.
  obs = null;
  @tracked scenes = null;

  MIC_SOURCE = 'Mic/Aux';

  init() {
    super.init(...arguments);
    this.scenes = [];
    this.obs = new OBSWebSocket();
    this.obs.on('ConnectionOpened', function() {
      this.loadScenes();
    }.bind(this));
    this.obs.connect();
  }

  loadScenes() {
    this.obs.send('GetSceneList').then(function(data) {
      let scenes = [];
      for (let scene of data.scenes) {
        scenes.push({value: scene.name, display: scene.name});
      }
      this.scenes = scenes;
    }.bind(this));
  }

  send(name, data) {
    return this.obs.send(name, data)
  }

}
