import SocketClientComponent from 'overlay/components/socket-client/component';
import { tracked } from '@glimmer/tracking';

export default class SpotifyComponent extends SocketClientComponent {
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
  }

  messageHandler(event) {
    let data = JSON.parse(event.data);
    console.log(data);
    this.albumImageUrl = data.album_image_url;
    this.artist = data.artist;
    this.album = data.album;
    this.song = data.song;
    this.progressMs = data.progress_ms;
    this.durationMs = data.duration_ms;

    this.playerNames = JSON.parse(event.data);
  }


};
