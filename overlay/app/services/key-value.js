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

  // Create or update a key value.
  async createOrUpdate(key, value) {
    let record = await this.getRecord(key);
    if (!isNone(record)) {
      record.value = value;
    } else {
      record = this.store.createRecord('keyvalue', {
        key: key,
        value: value
      });
    }

    record.save();
  }

  async getValue(key) {
    let record = await this.getRecord(key);
    return !isNone(record) ? record.value : null;
  }
}
