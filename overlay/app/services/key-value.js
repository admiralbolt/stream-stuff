import Service, { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';

export default class KeyValueService extends Service {
  @service store;

  init() {
    super.init(...arguments);
  }

  // Gets a key value pair if it exists, otherwise return null.
  async getRecord(key) {
    return await this.store.findRecord('keyvalue', key).then(function(record) {
      return record
    }, function() {
      return null;
    });
  }

  convertValue(value) {
    if (!isNaN(parseFloat(value)) && !isNaN(value - 0)) return value;

    return JSON.stringify(value);
  }

  // Create or update a key value.
  async createOrUpdate(key, value) {
    let record = await this.getRecord(key);
    let newValue = this.convertValue(value);
    if (!isNone(record)) {
      record.value = newValue;
    } else {
      record = this.store.createRecord('keyvalue', {
        key: key,
        value: newValue
      });
    }

    record.save();
  }

  async getValue(key) {
    let record = await this.getRecord(key);
    return !isNone(record) ? JSON.parse(record.value) : null;
  }
}
