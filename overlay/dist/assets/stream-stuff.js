'use strict';



;define("stream-stuff/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("stream-stuff/adapters/application", ["exports", "@ember-data/adapter/json-api", "stream-stuff/config/environment"], function (_exports, _jsonApi, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class ApplicationAdapter extends _jsonApi.default {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "host", _environment.default.host);
    }

  }

  _exports.default = ApplicationAdapter;
});
;define("stream-stuff/app", ["exports", "ember-resolver", "ember-load-initializers", "stream-stuff/config/environment"], function (_exports, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class App extends Ember.Application {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);

      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);

      _defineProperty(this, "Resolver", _emberResolver.default);
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("stream-stuff/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
});
;define("stream-stuff/components/control-panel/component", ["exports", "@glimmer/component", "stream-stuff/config/environment"], function (_exports, _component, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let ControlPanelComponent = (_class = (_temp = class ControlPanelComponent extends _component.default {
    // A list of all sounds loaded from the rest api.
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "websockets", _descriptor, this);

      _initializerDefineProperty(this, "store", _descriptor2, this);

      _defineProperty(this, "socket", null);

      _defineProperty(this, "sounds", null);

      _defineProperty(this, "player1", 'Me');

      _defineProperty(this, "player2", 'BrickLee');

      _defineProperty(this, "player3", '');

      _defineProperty(this, "player4", '');

      this.sounds = this.store.findAll('sound');
      const socket = this.websockets.socketFor('ws://localhost:7000/');
      socket.on('open', this.openHandler, this);
      socket.on('close', this.closeHandler, this);
      this.socket = socket;
    }

    willDestroy() {
      super.willDestroy(...arguments);
      this.socket.off('open', this.openHandler);
      this.socket.off('message', this.messageHandler);
      this.socket.off('close', this.closeHandler);
    }

    openHandler(event) {
      console.log(`On open was called: ${event}`);
    }

    closeHandler(event) {
      console.log(`Close was called: ${event}`);
    }

    updatePlayerNames() {
      this.socket.send({
        player1: this.player1,
        player2: this.player2,
        player3: this.player3,
        player4: this.player4
      }, true);
    }

    playSound(soundId) {
      fetch(`${_environment.default.host}/play_sound/?sound_id=${soundId}`);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "websockets", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "store", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "updatePlayerNames", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "updatePlayerNames"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "playSound", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "playSound"), _class.prototype)), _class);
  _exports.default = ControlPanelComponent;
});
;define("stream-stuff/components/control-panel/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {};
  _exports.default = _default;
});
;define("stream-stuff/components/control-panel/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "7MeC6p+y",
    "block": "{\"symbols\":[\"sound\"],\"statements\":[[1,0,0,0,[31,2,5,[27,[26,3,\"CallHead\"],[]],null,[[\"type\",\"value\"],[\"text\",[27,[26,2,\"Expression\"],[]]]]]],[1,1,0,0,\"\\n\"],[1,0,0,0,[31,39,5,[27,[26,3,\"CallHead\"],[]],null,[[\"type\",\"value\"],[\"text\",[27,[26,4,\"Expression\"],[]]]]]],[1,1,0,0,\"\\n\"],[1,0,0,0,[31,76,5,[27,[26,3,\"CallHead\"],[]],null,[[\"type\",\"value\"],[\"text\",[27,[26,5,\"Expression\"],[]]]]]],[1,1,0,0,\"\\n\"],[1,0,0,0,[31,113,5,[27,[26,3,\"CallHead\"],[]],null,[[\"type\",\"value\"],[\"text\",[27,[26,6,\"Expression\"],[]]]]]],[1,1,0,0,\"\\n\\n\"],[9,\"button\",false],[3,0,0,[27,[26,1,\"ModifierHead\"],[]],[[27,[24,0],[]],[27,[26,7,\"Expression\"],[]]],null],[10],[1,1,0,0,\"Update Player Names\"],[11],[1,1,0,0,\"\\n\\n\\n\"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound-board\"],[[\"from\"],[\"stream-stuff/components/control-panel/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,10,\"BlockHead\"],[]],[[31,0,0,[27,[26,9,\"CallHead\"],[]],[[31,0,0,[27,[26,9,\"CallHead\"],[]],[[27,[26,8,\"Expression\"],[]]],null]],null]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound\"],[[\"from\"],[\"stream-stuff/components/control-panel/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[9,\"p\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound-name\"],[[\"from\"],[\"stream-stuff/components/control-panel/styles\"]]]]],null],[10],[1,0,0,0,[27,[24,1],[\"name\"]]],[11],[1,1,0,0,\"\\n      \"],[9,\"button\",false],[3,0,0,[27,[26,1,\"ModifierHead\"],[]],[[27,[24,0],[]],\"playSound\",[27,[24,1],[\"id\"]]],null],[10],[1,1,0,0,\"Play\"],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[1]}]]],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"action\",\"player1\",\"input\",\"player2\",\"player3\",\"player4\",\"updatePlayerNames\",\"sounds\",\"-track-array\",\"each\"]}",
    "meta": {
      "moduleName": "stream-stuff/components/control-panel/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("stream-stuff/components/file-dropzone", ["exports", "ember-file-upload/components/file-dropzone/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
;define("stream-stuff/components/file-upload", ["exports", "ember-file-upload/components/file-upload/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
;define("stream-stuff/components/melee-layout/component", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let MeleeLayoutComponent = (_class = (_temp = class MeleeLayoutComponent extends _component.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "websockets", _descriptor, this);

      _defineProperty(this, "socket", null);

      _initializerDefineProperty(this, "playerNames", _descriptor2, this);

      const socket = this.websockets.socketFor('ws://localhost:7000/');
      socket.on('open', this.openHandler, this);
      socket.on('message', this.messageHandler, this);
      socket.on('close', this.closeHandler, this);
      this.socket = socket;
    }

    willDestroy() {
      super.willDestroy(...arguments);
      this.socket.off('open', this.openHandler);
      this.socket.off('message', this.messageHandler);
      this.socket.off('close', this.closeHandler);
    }

    openHandler(event) {
      console.log(`On open was called: ${event}`);
    }

    messageHandler(event) {
      this.playerNames = JSON.parse(event.data);
    }

    closeHandler(event) {
      console.log(`Close was called: ${event}`);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "websockets", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "playerNames", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return {
        player1: '',
        player2: '',
        player3: '',
        player4: ''
      };
    }
  })), _class);
  _exports.default = MeleeLayoutComponent;
});
;define("stream-stuff/components/melee-layout/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "melee-layout": "_melee-layout_vq8vkj",
    "vidja-game": "_vidja-game_vq8vkj",
    "name-space": "_name-space_vq8vkj",
    "name-plates": "_name-plates_vq8vkj",
    "name-plate-spacer": "_name-plate-spacer_vq8vkj",
    "name-wrapper": "_name-wrapper_vq8vkj",
    "player": "_player_vq8vkj",
    "p1": "_p1_vq8vkj",
    "p2": "_p2_vq8vkj",
    "p3": "_p3_vq8vkj",
    "p4": "_p4_vq8vkj",
    "name": "_name_vq8vkj",
    "panel": "_panel_vq8vkj",
    "vertical-spacer": "_vertical-spacer_vq8vkj",
    "web-cam": "_web-cam_vq8vkj",
    "spacer": "_spacer_vq8vkj",
    "camera-box": "_camera-box_vq8vkj",
    "the-rest": "_the-rest_vq8vkj"
  };
  _exports.default = _default;
});
;define("stream-stuff/components/melee-layout/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "aeWRRAZH",
    "block": "{\"symbols\":[],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"melee-layout\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"vidja-game\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-space\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-plates\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-plate-spacer\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-wrapper\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[\"player1\"]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"player p1\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"P1\"],[11],[1,1,0,0,\"\\n          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"player1\"]]],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"      \"],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-wrapper\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[\"player2\"]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"player p2\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"P2\"],[11],[1,1,0,0,\"\\n          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"player2\"]]],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"      \"],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-wrapper\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[\"player3\"]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"player p3\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"P3\"],[11],[1,1,0,0,\"\\n          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"player3\"]]],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"      \"],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-wrapper\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[\"player4\"]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"player p4\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"P4\"],[11],[1,1,0,0,\"\\n          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"player4\"]]],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"      \"],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n  \"],[11],[1,1,0,0,\"\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"panel\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"vertical-spacer\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"web-cam\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"spacer\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"camera-box\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"spacer\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"the-rest\"],[[\"from\"],[\"stream-stuff/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\\n    \"],[11],[1,1,0,0,\"\\n  \"],[11],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"playerNames\",\"if\"]}",
    "meta": {
      "moduleName": "stream-stuff/components/melee-layout/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("stream-stuff/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define("stream-stuff/data-adapter", ["exports", "@ember-data/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _debug.default;
    }
  });
});
;define("stream-stuff/helpers/app-version", ["exports", "stream-stuff/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("stream-stuff/helpers/file-queue", ["exports", "ember-file-upload/helpers/file-queue"], function (_exports, _fileQueue) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _fileQueue.default;
    }
  });
});
;define("stream-stuff/helpers/local-class", ["exports", "ember-css-modules/helpers/local-class"], function (_exports, _localClass) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _localClass.default;
    }
  });
  Object.defineProperty(_exports, "localClass", {
    enumerable: true,
    get: function () {
      return _localClass.localClass;
    }
  });
});
;define("stream-stuff/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("stream-stuff/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("stream-stuff/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "stream-stuff/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("stream-stuff/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("stream-stuff/initializers/ember-data-data-adapter", ["exports", "@ember-data/debug/setup"], function (_exports, _setup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _setup.default;
    }
  });
});
;define("stream-stuff/initializers/ember-data", ["exports", "ember-data", "ember-data/setup-container"], function (_exports, _emberData, _setupContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
    This code initializes EmberData in an Ember application.
  
    It ensures that the `store` service is automatically injected
    as the `store` property on all routes and controllers.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("stream-stuff/initializers/ensure-local-class-included", ["exports", "ember-css-modules/templates/static-helpers-hack"], function (_exports, _staticHelpersHack) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    initialize() {// This file exists to support Embroider's `staticHelpers` option.
      // ECM relies on the existence of a `local-class` helper, but that
      // helper may never be statically referenced in an application template.
      // Instead, we reference it in our own template, and then import that
      // template from a file (an initializer) that we know must always
      // be loaded in order to boot the app and/or run tests.
    }

  };
  _exports.default = _default;
});
;define("stream-stuff/initializers/export-application-global", ["exports", "stream-stuff/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("stream-stuff/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
  _exports.default = _default;
});
;define("stream-stuff/models/sound", ["exports", "@ember-data/model"], function (_exports, _model) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _class, _descriptor, _descriptor2, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let SoundModel = (_dec = (0, _model.attr)('string'), _dec2 = (0, _model.attr)('string'), (_class = (_temp = class SoundModel extends _model.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "name", _descriptor, this);

      _initializerDefineProperty(this, "sound_file", _descriptor2, this);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "name", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "sound_file", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class));
  _exports.default = SoundModel;
});
;define("stream-stuff/router", ["exports", "stream-stuff/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class Router extends Ember.Router {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "location", _environment.default.locationType);

      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }

  }

  _exports.default = Router;
  Router.map(function () {
    this.route('control-panel');
    this.route('layouts', function () {
      this.route('melee');
    });
  });
});
;define("stream-stuff/routes/control-panel", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class ControlPanelRoute extends Ember.Route {}

  _exports.default = ControlPanelRoute;
});
;define("stream-stuff/routes/layouts", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class LayoutsRoute extends Ember.Route {}

  _exports.default = LayoutsRoute;
});
;define("stream-stuff/routes/layouts/melee", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class LayoutsMeleeRoute extends Ember.Route {}

  _exports.default = LayoutsMeleeRoute;
});
;define("stream-stuff/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _json.default;
    }
  });
});
;define("stream-stuff/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("stream-stuff/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rest.default;
    }
  });
});
;define("stream-stuff/serializers/sound", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class SoundSerializer extends _jsonApi.default {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "attrs", {
        sound_file: {
          serialize: false
        }
      });
    }

    // Make sure we serialize 'sound_file' as 'sound_file' and not 'sound-file'.
    keyForAttribute(key) {
      return key;
    } // Don't upload the sound_file when we send sound data to server, we have to
    // do this separately since it isn't supported by the json api directly yet.


  }

  _exports.default = SoundSerializer;
});
;define("stream-stuff/services/file-queue", ["exports", "ember-file-upload/services/file-queue"], function (_exports, _fileQueue) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _fileQueue.default;
    }
  });
});
;define("stream-stuff/services/socket-io", ["exports", "ember-websockets/services/socket-io"], function (_exports, _socketIo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _socketIo.default;
    }
  });
});
;define("stream-stuff/services/store", ["exports", "ember-data/store"], function (_exports, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
});
;define("stream-stuff/services/websockets", ["exports", "ember-websockets/services/websockets"], function (_exports, _websockets) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _websockets.default;
    }
  });
});
;define("stream-stuff/styles/app", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {};
  _exports.default = _default;
});
;define("stream-stuff/styles/colors", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {};
  _exports.default = _default;
});
;define("stream-stuff/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "3aQoV43i",
    "block": "{\"symbols\":[],\"statements\":[[1,0,0,0,[31,0,0,[27,[26,1,\"CallHead\"],[]],[[31,0,0,[27,[26,0,\"CallHead\"],[]],null,null]],null]],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"-outlet\",\"component\"]}",
    "meta": {
      "moduleName": "stream-stuff/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("stream-stuff/templates/control-panel", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "H8BFPBrY",
    "block": "{\"symbols\":[],\"statements\":[[7,\"control-panel\",[],[[],[]],null],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "stream-stuff/templates/control-panel.hbs"
    }
  });

  _exports.default = _default;
});
;define("stream-stuff/templates/layouts", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "F3fpFk/+",
    "block": "{\"symbols\":[],\"statements\":[[1,0,0,0,[31,0,0,[27,[26,1,\"CallHead\"],[]],[[31,0,0,[27,[26,0,\"CallHead\"],[]],null,null]],null]]],\"hasEval\":false,\"upvars\":[\"-outlet\",\"component\"]}",
    "meta": {
      "moduleName": "stream-stuff/templates/layouts.hbs"
    }
  });

  _exports.default = _default;
});
;define("stream-stuff/templates/layouts/melee", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "sM433LBg",
    "block": "{\"symbols\":[],\"statements\":[[7,\"melee-layout\",[],[[],[]],null],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "stream-stuff/templates/layouts/melee.hbs"
    }
  });

  _exports.default = _default;
});
;define("stream-stuff/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
});
;define("stream-stuff/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
});
;define("stream-stuff/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
});
;define("stream-stuff/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
});
;

;define('stream-stuff/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("stream-stuff/app")["default"].create({"name":"stream-stuff","version":"0.0.0+decce57d"});
          }
        
//# sourceMappingURL=stream-stuff.map
