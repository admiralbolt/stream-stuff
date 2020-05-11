import Model, { attr } from '@ember-data/model';

export default class SoundModel extends Model {
  @attr('string') name;
  @attr('string') sound_file;
}
