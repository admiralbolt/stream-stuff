'use strict';



;define("overlay/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
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
;define("overlay/adapters/application", ["exports", "@ember-data/adapter/json-api", "overlay/config/environment"], function (_exports, _jsonApi, _environment) {
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
;define("overlay/app", ["exports", "ember-resolver", "ember-load-initializers", "overlay/config/environment"], function (_exports, _emberResolver, _emberLoadInitializers, _environment) {
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
;define("overlay/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
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
;define("overlay/components/control-panel/component", ["exports", "@glimmer/component", "overlay/config/environment", "ember-concurrency", "ember-concurrency-decorators"], function (_exports, _component, _environment, _emberConcurrency, _emberConcurrencyDecorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let ControlPanelComponent = (_dec = Ember.computed.alias('twitchChat.botIsAlive'), (_class = (_temp = class ControlPanelComponent extends _component.default {
    // A list of all sounds loaded from the rest api.
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "websockets", _descriptor, this);

      _initializerDefineProperty(this, "spotify", _descriptor2, this);

      _initializerDefineProperty(this, "twitchChat", _descriptor3, this);

      _defineProperty(this, "spotifySocket", null);

      _initializerDefineProperty(this, "isPolling", _descriptor4, this);

      _initializerDefineProperty(this, "botIsAlive", _descriptor5, this);

      _defineProperty(this, "sounds", null);

      this.spotifySocket = this.websockets.socketFor('ws://localhost:7001/');
      this.isPolling = localStorage.getItem('spotifyPolling');
      if (this.isPolling) this.pollingTask.perform();
    }

    startBot() {
      this.twitchChat.start();
    }

    stopBot() {
      this.twitchChat.stop();
    }

    authorizeSpotify() {
      this.spotify.authorize();
    }

    getTokens() {
      this.spotify.getTokens(false);
    }

    refresh() {
      this.spotify.getTokens(true);
    }

    async sendCurrentlyPlaying() {
      let data = await this.spotify.getCurrentlyPlaying();
      let progress = data.progress_ms / data.item.duration_ms;
      let artist = data.item.artists.map(artist => artist.name).join(', ');
      let album = data.item.album.name;
      let song = data.item.name;
      let albumImageUrl = data.item.album.images[1].url;
      this.spotifySocket.send({
        albumImageUrl: albumImageUrl,
        artist: artist,
        album: album,
        song: song,
        progressMs: data.progress_ms,
        durationMs: data.item.duration_ms
      }, true);
    }

    *pollingTask() {
      while (true) {
        this.sendCurrentlyPlaying();
        yield (0, _emberConcurrency.timeout)(1500);
      }
    }

    async startPolling() {
      this.pollingTask.perform();
      localStorage.setItem('spotifyPolling', true);
      this.isPolling = true;
    }

    async stopPolling() {
      this.pollingTask.cancelAll();
      localStorage.removeItem('spotifyPolling');
      this.isPolling = false;
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "websockets", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "spotify", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "twitchChat", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "isPolling", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "botIsAlive", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "startBot", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "startBot"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stopBot", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "stopBot"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "authorizeSpotify", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "authorizeSpotify"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getTokens", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "getTokens"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "refresh", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "refresh"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pollingTask", [_emberConcurrencyDecorators.task], Object.getOwnPropertyDescriptor(_class.prototype, "pollingTask"), _class.prototype)), _class));
  _exports.default = ControlPanelComponent;
});
;define("overlay/components/control-panel/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {};
  _exports.default = _default;
});
;define("overlay/components/control-panel/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "yYAeyVNf",
    "block": "{\"symbols\":[],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,1,\"CallHead\"],[]],[\"control-panel\"],[[\"from\"],[\"overlay/components/control-panel/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\\n  \"],[7,\"melee-controls\",[],[[],[]],null],[1,1,0,0,\"\\n\\n  \"],[9,\"br\",true],[10],[11],[9,\"br\",true],[10],[11],[1,1,0,0,\"\\n\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,1,\"CallHead\"],[]],[\"twitch-chat-controls\"],[[\"from\"],[\"overlay/components/control-panel/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,3,\"BlockHead\"],[]],[[27,[26,2,\"Expression\"],[]]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"      \"],[9,\"button\",false],[23,\"class\",\"btn\",null],[3,0,0,[27,[26,0,\"ModifierHead\"],[]],[[27,[24,0],[]],\"stopBot\"],null],[10],[1,1,0,0,\"Stop Bot\"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"      \"],[9,\"button\",false],[23,\"class\",\"btn\",null],[3,0,0,[27,[26,0,\"ModifierHead\"],[]],[[27,[24,0],[]],\"startBot\"],null],[10],[1,1,0,0,\"Start Bot\"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"  \"],[11],[1,1,0,0,\"\\n\\n  \"],[9,\"br\",true],[10],[11],[9,\"br\",true],[10],[11],[1,1,0,0,\"\\n\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,1,\"CallHead\"],[]],[\"spotify-controls\"],[[\"from\"],[\"overlay/components/control-panel/styles\"]]]]],null],[10],[1,1,0,0,\"\\n    \"],[9,\"button\",false],[23,\"class\",\"btn\",null],[3,0,0,[27,[26,0,\"ModifierHead\"],[]],[[27,[24,0],[]],\"authorizeSpotify\"],null],[10],[1,1,0,0,\"Authorize Spotify\"],[11],[1,1,0,0,\"\\n    \"],[9,\"button\",false],[23,\"class\",\"btn\",null],[3,0,0,[27,[26,0,\"ModifierHead\"],[]],[[27,[24,0],[]],\"getTokens\"],null],[10],[1,1,0,0,\"Get Tokens\"],[11],[1,1,0,0,\"\\n    \"],[9,\"button\",false],[23,\"class\",\"btn\",null],[3,0,0,[27,[26,0,\"ModifierHead\"],[]],[[27,[24,0],[]],\"refresh\"],null],[10],[1,1,0,0,\"Refresh\"],[11],[1,1,0,0,\"\\n\"],[5,[27,[26,3,\"BlockHead\"],[]],[[27,[26,4,\"Expression\"],[]]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"      \"],[9,\"button\",false],[23,\"class\",\"btn\",null],[3,0,0,[27,[26,0,\"ModifierHead\"],[]],[[27,[24,0],[]],\"stopPolling\"],null],[10],[1,1,0,0,\"Stop Polling\"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"      \"],[9,\"button\",false],[23,\"class\",\"btn\",null],[3,0,0,[27,[26,0,\"ModifierHead\"],[]],[[27,[24,0],[]],\"startPolling\"],null],[10],[1,1,0,0,\"Start Polling\"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"  \"],[11],[1,1,0,0,\"\\n\\n  \"],[9,\"br\",true],[10],[11],[1,1,0,0,\"\\n\\n  \"],[7,\"sound-board\",[],[[],[]],null],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"action\",\"local-class\",\"botIsAlive\",\"if\",\"isPolling\"]}",
    "meta": {
      "moduleName": "overlay/components/control-panel/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/fa-icon", ["exports", "@fortawesome/ember-fontawesome/components/fa-icon"], function (_exports, _faIcon) {
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
;define("overlay/components/file-dropzone", ["exports", "ember-file-upload/components/file-dropzone/component"], function (_exports, _component) {
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
;define("overlay/components/file-upload", ["exports", "ember-file-upload/components/file-upload/component"], function (_exports, _component) {
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
;define("overlay/components/melee-controls/component", ["exports", "@glimmer/component"], function (_exports, _component) {
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

  let MeleeControlsComponent = (_class = (_temp = class MeleeControlsComponent extends _component.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "websockets", _descriptor, this);

      _defineProperty(this, "socket", null);

      _defineProperty(this, "player1", '');

      _defineProperty(this, "player2", '');

      _defineProperty(this, "player3", '');

      _defineProperty(this, "player4", '');

      this.socket = this.websockets.socketFor('ws://localhost:7000/');
      this.player1 = localStorage.getItem('meleePlayer1') || '';
      this.player2 = localStorage.getItem('meleePlayer2') || '';
      this.player3 = localStorage.getItem('meleePlayer3') || '';
      this.player4 = localStorage.getItem('meleePlayer4') || '';
    }

    updatePlayerNames() {
      localStorage.setItem('meleePlayer1', this.player1);
      localStorage.setItem('meleePlayer2', this.player2);
      localStorage.setItem('meleePlayer3', this.player3);
      localStorage.setItem('meleePlayer4', this.player4);
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
  _exports.default = MeleeControlsComponent;
});
;define("overlay/components/melee-controls/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {};
  _exports.default = _default;
});
;define("overlay/components/melee-controls/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "GyaqENGB",
    "block": "{\"symbols\":[],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"melee-controls\"],[[\"from\"],[\"overlay/components/melee-controls/styles\"]]]]],null],[10],[1,1,0,0,\"\\n  \"],[1,0,0,0,[31,40,5,[27,[26,2,\"CallHead\"],[]],null,[[\"type\",\"value\"],[\"text\",[27,[26,1,\"Expression\"],[]]]]]],[1,1,0,0,\"\\n  \"],[1,0,0,0,[31,79,5,[27,[26,2,\"CallHead\"],[]],null,[[\"type\",\"value\"],[\"text\",[27,[26,3,\"Expression\"],[]]]]]],[1,1,0,0,\"\\n  \"],[1,0,0,0,[31,118,5,[27,[26,2,\"CallHead\"],[]],null,[[\"type\",\"value\"],[\"text\",[27,[26,4,\"Expression\"],[]]]]]],[1,1,0,0,\"\\n  \"],[1,0,0,0,[31,157,5,[27,[26,2,\"CallHead\"],[]],null,[[\"type\",\"value\"],[\"text\",[27,[26,5,\"Expression\"],[]]]]]],[1,1,0,0,\"\\n\\n  \"],[9,\"button\",false],[23,\"class\",\"btn\",null],[3,0,0,[27,[26,7,\"ModifierHead\"],[]],[[27,[24,0],[]],[27,[26,6,\"Expression\"],[]]],null],[10],[1,1,0,0,\"Update Player Names\"],[11],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"player1\",\"input\",\"player2\",\"player3\",\"player4\",\"updatePlayerNames\",\"action\"]}",
    "meta": {
      "moduleName": "overlay/components/melee-controls/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/melee-layout/component", ["exports", "overlay/components/socket-client/component"], function (_exports, _component) {
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

  let MeleeLayoutComponent = (_class = (_temp = class MeleeLayoutComponent extends _component.default {
    constructor() {
      super(...arguments, 7000);

      _initializerDefineProperty(this, "playerNames", _descriptor, this);

      this.playerNames = {
        player1: localStorage.getItem('meleePlayer1') || '',
        player2: localStorage.getItem('meleePlayer2') || '',
        player3: localStorage.getItem('meleePlayer3') || '',
        player4: localStorage.getItem('meleePlayer4') || ''
      };
    }

    messageHandler(event) {
      this.playerNames = JSON.parse(event.data);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "playerNames", [Ember._tracked], {
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
;define("overlay/components/melee-layout/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "melee-layout": "_melee-layout_1kszmo",
    "vidja-game": "_vidja-game_1kszmo",
    "name-space": "_name-space_1kszmo",
    "name-plates": "_name-plates_1kszmo",
    "name-plate-spacer": "_name-plate-spacer_1kszmo",
    "name-wrapper": "_name-wrapper_1kszmo",
    "player": "_player_1kszmo",
    "p1": "_p1_1kszmo",
    "p2": "_p2_1kszmo",
    "p3": "_p3_1kszmo",
    "p4": "_p4_1kszmo",
    "name": "_name_1kszmo",
    "panel": "_panel_1kszmo",
    "vertical-spacer": "_vertical-spacer_1kszmo",
    "web-cam": "_web-cam_1kszmo",
    "spacer": "_spacer_1kszmo",
    "camera-box": "_camera-box_1kszmo",
    "the-rest": "_the-rest_1kszmo"
  };
  _exports.default = _default;
});
;define("overlay/components/melee-layout/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "vE2c+oVu",
    "block": "{\"symbols\":[],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"melee-layout\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"vidja-game\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-space\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-plates\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-plate-spacer\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-wrapper\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[\"player1\"]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"player p1\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"P1\"],[11],[1,1,0,0,\"\\n          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"player1\"]]],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"      \"],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-wrapper\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[\"player2\"]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"player p2\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"P2\"],[11],[1,1,0,0,\"\\n          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"player2\"]]],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"      \"],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-wrapper\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[\"player3\"]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"player p3\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"P3\"],[11],[1,1,0,0,\"\\n          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"player3\"]]],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"      \"],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-wrapper\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[\"player4\"]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"player p4\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"P4\"],[11],[1,1,0,0,\"\\n          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"player4\"]]],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"      \"],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n  \"],[11],[1,1,0,0,\"\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"panel\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"vertical-spacer\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"web-cam\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"spacer\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"camera-box\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"spacer\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"the-rest\"],[[\"from\"],[\"overlay/components/melee-layout/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\\n    \"],[11],[1,1,0,0,\"\\n  \"],[11],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"playerNames\",\"if\"]}",
    "meta": {
      "moduleName": "overlay/components/melee-layout/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/plugins/spotify/component", ["exports", "overlay/components/socket-client/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let SpotifyComponent = (_class = (_temp = class SpotifyComponent extends _component.default {
    toReadable(ms) {
      let totalSeconds = Math.floor(ms / 1000);
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      if (seconds < 10) seconds = `0${seconds}`;
      return `${minutes}:${seconds}`;
    }

    get progressReadable() {
      return this.toReadable(this.progressMs);
    }

    get durationReadable() {
      return this.toReadable(this.durationMs);
    }

    get progressPercent() {
      return Math.floor(100 * this.progressMs / this.durationMs);
    }

    constructor() {
      super(...arguments, 7001);

      _initializerDefineProperty(this, "albumImageUrl", _descriptor, this);

      _initializerDefineProperty(this, "artist", _descriptor2, this);

      _initializerDefineProperty(this, "album", _descriptor3, this);

      _initializerDefineProperty(this, "song", _descriptor4, this);

      _initializerDefineProperty(this, "progressMs", _descriptor5, this);

      _initializerDefineProperty(this, "durationMs", _descriptor6, this);
    }

    messageHandler(event) {
      let data = JSON.parse(event.data);
      this.albumImageUrl = data.albumImageUrl;
      this.artist = data.artist;
      this.album = data.album;
      this.song = data.song;
      this.progressMs = data.progressMs;
      this.durationMs = data.durationMs;
      this.playerNames = JSON.parse(event.data);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "albumImageUrl", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "artist", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "album", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "song", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "progressMs", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "durationMs", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  })), _class);
  _exports.default = SpotifyComponent;
  ;
});
;define("overlay/components/plugins/spotify/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "spotify-wrapper": "_spotify-wrapper_1mx13n",
    "album-wrapper": "_album-wrapper_1mx13n",
    "album-art": "_album-art_1mx13n",
    "song-info": "_song-info_1mx13n",
    "song-info-block": "_song-info-block_1mx13n",
    "song-title": "_song-title_1mx13n",
    "artist": "_artist_1mx13n",
    "album": "_album_1mx13n",
    "timing-info": "_timing-info_1mx13n",
    "progress-bar": "_progress-bar_1mx13n",
    "actual-progress": "_actual-progress_1mx13n",
    "progress-text": "_progress-text_1mx13n"
  };
  _exports.default = _default;
});
;define("overlay/components/plugins/spotify/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "ZvpBKIRj",
    "block": "{\"symbols\":[],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"spotify-wrapper\"],[[\"from\"],[\"overlay/components/plugins/spotify/styles\"]]]]],null],[10],[1,1,0,0,\"\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"album-wrapper\"],[[\"from\"],[\"overlay/components/plugins/spotify/styles\"]]]]],null],[10],[1,1,0,0,\"\\n    \"],[9,\"img\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"album-art\"],[[\"from\"],[\"overlay/components/plugins/spotify/styles\"]]]]],null],[13,\"src\",[27,[26,1,\"AppendSingleId\"],[]],null],[10],[11],[1,1,0,0,\"\\n  \"],[11],[1,1,0,0,\"\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"song-info\"],[[\"from\"],[\"overlay/components/plugins/spotify/styles\"]]]]],null],[10],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"song-info-block\"],[[\"from\"],[\"overlay/components/plugins/spotify/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[9,\"p\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"song-title\"],[[\"from\"],[\"overlay/components/plugins/spotify/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,2,\"AppendSingleId\"],[]]],[11],[1,1,0,0,\"\\n      \"],[9,\"p\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"artist\"],[[\"from\"],[\"overlay/components/plugins/spotify/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,3,\"AppendSingleId\"],[]]],[11],[1,1,0,0,\"\\n      \"],[9,\"p\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"album\"],[[\"from\"],[\"overlay/components/plugins/spotify/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,4,\"AppendSingleId\"],[]]],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"timing-info\"],[[\"from\"],[\"overlay/components/plugins/spotify/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"progress-bar\"],[[\"from\"],[\"overlay/components/plugins/spotify/styles\"]]]]],null],[10],[1,1,0,0,\"\\n        \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"actual-progress\"],[[\"from\"],[\"overlay/components/plugins/spotify/styles\"]]]]],null],[13,\"style\",[32,[\"width: \",[27,[26,5,\"AppendSingleId\"],[]],\"%;\"]],null],[10],[11],[1,1,0,0,\"\\n      \"],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"progress-text\"],[[\"from\"],[\"overlay/components/plugins/spotify/styles\"]]]]],null],[10],[1,1,0,0,\"\\n        \"],[1,0,0,0,[27,[26,6,\"AppendSingleId\"],[]]],[1,1,0,0,\" / \"],[1,0,0,0,[27,[26,7,\"AppendSingleId\"],[]]],[1,1,0,0,\"\\n      \"],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n  \"],[11],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"albumImageUrl\",\"song\",\"artist\",\"album\",\"progressPercent\",\"progressReadable\",\"durationReadable\"]}",
    "meta": {
      "moduleName": "overlay/components/plugins/spotify/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/socket-client/component", ["exports", "@glimmer/component"], function (_exports, _component) {
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

  /**
    To use this component extend it and add a port param to the super call:
    super(...arguments, portNumber);
  
    Then, override any methods you wish to use directly!
  */
  let SocketClientComponent = (_class = (_temp = class SocketClientComponent extends _component.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "websockets", _descriptor, this);

      _defineProperty(this, "socket", null);

      _defineProperty(this, "port", null);

      this.port = arguments[2];
      const socket = this.websockets.socketFor(`ws://localhost:${this.port}/`);
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
      console.log(`message received: ${JSON.parse(event.data)}`);
    }

    closeHandler(event) {
      console.log(`Close was called: ${event}`);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "websockets", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = SocketClientComponent;
});
;define("overlay/components/sound-board/board-item/component", ["exports", "@glimmer/component", "overlay/config/environment"], function (_exports, _component, _environment) {
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
;define("overlay/components/sound-board/board-item/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "sound": "_sound_zg69z4",
    "add-new-sound": "_add-new-sound_zg69z4",
    "sound-name-input": "_sound-name-input_zg69z4",
    "upload-button": "_upload-button_zg69z4",
    "sound-display": "_sound-display_zg69z4",
    "sound-name": "_sound-name_zg69z4",
    "actions": "_actions_zg69z4",
    "action": "_action_zg69z4"
  };
  _exports.default = _default;
});
;define("overlay/components/sound-board/board-item/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "3Nq1NDTL",
    "block": "{\"symbols\":[\"queue\"],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,7,\"BlockHead\"],[]],[[31,36,2,[27,[26,10,\"CallHead\"],[]],[[27,[26,9,\"Expression\"],[]],[27,[26,8,\"Expression\"],[]]],null]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"add-new-sound\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[1,0,0,0,[31,106,5,[27,[26,6,\"CallHead\"],[]],null,[[\"type\",\"value\",\"class\"],[\"text\",[27,[26,5,\"Expression\"],[]],[31,0,0,[27,[26,4,\"CallHead\"],[]],[\"input \",[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound-name-input\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]],null]]]]],[1,1,0,0,\"\\n      \"],[7,\"file-upload\",[],[[\"@name\",\"@for\",\"@accept\",\"@onfileadd\"],[\"sound_file\",\"sound_file\",\"audio/vnd.wave,audio/wav,audio/wave\",[31,303,6,[27,[26,2,\"CallHead\"],[]],[[27,[24,0],[]],\"addSoundFile\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[9,\"a\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"upload-button\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,7,\"BlockHead\"],[]],[[27,[24,1],[\"files\",\"length\"]]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"            \"],[1,0,0,0,[27,[24,1],[\"files\",\"0\",\"name\"]]],[1,1,0,0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"            \"],[1,0,0,0,[27,[26,3,\"AppendSingleId\"],[]]],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"        \"],[11],[1,1,0,0,\"\\n      \"]],\"parameters\":[1]}]]],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"actions\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"cancel\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"ban\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"save\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"save\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n      \"],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound-display\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[9,\"p\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound-name\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"name\"]]],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"actions\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"play\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"play\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"edit\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"pencil-alt\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"overlay/components/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"delete\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"dumpster-fire\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n      \"],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"sound\",\"action\",\"soundFileName\",\"concat\",\"sound_name\",\"input\",\"if\",\"isNew\",\"isEditing\",\"or\"]}",
    "meta": {
      "moduleName": "overlay/components/sound-board/board-item/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/sound-board/component", ["exports", "@glimmer/component"], function (_exports, _component) {
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
;define("overlay/components/sound-board/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "sound-board": "_sound-board_crxrn1",
    "create-new": "_create-new_crxrn1"
  };
  _exports.default = _default;
});
;define("overlay/components/sound-board/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "Ui7usY3I",
    "block": "{\"symbols\":[\"sound\"],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"sound-board\"],[[\"from\"],[\"overlay/components/sound-board/styles\"]]]]],null],[10],[1,1,0,0,\"\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"create-new\"],[[\"from\"],[\"overlay/components/sound-board/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,4,\"BlockHead\"],[]],[[27,[26,3,\"Expression\"],[]]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"      \"],[7,\"sound-board/board-item\",[],[[\"@isNew\",\"@createCallback\",\"@cancelCallback\"],[\"true\",[27,[26,1,\"AppendSingleId\"],[]],[27,[26,1,\"AppendSingleId\"],[]]]],null],[1,1,0,0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"      \"],[9,\"button\",false],[23,\"class\",\"btn\",null],[3,0,0,[27,[26,0,\"ModifierHead\"],[]],[[27,[24,0],[]],\"createNew\"],null],[10],[1,1,0,0,\"Create New Sound\"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"  \"],[11],[1,1,0,0,\"\\n\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"actual-sounds\"],[[\"from\"],[\"overlay/components/sound-board/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,7,\"BlockHead\"],[]],[[31,0,0,[27,[26,6,\"CallHead\"],[]],[[31,0,0,[27,[26,6,\"CallHead\"],[]],[[27,[26,5,\"Expression\"],[]]],null]],null]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"      \"],[7,\"sound-board/board-item\",[],[[\"@sound\"],[[27,[24,1],[]]]],null],[1,1,0,0,\"\\n\"]],\"parameters\":[1]}]]],[1,1,0,0,\"  \"],[11],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"action\",\"callback\",\"local-class\",\"isCreatingNew\",\"if\",\"sounds\",\"-track-array\",\"each\"]}",
    "meta": {
      "moduleName": "overlay/components/sound-board/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
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
;define("overlay/data-adapter", ["exports", "@ember-data/debug"], function (_exports, _debug) {
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
;define("overlay/helpers/and", ["exports", "ember-truth-helpers/helpers/and"], function (_exports, _and) {
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
;define("overlay/helpers/app-version", ["exports", "overlay/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
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
;define("overlay/helpers/cancel-all", ["exports", "ember-concurrency/helpers/cancel-all"], function (_exports, _cancelAll) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
});
;define("overlay/helpers/eq", ["exports", "ember-truth-helpers/helpers/equal"], function (_exports, _equal) {
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
;define("overlay/helpers/file-queue", ["exports", "ember-file-upload/helpers/file-queue"], function (_exports, _fileQueue) {
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
;define("overlay/helpers/gt", ["exports", "ember-truth-helpers/helpers/gt"], function (_exports, _gt) {
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
;define("overlay/helpers/gte", ["exports", "ember-truth-helpers/helpers/gte"], function (_exports, _gte) {
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
;define("overlay/helpers/is-array", ["exports", "ember-truth-helpers/helpers/is-array"], function (_exports, _isArray) {
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
;define("overlay/helpers/is-empty", ["exports", "ember-truth-helpers/helpers/is-empty"], function (_exports, _isEmpty) {
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
;define("overlay/helpers/is-equal", ["exports", "ember-truth-helpers/helpers/is-equal"], function (_exports, _isEqual) {
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
;define("overlay/helpers/local-class", ["exports", "ember-css-modules/helpers/local-class"], function (_exports, _localClass) {
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
;define("overlay/helpers/lt", ["exports", "ember-truth-helpers/helpers/lt"], function (_exports, _lt) {
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
;define("overlay/helpers/lte", ["exports", "ember-truth-helpers/helpers/lte"], function (_exports, _lte) {
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
;define("overlay/helpers/not-eq", ["exports", "ember-truth-helpers/helpers/not-equal"], function (_exports, _notEqual) {
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
;define("overlay/helpers/not", ["exports", "ember-truth-helpers/helpers/not"], function (_exports, _not) {
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
;define("overlay/helpers/or", ["exports", "ember-truth-helpers/helpers/or"], function (_exports, _or) {
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
;define("overlay/helpers/perform", ["exports", "ember-concurrency/helpers/perform"], function (_exports, _perform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
});
;define("overlay/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("overlay/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("overlay/helpers/task", ["exports", "ember-concurrency/helpers/task"], function (_exports, _task) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
});
;define("overlay/helpers/xor", ["exports", "ember-truth-helpers/helpers/xor"], function (_exports, _xor) {
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
;define("overlay/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "overlay/config/environment"], function (_exports, _initializerFactory, _environment) {
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
;define("overlay/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
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
;define("overlay/initializers/ember-concurrency", ["exports", "ember-concurrency/initializers/ember-concurrency"], function (_exports, _emberConcurrency) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
});
;define("overlay/initializers/ember-data-data-adapter", ["exports", "@ember-data/debug/setup"], function (_exports, _setup) {
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
;define("overlay/initializers/ember-data", ["exports", "ember-data", "ember-data/setup-container"], function (_exports, _emberData, _setupContainer) {
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
;define("overlay/initializers/ensure-local-class-included", ["exports", "ember-css-modules/templates/static-helpers-hack"], function (_exports, _staticHelpersHack) {
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
;define("overlay/initializers/export-application-global", ["exports", "overlay/config/environment"], function (_exports, _environment) {
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
;define("overlay/initializers/register-query-params-service", ["exports", "ember-query-params-service/initializers/register-query-params-service"], function (_exports, _registerQueryParamsService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _registerQueryParamsService.default;
    }
  });
  Object.defineProperty(_exports, "initialize", {
    enumerable: true,
    get: function () {
      return _registerQueryParamsService.initialize;
    }
  });
});
;define("overlay/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
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
;define("overlay/instance-initializers/spotify", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize(appInstance) {
    let spotify = appInstance.lookup('service:spotify');
  }

  var _default = {
    initialize
  };
  _exports.default = _default;
});
;define("overlay/instance-initializers/twitch-chat", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize(appInstance) {
    let twitchChat = appInstance.lookup('service:twitch-chat');
  }

  var _default = {
    initialize
  };
  _exports.default = _default;
});
;define("overlay/models/sound", ["exports", "@ember-data/model"], function (_exports, _model) {
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
;define("overlay/router", ["exports", "overlay/config/environment"], function (_exports, _environment) {
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
    this.route('plugins', function () {
      this.route('spotify');
    });
  });
});
;define("overlay/routes/control-panel", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class ControlPanelRoute extends Ember.Route {}

  _exports.default = ControlPanelRoute;
});
;define("overlay/routes/layouts", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class LayoutsRoute extends Ember.Route {}

  _exports.default = LayoutsRoute;
});
;define("overlay/routes/layouts/melee", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class LayoutsMeleeRoute extends Ember.Route {}

  _exports.default = LayoutsMeleeRoute;
});
;define("overlay/routes/plugins/spotify", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class PluginsSpotifyRoute extends Ember.Route {}

  _exports.default = PluginsSpotifyRoute;
});
;define("overlay/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
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
;define("overlay/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
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
;define("overlay/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
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
;define("overlay/serializers/sound", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
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
;define("overlay/services/file-queue", ["exports", "ember-file-upload/services/file-queue"], function (_exports, _fileQueue) {
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
;define("overlay/services/query-params", ["exports", "ember-query-params-service/services/query-params"], function (_exports, _queryParams) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _queryParams.default;
    }
  });
});
;define("overlay/services/socket-io", ["exports", "ember-websockets/services/socket-io"], function (_exports, _socketIo) {
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
;define("overlay/services/spotify", ["exports", "overlay/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let CLIENT_ID = '2c1bbe388cf94960b50a5b5edd767b2d';
  let SCOPES = ['user-read-playback-position', 'user-read-currently-playing'];
  let scopeString = SCOPES.join(' ');
  let ACCOUNT_URL = 'https://accounts.spotify.com';
  let REDIRECT_URL = 'http://localhost:4200/control-panel';
  let AUTH_URL = `${ACCOUNT_URL}/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopeString)}&redirect_uri=${REDIRECT_URL}`;
  let TOKEN_URL = `${ACCOUNT_URL}/api/token`;
  let API_URL = 'https://api.spotify.com/v1';
  let SpotifyService = (_dec = Ember.computed.alias('queryParams.current.code'), (_class = (_temp = class SpotifyService extends Ember.Service {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "queryParams", _descriptor, this);

      _initializerDefineProperty(this, "code", _descriptor2, this);

      _initializerDefineProperty(this, "accessToken", _descriptor3, this);

      _initializerDefineProperty(this, "refreshToken", _descriptor4, this);

      _initializerDefineProperty(this, "albumImageUrl", _descriptor5, this);
    }

    init() {
      super.init(...arguments);
      this.accessToken = localStorage.getItem('spotifyAccessToken');
      this.refreshToken = localStorage.getItem('spotifyRefreshToken');
    }

    authorize() {
      window.location.replace(AUTH_URL);
    }

    async getTokens(useRefresh) {
      let data = {
        grant_type: useRefresh ? 'refresh_token' : 'authorization_code',
        code: this.code,
        redirect_uri: REDIRECT_URL
      };

      if (useRefresh) {
        data.refresh_token = this.refreshToken;
      }

      let postData = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
      let response = await fetch(TOKEN_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${_environment.default.spotifySecret}`)
        },
        body: postData
      });
      let responseData = await response.json();
      localStorage.setItem('spotifyAccessToken', responseData.access_token);
      this.accessToken = responseData.access_token;

      if (responseData.refresh_token) {
        localStorage.setItem('spotifyRefreshToken', responseData.refresh_token);
        this.refreshToken = responseData.refresh_token;
      }
    }

    async refreshAndRetry() {
      await this.getTokens(
      /*useRefresh=*/
      true);
      return await this.getCurrentlyPlaying(true);
    }

    async getCurrentlyPlaying(isRetry) {
      let response = await fetch(`${API_URL}/me/player/currently-playing`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (!response.ok) {
        return isRetry ? 'asdf' : await this.refreshAndRetry();
      }

      let responseData = await response.json();
      return responseData;
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "queryParams", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "code", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "accessToken", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "refreshToken", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "albumImageUrl", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  })), _class));
  _exports.default = SpotifyService;
});
;define("overlay/services/store", ["exports", "ember-data/store"], function (_exports, _store) {
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
;define("overlay/services/twitch-chat", ["exports", "tmi", "overlay/config/environment", "commander", "overlay/utils/get-command"], function (_exports, _tmi, _environment, _commander, _getCommand) {
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

  const OPTS = {
    identity: {
      username: 'admiral_lightning_bot',
      password: _environment.default.twitchOauthToken
    },
    channels: ['admirallightningbolt']
  };
  let GENERIC_RESPONSES = {
    'fuck you': 'no u'
  };
  let TwitchChatService = (_class = (_temp = class TwitchChatService extends Ember.Service {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "client", _descriptor, this);

      _initializerDefineProperty(this, "botIsAlive", _descriptor2, this);

      _defineProperty(this, "testCommand", null);
    }

    init() {
      super.init(...arguments);
      this.botIsAlive = localStorage.getItem('botIsAlive');
      if (this.botIsAlive) this.start();
      this.testCommand = new _commander.Command();
      this.testCommand.requiredOption('--sauce', 'Sauce');
    }

    messageHandler(target, context, msg, self) {
      // Ignore messages from self... For now...
      if (self) return;
      let [inputCommand, ...args] = msg.split(/\s+/);
      let commandGenerator = (0, _getCommand.default)(inputCommand.toLowerCase());

      if (!Ember.isNone(commandGenerator)) {
        let command = commandGenerator.getInstance(); // If --help is included, print help and exit.

        if (args.includes('--help')) {
          this.client.say(target, command.helpInformation());
          return;
        }

        commandGenerator.parseAndExecute(this, target, context, command, args);
      }

      if (msg.toLowerCase() in GENERIC_RESPONSES) {
        this.client.say(target, GENERIC_RESPONSES[msg.toLowerCase()]);
      }
    }

    connectionHandler() {
      console.log('connected!');
    }

    start() {
      console.log('Activating skynet');
      this.client = new _tmi.default.client(OPTS);
      this.client.on('message', function (target, context, msg, self) {
        this.messageHandler(target, context, msg, self);
      }.bind(this));
      this.client.on('connected', this.connectionHandler);
      this.client.connect();
      this.botIsAlive = true;
      localStorage.setItem('botIsAlive', true);
    }

    stop() {
      console.log('Preventing skynet');
      this.client.disconnect();
      this.botIsAlive = false;
      localStorage.removeItem('botIsAlive');
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "client", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "botIsAlive", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  })), _class);
  _exports.default = TwitchChatService;
});
;define("overlay/services/websockets", ["exports", "ember-websockets/services/websockets"], function (_exports, _websockets) {
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
;define("overlay/styles/app", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {};
  _exports.default = _default;
});
;define("overlay/styles/colors", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {};
  _exports.default = _default;
});
;define("overlay/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "Y94FD+pq",
    "block": "{\"symbols\":[],\"statements\":[[1,0,0,0,[31,0,0,[27,[26,1,\"CallHead\"],[]],[[31,0,0,[27,[26,0,\"CallHead\"],[]],null,null]],null]],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"-outlet\",\"component\"]}",
    "meta": {
      "moduleName": "overlay/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/templates/control-panel", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "KbnrS1TY",
    "block": "{\"symbols\":[],\"statements\":[[7,\"control-panel\",[],[[],[]],null],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "overlay/templates/control-panel.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/templates/layouts", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "S5MUDZ4O",
    "block": "{\"symbols\":[],\"statements\":[[1,0,0,0,[31,0,0,[27,[26,1,\"CallHead\"],[]],[[31,0,0,[27,[26,0,\"CallHead\"],[]],null,null]],null]]],\"hasEval\":false,\"upvars\":[\"-outlet\",\"component\"]}",
    "meta": {
      "moduleName": "overlay/templates/layouts.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/templates/layouts/melee", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "9cALwqpu",
    "block": "{\"symbols\":[],\"statements\":[[7,\"melee-layout\",[],[[],[]],null],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "overlay/templates/layouts/melee.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/templates/plugins/spotify", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "/vYNcvYq",
    "block": "{\"symbols\":[],\"statements\":[[7,\"plugins/spotify\",[],[[],[]],null],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "overlay/templates/plugins/spotify.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
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
;define("overlay/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
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
;define("overlay/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
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
;define("overlay/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
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
;define("overlay/utils/command-base", ["exports", "commander"], function (_exports, _commander) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class CommandBase {
    // Override this in the child
    attachProps(command) {} // Override this in the child


    parseAndExecute(emberContext, target, twitchContext, command, args) {
      command.exitOverride(err => {
        emberContext.client.say(target, `@${twitchContext['display-name']} Command ${command.name()} failed: ${err.message}`);
      }); // Default is to remove the first two argumnets from the arg array.
      // Specifying from: 'user' doesn't remove any args.

      command.parse(args, {
        from: 'user'
      });
    }

    getInstance() {
      let command = new _commander.Command();
      command.addHelpCommand(false);
      command.description(this.description);
      command.name(this.name);
      this.attachProps(command);
      return command;
    }

  }

  _exports.default = CommandBase;
});
;define("overlay/utils/get-command", ["exports", "overlay/utils/test-command"], function (_exports, _testCommand) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = getCommand;
  let COMMANDS = [new _testCommand.default()];
  let COMMAND_MAP = {};
  COMMANDS.reduce(function (result, item, index, array) {
    result[item.name] = item;
  }, COMMAND_MAP);

  function getCommand(name) {
    return COMMAND_MAP[name] || undefined;
  }
});
;define("overlay/utils/test-command", ["exports", "commander", "overlay/utils/command-base"], function (_exports, _commander, _commandBase) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class TestCommand extends _commandBase.default {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "name", '!test');

      _defineProperty(this, "description", 'Test Command that does stuff.');
    }

    attachProps(command) {
      command.requiredOption('--sauce', 'Adds some sauce');
    }

    parseAndExecute(emberContext, target, twitchContext, command, args) {
      super.parseAndExecute(emberContext, target, twitchContext, command, args);
      emberContext.client.say(target, 'cool');
    }

  }

  _exports.default = TestCommand;
});
;

;define('overlay/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("overlay/app")["default"].create({"name":"overlay","version":"0.0.0+f5b460eb"});
          }
        
//# sourceMappingURL=overlay.map
