import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | plugins/koth-message', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:plugins/koth-message');
    assert.ok(route);
  });
});
