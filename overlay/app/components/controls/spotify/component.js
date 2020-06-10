import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';

let IS_POLLING = 'spotify_plugin_polling';

export default class SpotifyComponent extends Component {
  @service keyValue;
  @service websockets;
  @service spotify;

  socket = null;
  @tracked isPolling = false;

  constructor() {
    super(...arguments);
    this.initialize();
  }

  async initialize() {
    this.isPolling = await this.keyValue.getValue(IS_POLLING);
    if (this.isPolling) this.pollingTask.perform();

    console.log('creating socket...');
    this.socket = this.websockets.socketFor('ws://localhost:7001/');
  }

  @action
  authorizeSpotify() {
    this.spotify.authorize();
  }

  @action
  getTokens() {
    this.spotify.getTokens(false);
  }

  @action
  refresh() {
    this.spotify.getTokens(true);
  }

  async sendCurrentlyPlaying() {
    let data = await this.spotify.getCurrentlyPlaying();

    console.log(data);

    let artist = data.item.artists.map(artist => artist.name).join(', ');
    let album = data.item.album.name;
    let song = data.item.name;
    let albumImageUrl = data.item.album.images[1].url;

    console.log('sending currently playing...');

    this.socket.send({
      albumImageUrl: albumImageUrl,
      artist: artist,
      album: album,
      song: song,
      progressMs: data.progress_ms,
      durationMs: data.item.duration_ms
    }, true);
  }

  @task
  *pollingTask() {
    while(true) {
      console.log('hello?');
      this.sendCurrentlyPlaying();
      yield timeout(1500);
    }
  }

  @action
  togglePolling() {
    if (this.isPolling) {
      this.pollingTask.cancelAll();
      this.keyValue.createOrUpdate(IS_POLLING, false);
      this.isPolling = false;
    } else {
      this.pollingTask.perform();
      this.keyValue.createOrUpdate(IS_POLLING, true);
      this.isPolling = true;
    }
  }

}
