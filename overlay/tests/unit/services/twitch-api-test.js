import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | twitch-api', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:twitch-api');
    assert.ok(service);
  });
});
