'use strict';

define("overlay/tests/integration/components/control-panel/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
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
define("overlay/tests/integration/components/controls/melee/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | controls/melee', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Controls::Melee />
      */
      {
        id: "ACwXvJG1",
        block: "{\"symbols\":[],\"statements\":[[7,\"controls/melee\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Controls::Melee>
              template block text
            </Controls::Melee>
          
      */
      {
        id: "C76lP6be",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"controls/melee\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("overlay/tests/integration/components/controls/sound-board/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | controls/sound-board', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Controls::SoundBoard />
      */
      {
        id: "EiJkyi8O",
        block: "{\"symbols\":[],\"statements\":[[7,\"controls/sound-board\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Controls::SoundBoard>
              template block text
            </Controls::SoundBoard>
          
      */
      {
        id: "miGvZW7R",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"controls/sound-board\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("overlay/tests/integration/components/controls/splash/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | controls/splash', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Controls::Splash />
      */
      {
        id: "8gQuqv+x",
        block: "{\"symbols\":[],\"statements\":[[7,\"controls/splash\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Controls::Splash>
              template block text
            </Controls::Splash>
          
      */
      {
        id: "J8BlgbGS",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"controls/splash\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("overlay/tests/integration/components/controls/spotify/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | controls/spotify', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Controls::Spotify />
      */
      {
        id: "NYEcny36",
        block: "{\"symbols\":[],\"statements\":[[7,\"controls/spotify\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Controls::Spotify>
              template block text
            </Controls::Spotify>
          
      */
      {
        id: "lexwHtIm",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"controls/spotify\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("overlay/tests/integration/components/controls/twitch-chat-bot/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | controls/twitch-chat-bot', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Controls::TwitchChatBot />
      */
      {
        id: "EuLifmCp",
        block: "{\"symbols\":[],\"statements\":[[7,\"controls/twitch-chat-bot\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Controls::TwitchChatBot>
              template block text
            </Controls::TwitchChatBot>
          
      */
      {
        id: "DOiL9VUV",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"controls/twitch-chat-bot\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("overlay/tests/integration/components/layouts/melee/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layouts/melee', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Layouts::Melee />
      */
      {
        id: "F0gHqycq",
        block: "{\"symbols\":[],\"statements\":[[7,\"layouts/melee\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Layouts::Melee>
              template block text
            </Layouts::Melee>
          
      */
      {
        id: "5YXfbzwC",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"layouts/melee\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("overlay/tests/integration/components/layouts/splash/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layouts/splash', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Layouts::Splash />
      */
      {
        id: "Y8Y02x1E",
        block: "{\"symbols\":[],\"statements\":[[7,\"layouts/splash\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Layouts::Splash>
              template block text
            </Layouts::Splash>
          
      */
      {
        id: "x+GDumdl",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"layouts/splash\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("overlay/tests/integration/components/melee-layout-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
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
define("overlay/tests/integration/components/plugins/spotify/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | plugins/spotify', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Plugins::Spotify />
      */
      {
        id: "U5JQcZra",
        block: "{\"symbols\":[],\"statements\":[[7,\"plugins/spotify\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Plugins::Spotify>
              template block text
            </Plugins::Spotify>
          
      */
      {
        id: "UYZQIu8y",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"plugins/spotify\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("overlay/tests/integration/components/socket-client/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | socket-client', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <SocketClient />
      */
      {
        id: "dF4z9E/i",
        block: "{\"symbols\":[],\"statements\":[[7,\"socket-client\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <SocketClient>
              template block text
            </SocketClient>
          
      */
      {
        id: "xZSk/jdM",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"socket-client\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("overlay/tests/integration/components/sound-board/board-item/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | sound-board/board-item', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <SoundBoard::BoardItem />
      */
      {
        id: "v5GkbJRh",
        block: "{\"symbols\":[],\"statements\":[[7,\"sound-board/board-item\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <SoundBoard::BoardItem>
              template block text
            </SoundBoard::BoardItem>
          
      */
      {
        id: "LQwgk0qT",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"sound-board/board-item\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("overlay/tests/integration/components/sound-board/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | sound-board', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <SoundBoard />
      */
      {
        id: "3pQu+rf1",
        block: "{\"symbols\":[],\"statements\":[[7,\"sound-board\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <SoundBoard>
              template block text
            </SoundBoard>
          
      */
      {
        id: "qjg2p4fH",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"sound-board\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("overlay/tests/test-helper", ["overlay/app", "overlay/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("overlay/tests/unit/adapters/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define("overlay/tests/unit/instance-initializers/spotify-test", ["overlay/instance-initializers/spotify", "qunit"], function (_spotify, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Instance Initializer | spotify', function (hooks) {
    hooks.beforeEach(function () {
      this.TestApplication = Ember.Application.extend();
      this.TestApplication.instanceInitializer({
        name: 'initializer under test',
        initialize: _spotify.initialize
      });
      this.application = this.TestApplication.create({
        autoboot: false
      });
      this.instance = this.application.buildInstance();
    });
    hooks.afterEach(function () {
      Ember.run(this.instance, 'destroy');
      Ember.run(this.application, 'destroy');
    }); // Replace this with your real tests.

    (0, _qunit.test)('it works', async function (assert) {
      await this.instance.boot();
      assert.ok(true);
    });
  });
});
define("overlay/tests/unit/models/sound-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
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
define("overlay/tests/unit/routes/control-panel-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | control-panel', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:control-panel');
      assert.ok(route);
    });
  });
});
define("overlay/tests/unit/routes/layouts-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | layouts', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:layouts');
      assert.ok(route);
    });
  });
});
define("overlay/tests/unit/routes/layouts/melee-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | layouts/melee', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:layouts/melee');
      assert.ok(route);
    });
  });
});
define("overlay/tests/unit/routes/layouts/splash-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | layouts/splash', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:layouts/splash');
      assert.ok(route);
    });
  });
});
define("overlay/tests/unit/routes/plugins/spotify-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | plugins/spotify', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:plugins/spotify');
      assert.ok(route);
    });
  });
});
define("overlay/tests/unit/serializers/sound-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
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
define("overlay/tests/unit/services/spotify-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | spotify', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:spotify');
      assert.ok(service);
    });
  });
});
define("overlay/tests/unit/services/twitch-chat-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | twitch-chat', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:twitch-chat');
      assert.ok(service);
    });
  });
});
define("overlay/tests/unit/utils/command-base-test", ["overlay/utils/command-base", "qunit"], function (_commandBase, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | command-base', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _commandBase.default)();
      assert.ok(result);
    });
  });
});
define("overlay/tests/unit/utils/get-command-test", ["overlay/utils/get-command", "qunit"], function (_getCommand, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | get-command', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _getCommand.default)();
      assert.ok(result);
    });
  });
});
define("overlay/tests/unit/utils/test-command-test", ["overlay/utils/test-command", "qunit"], function (_testCommand, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | test-command', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _testCommand.default)();
      assert.ok(result);
    });
  });
});
define('overlay/config/environment', [], function() {
  var prefix = 'overlay';
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

require('overlay/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
