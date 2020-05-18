import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import config from '../../config/environment';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';


export default class ControlPanelComponent extends Component {
  @service websockets;
  @service spotify;
  @service twitchChat;

  spotifySocket = null;
  @tracked isPolling = false;
  @alias('twitchChat.botIsAlive') botIsAlive;

  // A list of all sounds loaded from the rest api.
  sounds = null;

  constructor() {
    super(...arguments);
    this.spotifySocket = this.websockets.socketFor('ws://localhost:7001/');
    this.isPolling = localStorage.getItem('spotifyPolling');
    if (this.isPolling) this.pollingTask.perform();
  }

  @action
  startBot() {
    this.twitchChat.start();
  }

  @action
  stopBot() {
    this.twitchChat.stop();
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

    let progress = data.progress_ms / data.item.duration_ms;
    let artist = data.item.artists.map(artist => artist.name).join(', ');
    let album = data.item.album.name;
    let song = data.item.name;
    let albumImageUrl = data.item.album.images[1].url;

    this.spotifySocket.send({
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
      this.sendCurrentlyPlaying();
      yield timeout(1500);
    }
  }

  async startPolling() {
    this.pollingTask.perform();
    localStorage.setItem('spotifyPolling', true);
    this.isPolling = true;
  }

  async stopPolling() {
    this.pollingTask.cancelAll();
    localStorage.removeItem('spotifyPolling');
    this.isPolling = false;
  }

}
