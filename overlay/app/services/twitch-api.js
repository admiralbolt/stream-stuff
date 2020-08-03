import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import config from '../config/environment';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';



let SCOPES = [
  'bits:read',
  'clips:edit',
  'channel_subscriptions',
  'chat:edit',
  'channel:read:redemptions',
  'channel:moderate',
  'channel_editor',
  'channel_read'
];

let scopeString = SCOPES.join(' ');
let AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${config.twitchClientId}&redirect_uri=http://localhost:4200/control-panel&response_type=code&scope=${encodeURIComponent(scopeString)}`;

let CHANNEL_URL = `https://api.twitch.tv/kraken/channels/83968979`;

export default class TwitchApiService extends Service {
  @service queryParams;
  @service store;
  @service keyValue;

  @alias('queryParams.current.code') code;

  access_token = null;
  refresh_token = null;

  @tracked streamTitle;
  @tracked streamGame;

  init() {
    super.init(...arguments);
    this.initialize();
  }

  authorize() {
    window.location.replace(AUTH_URL);
  }

  async initialize() {
    this.access_token = await this.keyValue.getValue('twitch_oauth_token');
    this.refresh_token = await this.keyValue.getValue('twitch_refresh_token');
    this.refresh.perform();
    await this.loadStreamInfo();
  }

  async loadStreamInfo() {
    let channel_req = await fetch(CHANNEL_URL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-Id': config.twitchClientId,
        'Authorization': `OAuth ${this.access_token}`
      }
    });

    let channel_data = await channel_req.json();

    this.streamTitle = channel_data.status;
    this.streamGame = channel_data.game;
    return channel_data;
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
        'Authorization': `OAuth ${this.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
  }

  async getTokens(refresh = false) {
    let params = {
      client_id: config.twitchClientId,
      client_secret: config.twitchClientSecret,
      grant_type: refresh ? 'refresh_token' : 'authorization_code',
    };
    if (refresh) {
      params.refresh_token = this.refresh_token;
    } else {
      params.code = this.code;
      params.redirect_uri = 'http://localhost:4200/control-panel'
    }

    let param_arr = [];
    for (let prop in params) {
      if (params.hasOwnProperty(prop)) {
        param_arr.push(`${prop}=${params[prop]}`);
      }
    }

    let some_string = (refresh) ? '--data-urlencode' : '';

    let base_url = `https://id.twitch.tv/oauth2/token`;

    let response = await fetch(`${base_url}?${param_arr.join('&')}`, {
      method: 'POST',
      mode: 'cors'
    });

    if (!response.ok) {
      console.log(response);
      return;
    }

    let responseData = await response.json();

    this.accessToken = responseData.access_token;
    this.refreshToken = responseData.refresh_token;
    await this.keyValue.createOrUpdate('twitch_oauth_token', responseData.access_token);
    await this.keyValue.createOrUpdate('twitch_refresh_token', responseData.refresh_token);
  }

  @task
  *refresh() {
    while(true) {
      this.getTokens(/*refresh=*/true);
      // Run every hour.
      yield timeout(60 * 60 * 1 * 1000);
    }
  }

}
