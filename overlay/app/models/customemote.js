import Model, { attr } from '@ember-data/model';

export default class CustomEmoteModel extends Model {
  @attr('string') name;
  @attr('string') url;
}
