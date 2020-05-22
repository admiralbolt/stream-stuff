import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ScriptSerializer extends JSONAPISerializer {
  // Load script_name as script_name and not script-name
  keyForAttribute(key) {
    return key;
  }
}
