import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | control-panel', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:control-panel');
    assert.ok(route);
  });
});
