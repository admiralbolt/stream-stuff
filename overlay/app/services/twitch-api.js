import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import config from '../config/environment';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';



let SCOPES = ['clips:edit', 'chat:edit'];
let scopeString = SCOPES.join(' ');
let AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${config.twitchClientId}&redirect_uri=http://localhost:4200/control-panel&response_type=code&scope=${encodeURIComponent(scopeString)}`;

export default class TwitchApiService extends Service {
  @service queryParams;
  @service store;
  @service keyValue;

  @alias('queryParams.current.code') code;

  // Don't think I'll actually use this on the frontend, but you never know.
  oauth_token = null;

  access_token = null;
  refresh_token = null;

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
