import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | plugins/hotkey-display', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:plugins/hotkey-display');
    assert.ok(route);
  });
});
