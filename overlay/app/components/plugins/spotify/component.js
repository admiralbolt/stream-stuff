import SocketClientComponent from 'overlay/components/socket-client/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

let IS_VISIBLE = 'spotify_is_visible';

export default class SpotifyComponent extends SocketClientComponent {
  @service keyValue;
  @tracked isVisible = true;

  @tracked albumImageUrl = null;
  @tracked artist = null;
  @tracked album = null;
  @tracked song = null;
  @tracked progressMs = null;
  @tracked durationMs = null;

  toReadable(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  }

  get progressReadable() {
    return this.toReadable(this.progressMs);
  }

  get durationReadable() {
    return this.toReadable(this.durationMs);
  }

  get progressPercent() {
    return Math.floor(100 * this.progressMs / this.durationMs);
  }

  constructor() {
    super(...arguments, 7001);
    this.initialize();
  }

  async initialize() {
    this.isVisible = await this.keyValue.getValue(IS_VISIBLE);
  }

  messageHandler(event) {
    let data = JSON.parse(event.data);
    console.log(data);
    if (data.hasOwnProperty('show')) {
      this.isVisible = data.show;
      return;
    }

    this.albumImageUrl = data.album_image_url;
    this.artist = data.artist;
    this.album = data.album;
    this.song = data.song;
    this.progressMs = data.progress_ms;
    this.durationMs = data.duration_ms;

    this.playerNames = JSON.parse(event.data);
  }


};
