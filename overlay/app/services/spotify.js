import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { alias } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import config from '../config/environment';

let CLIENT_ID = '2c1bbe388cf94960b50a5b5edd767b2d';
let SCOPES = ['user-read-playback-position', 'user-read-currently-playing'];
let scopeString = SCOPES.join(' ');
let ACCOUNT_URL = 'https://accounts.spotify.com';
let REDIRECT_URL = 'http://localhost:4200/control-panel';

let AUTH_URL = `${ACCOUNT_URL}/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopeString)}&redirect_uri=${REDIRECT_URL}`;
let TOKEN_URL = `${ACCOUNT_URL}/api/token`;

let API_URL = 'https://api.spotify.com/v1';

export default class SpotifyService extends Service {
  @service queryParams;

  @alias('queryParams.current.code') code;

  @tracked accessToken = '';
  @tracked refreshToken = '';

  @tracked albumImageUrl = '';



  init() {
    super.init(...arguments);
    this.accessToken = localStorage.getItem('spotifyAccessToken');
    this.refreshToken = localStorage.getItem('spotifyRefreshToken');
  }

  authorize() {
    window.location.replace(AUTH_URL);
  }

  async getTokens(useRefresh) {
    let data = {
      grant_type: 'authorization_code',
      code: useRefresh ? this.refreshToken : this.code,
      redirect_uri: REDIRECT_URL,
      client_id: CLIENT_ID,
      client_secret: config.spotifySecret
    };

    let postData = Object.keys(data).map(key =>
      `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    ).join('&');

    let response = await fetch(TOKEN_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: postData
    });

    let responseData = await response.json();

    localStorage.setItem('spotifyAccessToken', responseData.access_token);
    localStorage.setItem('spotifyRefreshToken', responseData.refresh_token);

    this.accessToken = responseData.access_token;
    this.refreshToken = responseData.refresh_token;
  }

  async refreshAndRetry() {
    await this.getTokens(/*useRefresh=*/ true);
    return await getCurrentlyPlaying(true);
  }

  async getCurrentlyPlaying(isRetry) {
    let response = await fetch(`${API_URL}/me/player/currently-playing`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    if (!response.ok) {
       return isRetry ? 'asdf' : await refreshAndRetry();
    }

    let responseData = await response.json();
    return responseData;
  }

}
