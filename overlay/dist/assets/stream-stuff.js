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

  var _class, _descriptor, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let ControlPanelComponent = (_class = (_temp = class ControlPanelComponent extends _component.default {
    // A list of all sounds loaded from the rest api.
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "websockets", _descriptor, this);

      _defineProperty(this, "socket", null);

      _defineProperty(this, "sounds", null);

      _defineProperty(this, "player1", 'Me');

      _defineProperty(this, "player2", 'BrickLee');

      _defineProperty(this, "player3", '');

      _defineProperty(this, "player4", '');

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

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "websockets", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "updatePlayerNames", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "updatePlayerNames"), _class.prototype)), _class);
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
    "id": "78XJ7bqv",
    "block": "{\"symbols\":[],\"statements\":[[1,0,0,0,[31,2,5,[27,[26,1,\"CallHead\"],[]],null,[[\"type\",\"value\"],[\"text\",[27,[26,0,\"Expression\"],[]]]]]],[1,1,0,0,\"\\n\"],[1,0,0,0,[31,39,5,[27,[26,1,\"CallHead\"],[]],null,[[\"type\",\"value\"],[\"text\",[27,[26,2,\"Expression\"],[]]]]]],[1,1,0,0,\"\\n\"],[1,0,0,0,[31,76,5,[27,[26,1,\"CallHead\"],[]],null,[[\"type\",\"value\"],[\"text\",[27,[26,3,\"Expression\"],[]]]]]],[1,1,0,0,\"\\n\"],[1,0,0,0,[31,113,5,[27,[26,1,\"CallHead\"],[]],null,[[\"type\",\"value\"],[\"text\",[27,[26,4,\"Expression\"],[]]]]]],[1,1,0,0,\"\\n\\n\"],[9,\"button\",false],[3,0,0,[27,[26,6,\"ModifierHead\"],[]],[[27,[24,0],[]],[27,[26,5,\"Expression\"],[]]],null],[10],[1,1,0,0,\"Update Player Names\"],[11],[1,1,0,0,\"\\n\\n\"],[7,\"sound-board\",[],[[],[]],null],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"player1\",\"input\",\"player2\",\"player3\",\"player4\",\"updatePlayerNames\",\"action\"]}",
    "meta": {
      "moduleName": "stream-stuff/components/control-panel/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("stream-stuff/components/fa-icon", ["exports", "@fortawesome/ember-fontawesome/components/fa-icon"], function (_exports, _faIcon) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _faIcon.default;
    }
  });
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
;define("stream-stuff/components/sound-board/board-item/component", ["exports", "@glimmer/component", "stream-stuff/config/environment"], function (_exports, _component, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let BoardItemComponent = (_dec = Ember.inject.service('file-queue'), (_class = (_temp = class BoardItemComponent extends _component.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "store", _descriptor, this);

      _initializerDefineProperty(this, "queue", _descriptor2, this);

      _initializerDefineProperty(this, "sound", _descriptor3, this);

      _initializerDefineProperty(this, "isEditing", _descriptor4, this);

      _initializerDefineProperty(this, "isNew", _descriptor5, this);

      _defineProperty(this, "cancelCallback", null);

      _defineProperty(this, "createCallback", null);

      _initializerDefineProperty(this, "sound_name", _descriptor6, this);

      _initializerDefineProperty(this, "sound_file", _descriptor7, this);

      this.sound = this.args.sound;
      this.isEditing = this.args.isEditing;
      this.isNew = this.args.isNew;
    }

    uploadFile(id) {
      console.log('why?');
      let headers = {
        Accept: 'application/vnd.api+json'
      };
      headers['Content-Disposition'] = `attachment; filename=${this.sound_file.name}`;
      return this.sound_file.upload(`${_environment.default.host}/sounds/upload/?id=${id}`, {
        headers: headers
      });
    }

    addSoundFile(soundFile) {
      this.sound_file = soundFile;
    }

    get soundFileName() {
      // The regex is os.path.basename()
      return Ember.isNone(this.sound) || Ember.isNone(this.sound.sound_file) ? 'No file selected' : this.sound.sound_file.split(/(\\|\/)/g).pop();
    }

    play() {
      fetch(`${_environment.default.host}/play_sound/?sound_id=${this.sound.id}`);
    }

    save() {
      if (!this.sound_name || this.isNew && Ember.isNone(this.sound_file)) return;
      let sound = this.sound;

      if (sound == null) {
        sound = this.store.createRecord('sound', {
          name: this.sound_name
        });
      } else {
        sound.set('name', this.sound_name);
      }

      sound.save().then(function (response) {
        if (this.sound_file == null) {
          this.isEditing = false;
          return;
        }

        this.uploadFile(response.id).then(function () {
          sound.reload();
          this.sound_name = '';
          this.sound_file = null;

          if (this.isEditing) {
            this.isEditing = false;
          } else if (this.isNew) {
            this.args.createCallback();
          }
        }.bind(this));
      }.bind(this), function () {
        sound.rollbackAttributes();
      }.bind(this));
    }

    edit() {
      this.sound_name = this.sound.name;
      this.isEditing = true;
    }

    cancel() {
      this.sound_name = '';
      this.queue.find('sound_file').set('files', Ember.A());
      this.sound_file = null;
      if (this.isNew) this.args.cancelCallback();
      this.isEditing = false;
    }

    delete() {
      this.sound.deleteRecord();
      this.sound.save();
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "store", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "queue", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "sound", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "isEditing", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "isNew", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "sound_name", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "sound_file", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "addSoundFile", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "addSoundFile"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "play", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "play"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "save", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "save"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "edit", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "edit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cancel", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "cancel"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "delete", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "delete"), _class.prototype)), _class));
  _exports.default = BoardItemComponent;
  ;
});
;define("stream-stuff/components/sound-board/board-item/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "sound": "_sound_4cr6zd",
    "add-new-sound": "_add-new-sound_4cr6zd",
    "sound-name-input": "_sound-name-input_4cr6zd",
    "upload-button": "_upload-button_4cr6zd",
    "sound-display": "_sound-display_4cr6zd",
    "sound-name": "_sound-name_4cr6zd",
    "actions": "_actions_4cr6zd",
    "action": "_action_4cr6zd"
  };
  _exports.default = _default;
});
;define("stream-stuff/components/sound-board/board-item/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "5hRECXso",
    "block": "{\"symbols\":[\"queue\"],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,7,\"BlockHead\"],[]],[[31,36,2,[27,[26,10,\"CallHead\"],[]],[[27,[26,9,\"Expression\"],[]],[27,[26,8,\"Expression\"],[]]],null]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"add-new-sound\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[1,0,0,0,[31,106,5,[27,[26,6,\"CallHead\"],[]],null,[[\"type\",\"value\",\"class\"],[\"text\",[27,[26,5,\"Expression\"],[]],[31,0,0,[27,[26,4,\"CallHead\"],[]],[\"input \",[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound-name-input\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]],null]]]]],[1,1,0,0,\"\\n      \"],[7,\"file-upload\",[],[[\"@name\",\"@for\",\"@accept\",\"@onfileadd\"],[\"sound_file\",\"sound_file\",\"audio/vnd.wave,audio/wav,audio/wave\",[31,303,6,[27,[26,2,\"CallHead\"],[]],[[27,[24,0],[]],\"addSoundFile\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[9,\"a\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"upload-button\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,7,\"BlockHead\"],[]],[[27,[24,1],[\"files\",\"length\"]]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"            \"],[1,0,0,0,[27,[24,1],[\"files\",\"0\",\"name\"]]],[1,1,0,0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"            \"],[1,0,0,0,[27,[26,3,\"AppendSingleId\"],[]]],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"        \"],[11],[1,1,0,0,\"\\n      \"]],\"parameters\":[1]}]]],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"actions\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"cancel\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"ban\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"save\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"save\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n      \"],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound-display\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[9,\"p\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound-name\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"name\"]]],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"actions\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"play\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"play\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"edit\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"pencil-alt\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"stream-stuff/components/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"delete\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"dumpster-fire\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n      \"],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"sound\",\"action\",\"soundFileName\",\"concat\",\"sound_name\",\"input\",\"if\",\"isNew\",\"isEditing\",\"or\"]}",
    "meta": {
      "moduleName": "stream-stuff/components/sound-board/board-item/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("stream-stuff/components/sound-board/component", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _descriptor3, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let SoundBoardComponent = (_class = (_temp = class SoundBoardComponent extends _component.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "store", _descriptor, this);

      _initializerDefineProperty(this, "isCreatingNew", _descriptor2, this);

      _initializerDefineProperty(this, "sounds", _descriptor3, this);

      this.sounds = this.store.findAll('sound');
    }

    createNew() {
      this.isCreatingNew = true;
    }

    callback() {
      this.isCreatingNew = false;
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "store", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "isCreatingNew", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "sounds", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "createNew", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "createNew"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "callback", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "callback"), _class.prototype)), _class);
  _exports.default = SoundBoardComponent;
});
;define("stream-stuff/components/sound-board/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "sound-board": "_sound-board_14nb1x",
    "create-new": "_create-new_14nb1x"
  };
  _exports.default = _default;
});
;define("stream-stuff/components/sound-board/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "e+zWgTG8",
    "block": "{\"symbols\":[\"sound\"],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"sound-board\"],[[\"from\"],[\"stream-stuff/components/sound-board/styles\"]]]]],null],[10],[1,1,0,0,\"\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"create-new\"],[[\"from\"],[\"stream-stuff/components/sound-board/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,4,\"BlockHead\"],[]],[[27,[26,3,\"Expression\"],[]]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"      \"],[7,\"sound-board/board-item\",[],[[\"@isNew\",\"@createCallback\",\"@cancelCallback\"],[\"true\",[27,[26,1,\"AppendSingleId\"],[]],[27,[26,1,\"AppendSingleId\"],[]]]],null],[1,1,0,0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"      \"],[9,\"button\",false],[23,\"class\",\"btn\",null],[3,0,0,[27,[26,0,\"ModifierHead\"],[]],[[27,[24,0],[]],\"createNew\"],null],[10],[1,1,0,0,\"Create New Sound\"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"  \"],[11],[1,1,0,0,\"\\n\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"actual-sounds\"],[[\"from\"],[\"stream-stuff/components/sound-board/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,7,\"BlockHead\"],[]],[[31,0,0,[27,[26,6,\"CallHead\"],[]],[[31,0,0,[27,[26,6,\"CallHead\"],[]],[[27,[26,5,\"Expression\"],[]]],null]],null]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"      \"],[7,\"sound-board/board-item\",[],[[\"@sound\"],[[27,[24,1],[]]]],null],[1,1,0,0,\"\\n\"]],\"parameters\":[1]}]]],[1,1,0,0,\"  \"],[11],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"action\",\"callback\",\"local-class\",\"isCreatingNew\",\"if\",\"sounds\",\"-track-array\",\"each\"]}",
    "meta": {
      "moduleName": "stream-stuff/components/sound-board/template.hbs"
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
;define("stream-stuff/helpers/and", ["exports", "ember-truth-helpers/helpers/and"], function (_exports, _and) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  Object.defineProperty(_exports, "and", {
    enumerable: true,
    get: function () {
      return _and.and;
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
;define("stream-stuff/helpers/eq", ["exports", "ember-truth-helpers/helpers/equal"], function (_exports, _equal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(_exports, "equal", {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
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
;define("stream-stuff/helpers/gt", ["exports", "ember-truth-helpers/helpers/gt"], function (_exports, _gt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(_exports, "gt", {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
;define("stream-stuff/helpers/gte", ["exports", "ember-truth-helpers/helpers/gte"], function (_exports, _gte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(_exports, "gte", {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
;define("stream-stuff/helpers/is-array", ["exports", "ember-truth-helpers/helpers/is-array"], function (_exports, _isArray) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(_exports, "isArray", {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
;define("stream-stuff/helpers/is-empty", ["exports", "ember-truth-helpers/helpers/is-empty"], function (_exports, _isEmpty) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
});
;define("stream-stuff/helpers/is-equal", ["exports", "ember-truth-helpers/helpers/is-equal"], function (_exports, _isEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(_exports, "isEqual", {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
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
;define("stream-stuff/helpers/lt", ["exports", "ember-truth-helpers/helpers/lt"], function (_exports, _lt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(_exports, "lt", {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
;define("stream-stuff/helpers/lte", ["exports", "ember-truth-helpers/helpers/lte"], function (_exports, _lte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(_exports, "lte", {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
;define("stream-stuff/helpers/not-eq", ["exports", "ember-truth-helpers/helpers/not-equal"], function (_exports, _notEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(_exports, "notEq", {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
;define("stream-stuff/helpers/not", ["exports", "ember-truth-helpers/helpers/not"], function (_exports, _not) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(_exports, "not", {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
;define("stream-stuff/helpers/or", ["exports", "ember-truth-helpers/helpers/or"], function (_exports, _or) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(_exports, "or", {
    enumerable: true,
    get: function () {
      return _or.or;
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
;define("stream-stuff/helpers/xor", ["exports", "ember-truth-helpers/helpers/xor"], function (_exports, _xor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(_exports, "xor", {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
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
            require("stream-stuff/app")["default"].create({"name":"stream-stuff","version":"0.0.0+3442562a"});
          }
        
//# sourceMappingURL=stream-stuff.map
