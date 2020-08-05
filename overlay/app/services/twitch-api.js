import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import config from '../config/environment';

let CHANNEL_URL = `https://api.twitch.tv/kraken/channels/83968979`;

export default class TwitchApiService extends Service {
  @service store;
  @service keyValue;

  @tracked streamTitle;
  @tracked streamGame;

  init() {
    super.init(...arguments);
    this.initialize();
  }

  async initialize() {
    let channel_req = await fetch(CHANNEL_URL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-Id': config.twitchClientId,
        'Authorization': await this.getAuthHeader()
      }
    });

    let channel_data = await channel_req.json();

    this.streamTitle = channel_data.status;
    this.streamGame = channel_data.game;
    return channel_data;
  }

  async getAuthHeader() {
    let access_token = await this.keyValue.getValue('twitch_access_token');
    return `OAuth ${access_token}`;
  }

  async updateStreamInfo(title, game) {
    this.streamTitle = title;
    this.streamGame = game;
    let params = {
      channel: {
        status: this.streamTitle,
        game: this.streamGame
      }
    };

    return await fetch(CHANNEL_URL, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-Id': config.twitchClientId,
        'Authorization': await this.getAuthHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
  }

}
