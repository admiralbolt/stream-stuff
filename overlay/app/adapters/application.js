import JSONAPIAdapter from '@ember-data/adapter/json-api';
import config from '../config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = config.host;
}
