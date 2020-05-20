import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | plugins/brain', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:plugins/brain');
    assert.ok(route);
  });
});
