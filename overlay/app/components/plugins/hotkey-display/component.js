import SocketClientComponent from 'overlay/components/socket-client/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'overlay/config/environment';
import { action } from '@ember/object';

class DataItem {
  @tracked id;
  @tracked name;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export default class SpotifyComponent extends SocketClientComponent {
  @service keyValue;

  @tracked sound_page;
  // Sounds to display in the plugin. Broken up into rows to make iterating
  // easier since handlebars doesn't support indexed for loops.
  @tracked soundRow1;
  @tracked soundRow2;

  @tracked script_page;
  // Scripts to display in the plugin. Broken up into rows to make iterating
  // easier since handelbars doesn't support indexed for loops.
  @tracked scriptRow1;
  @tracked scriptRow2;

  constructor() {
    super(...arguments, 7009);
    this.initialize();
  }

  async initialize() {
    this.sound_page = await this.keyValue.getValue('soundboard_keybind_page');
    await this.loadSounds();
    this.script_page = await this.keyValue.getValue('script_keybind_page');
    await this.loadScripts();
  }

  async loadSounds() {
    let sound_fetch = await fetch(`${ENV.host}/get_sounds_by_page?page=${this.sound_page}`);
    let sounds = await sound_fetch.json();
    let newRow1 = [];
    let newRow2 = [];
    for (let i = 0; i < sounds.length; ++i) {
      let sound = new DataItem(sounds[i].id, sounds[i].name);
      (i <= 4) ? newRow1.pushObject(sound) : newRow2.pushObject(sound);
    }
    this.soundRow1 = newRow1;
    this.soundRow2 = newRow2;
  }

  async loadScripts() {
    let script_fetch = await fetch(`${ENV.host}/get_scripts_by_page?page=${this.script_page}`);
    let scripts = await script_fetch.json();
    let newRow1 = [];
    let newRow2 = [];
    for (let i = 0; i < scripts.length; ++i) {
      let script = new DataItem(scripts[i].script_name, scripts[i].name);
      (i <= 4) ? newRow1.pushObject(script) : newRow2.pushObject(script);
    }
    this.scriptRow1 = newRow1;
    this.scriptRow2 = newRow2;
  }

  @action
  playOrStopSound(sound_id) {
    fetch(`${ENV.host}/play_sound/?sound_id=${sound_id}`);
  }

  @action
  startOrStopScript(script_id) {
    fetch(`${ENV.host}/run_script/?script_name=${script_id}`);
  }

  messageHandler(event) {
    let data = JSON.parse(event.data);
    console.log(data);
    if (!data.hasOwnProperty("sound_page")) return;

    this.sound_page = data.sound_page;
    this.loadSounds();
  }

}
