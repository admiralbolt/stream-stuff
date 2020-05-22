import Model, { attr } from '@ember-data/model';

export default class ScriptModel extends Model {
  @attr('string') name;
  @attr('string') script_name;
  @attr('boolean') auto_stop;
}
