'use strict';

define("stream-stuff/tests/integration/components/control-panel/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control-panel', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <ControlPanel />
      */
      {
        id: "4iZABm1h",
        block: "{\"symbols\":[],\"statements\":[[7,\"control-panel\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <ControlPanel>
              template block text
            </ControlPanel>
          
      */
      {
        id: "qDZ07m9b",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"control-panel\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("stream-stuff/tests/integration/components/melee-layout-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | melee-layout', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <MeleeLayout />
      */
      {
        id: "CWWLyyJI",
        block: "{\"symbols\":[],\"statements\":[[7,\"melee-layout\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <MeleeLayout>
              template block text
            </MeleeLayout>
          
      */
      {
        id: "zx9tV5vj",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"melee-layout\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("stream-stuff/tests/integration/components/melee-layout/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | melee-layout', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <MeleeLayout />
      */
      {
        id: "CWWLyyJI",
        block: "{\"symbols\":[],\"statements\":[[7,\"melee-layout\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <MeleeLayout>
              template block text
            </MeleeLayout>
          
      */
      {
        id: "zx9tV5vj",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"melee-layout\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("stream-stuff/tests/test-helper", ["stream-stuff/app", "stream-stuff/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("stream-stuff/tests/unit/adapters/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define("stream-stuff/tests/unit/models/sound-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | sound', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('sound', {});
      assert.ok(model);
    });
  });
});
define("stream-stuff/tests/unit/routes/control-panel-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | control-panel', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:control-panel');
      assert.ok(route);
    });
  });
});
define("stream-stuff/tests/unit/routes/layouts-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | layouts', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:layouts');
      assert.ok(route);
    });
  });
});
define("stream-stuff/tests/unit/routes/layouts/melee-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | layouts/melee', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:layouts/melee');
      assert.ok(route);
    });
  });
});
define("stream-stuff/tests/unit/serializers/sound-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Serializer | sound', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let serializer = store.serializerFor('sound');
      assert.ok(serializer);
    });
    (0, _qunit.test)('it serializes records', function (assert) {
      let store = this.owner.lookup('service:store');
      let record = store.createRecord('sound', {});
      let serializedRecord = record.serialize();
      assert.ok(serializedRecord);
    });
  });
});
define('stream-stuff/config/environment', [], function() {
  var prefix = 'stream-stuff';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('stream-stuff/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
