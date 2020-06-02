import Model, { attr } from '@ember-data/model';

export default class KeyValueModel extends Model {
  @attr('string') key;
  @attr('string') value;
}
