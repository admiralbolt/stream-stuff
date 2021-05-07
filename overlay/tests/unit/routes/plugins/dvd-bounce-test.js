import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | plugins/dvd-bounce', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:plugins/dvd-bounce');
    assert.ok(route);
  });
});
