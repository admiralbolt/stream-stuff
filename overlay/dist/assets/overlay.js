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
;define("overlay/components/bs-accordion", ["exports", "ember-bootstrap/components/bs-accordion"], function (_exports, _bsAccordion) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsAccordion.default;
    }
  });
});
;define("overlay/components/bs-accordion/item", ["exports", "ember-bootstrap/components/bs-accordion/item"], function (_exports, _item) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
;define("overlay/components/bs-accordion/item/body", ["exports", "ember-bootstrap/components/bs-accordion/item/body"], function (_exports, _body) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
;define("overlay/components/bs-accordion/item/title", ["exports", "ember-bootstrap/components/bs-accordion/item/title"], function (_exports, _title) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
;define("overlay/components/bs-alert", ["exports", "ember-bootstrap/components/bs-alert"], function (_exports, _bsAlert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsAlert.default;
    }
  });
});
;define("overlay/components/bs-button-group", ["exports", "ember-bootstrap/components/bs-button-group"], function (_exports, _bsButtonGroup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsButtonGroup.default;
    }
  });
});
;define("overlay/components/bs-button-group/button", ["exports", "ember-bootstrap/components/bs-button-group/button"], function (_exports, _button) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
});
;define("overlay/components/bs-button", ["exports", "ember-bootstrap/components/bs-button"], function (_exports, _bsButton) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsButton.default;
    }
  });
});
;define("overlay/components/bs-carousel", ["exports", "ember-bootstrap/components/bs-carousel"], function (_exports, _bsCarousel) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsCarousel.default;
    }
  });
});
;define("overlay/components/bs-carousel/slide", ["exports", "ember-bootstrap/components/bs-carousel/slide"], function (_exports, _slide) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _slide.default;
    }
  });
});
;define("overlay/components/bs-collapse", ["exports", "ember-bootstrap/components/bs-collapse"], function (_exports, _bsCollapse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsCollapse.default;
    }
  });
});
;define("overlay/components/bs-dropdown", ["exports", "ember-bootstrap/components/bs-dropdown"], function (_exports, _bsDropdown) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsDropdown.default;
    }
  });
});
;define("overlay/components/bs-dropdown/button", ["exports", "ember-bootstrap/components/bs-dropdown/button"], function (_exports, _button) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
});
;define("overlay/components/bs-dropdown/menu", ["exports", "ember-bootstrap/components/bs-dropdown/menu"], function (_exports, _menu) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _menu.default;
    }
  });
});
;define("overlay/components/bs-dropdown/menu/divider", ["exports", "ember-bootstrap/components/bs-dropdown/menu/divider"], function (_exports, _divider) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _divider.default;
    }
  });
});
;define("overlay/components/bs-dropdown/menu/item", ["exports", "ember-bootstrap/components/bs-dropdown/menu/item"], function (_exports, _item) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
;define("overlay/components/bs-dropdown/menu/link-to", ["exports", "ember-bootstrap/components/bs-dropdown/menu/link-to"], function (_exports, _linkTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
;define("overlay/components/bs-dropdown/toggle", ["exports", "ember-bootstrap/components/bs-dropdown/toggle"], function (_exports, _toggle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
});
;define("overlay/components/bs-form", ["exports", "ember-bootstrap/components/bs-form"], function (_exports, _bsForm) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsForm.default;
    }
  });
});
;define("overlay/components/bs-form/element", ["exports", "ember-bootstrap/components/bs-form/element"], function (_exports, _element) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
;define("overlay/components/bs-form/element/control", ["exports", "ember-bootstrap/components/bs-form/element/control"], function (_exports, _control) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _control.default;
    }
  });
});
;define("overlay/components/bs-form/element/control/checkbox", ["exports", "ember-bootstrap/components/bs-form/element/control/checkbox"], function (_exports, _checkbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
;define("overlay/components/bs-form/element/control/input", ["exports", "ember-bootstrap/components/bs-form/element/control/input"], function (_exports, _input) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _input.default;
    }
  });
});
;define("overlay/components/bs-form/element/control/radio", ["exports", "ember-bootstrap/components/bs-form/element/control/radio"], function (_exports, _radio) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _radio.default;
    }
  });
});
;define("overlay/components/bs-form/element/control/textarea", ["exports", "ember-bootstrap/components/bs-form/element/control/textarea"], function (_exports, _textarea) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _textarea.default;
    }
  });
});
;define("overlay/components/bs-form/element/errors", ["exports", "ember-bootstrap/components/bs-form/element/errors"], function (_exports, _errors) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _errors.default;
    }
  });
});
;define("overlay/components/bs-form/element/feedback-icon", ["exports", "ember-bootstrap/components/bs-form/element/feedback-icon"], function (_exports, _feedbackIcon) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _feedbackIcon.default;
    }
  });
});
;define("overlay/components/bs-form/element/help-text", ["exports", "ember-bootstrap/components/bs-form/element/help-text"], function (_exports, _helpText) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _helpText.default;
    }
  });
});
;define("overlay/components/bs-form/element/label", ["exports", "ember-bootstrap/components/bs-form/element/label"], function (_exports, _label) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _label.default;
    }
  });
});
;define("overlay/components/bs-form/element/layout/horizontal", ["exports", "ember-bootstrap/components/bs-form/element/layout/horizontal"], function (_exports, _horizontal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _horizontal.default;
    }
  });
});
;define("overlay/components/bs-form/element/layout/horizontal/checkbox", ["exports", "ember-bootstrap/components/bs-form/element/layout/horizontal/checkbox"], function (_exports, _checkbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
;define("overlay/components/bs-form/element/layout/inline", ["exports", "ember-bootstrap/components/bs-form/element/layout/inline"], function (_exports, _inline) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inline.default;
    }
  });
});
;define("overlay/components/bs-form/element/layout/inline/checkbox", ["exports", "ember-bootstrap/components/bs-form/element/layout/inline/checkbox"], function (_exports, _checkbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
;define("overlay/components/bs-form/element/layout/vertical", ["exports", "ember-bootstrap/components/bs-form/element/layout/vertical"], function (_exports, _vertical) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _vertical.default;
    }
  });
});
;define("overlay/components/bs-form/element/layout/vertical/checkbox", ["exports", "ember-bootstrap/components/bs-form/element/layout/vertical/checkbox"], function (_exports, _checkbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
;define("overlay/components/bs-form/group", ["exports", "ember-bootstrap/components/bs-form/group"], function (_exports, _group) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _group.default;
    }
  });
});
;define("overlay/components/bs-modal-simple", ["exports", "ember-bootstrap/components/bs-modal-simple"], function (_exports, _bsModalSimple) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsModalSimple.default;
    }
  });
});
;define("overlay/components/bs-modal", ["exports", "ember-bootstrap/components/bs-modal"], function (_exports, _bsModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsModal.default;
    }
  });
});
;define("overlay/components/bs-modal/body", ["exports", "ember-bootstrap/components/bs-modal/body"], function (_exports, _body) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
;define("overlay/components/bs-modal/dialog", ["exports", "ember-bootstrap/components/bs-modal/dialog"], function (_exports, _dialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dialog.default;
    }
  });
});
;define("overlay/components/bs-modal/footer", ["exports", "ember-bootstrap/components/bs-modal/footer"], function (_exports, _footer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _footer.default;
    }
  });
});
;define("overlay/components/bs-modal/header", ["exports", "ember-bootstrap/components/bs-modal/header"], function (_exports, _header) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _header.default;
    }
  });
});
;define("overlay/components/bs-modal/header/close", ["exports", "ember-bootstrap/components/bs-modal/header/close"], function (_exports, _close) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _close.default;
    }
  });
});
;define("overlay/components/bs-modal/header/title", ["exports", "ember-bootstrap/components/bs-modal/header/title"], function (_exports, _title) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
;define("overlay/components/bs-nav", ["exports", "ember-bootstrap/components/bs-nav"], function (_exports, _bsNav) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsNav.default;
    }
  });
});
;define("overlay/components/bs-nav/item", ["exports", "ember-bootstrap/components/bs-nav/item"], function (_exports, _item) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
;define("overlay/components/bs-nav/link-to", ["exports", "ember-bootstrap/components/bs-nav/link-to"], function (_exports, _linkTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
;define("overlay/components/bs-navbar", ["exports", "ember-bootstrap/components/bs-navbar"], function (_exports, _bsNavbar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsNavbar.default;
    }
  });
});
;define("overlay/components/bs-navbar/content", ["exports", "ember-bootstrap/components/bs-navbar/content"], function (_exports, _content) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
;define("overlay/components/bs-navbar/link-to", ["exports", "ember-bootstrap/components/bs-navbar/link-to"], function (_exports, _linkTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
;define("overlay/components/bs-navbar/nav", ["exports", "ember-bootstrap/components/bs-navbar/nav"], function (_exports, _nav) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _nav.default;
    }
  });
});
;define("overlay/components/bs-navbar/toggle", ["exports", "ember-bootstrap/components/bs-navbar/toggle"], function (_exports, _toggle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
});
;define("overlay/components/bs-popover", ["exports", "ember-bootstrap/components/bs-popover"], function (_exports, _bsPopover) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsPopover.default;
    }
  });
});
;define("overlay/components/bs-popover/element", ["exports", "ember-bootstrap/components/bs-popover/element"], function (_exports, _element) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
;define("overlay/components/bs-progress", ["exports", "ember-bootstrap/components/bs-progress"], function (_exports, _bsProgress) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsProgress.default;
    }
  });
});
;define("overlay/components/bs-progress/bar", ["exports", "ember-bootstrap/components/bs-progress/bar"], function (_exports, _bar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bar.default;
    }
  });
});
;define("overlay/components/bs-tab", ["exports", "ember-bootstrap/components/bs-tab"], function (_exports, _bsTab) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsTab.default;
    }
  });
});
;define("overlay/components/bs-tab/pane", ["exports", "ember-bootstrap/components/bs-tab/pane"], function (_exports, _pane) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pane.default;
    }
  });
});
;define("overlay/components/bs-tooltip", ["exports", "ember-bootstrap/components/bs-tooltip"], function (_exports, _bsTooltip) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsTooltip.default;
    }
  });
});
;define("overlay/components/bs-tooltip/element", ["exports", "ember-bootstrap/components/bs-tooltip/element"], function (_exports, _element) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
;define("overlay/components/control-panel/component", ["exports", "@glimmer/component"], function (_exports, _component) {
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
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "activeId", _descriptor, this);

      this.activeId = localStorage.getItem('activeTabId');
    }

    setTab(tabId) {
      this.activeId = tabId;
      localStorage.setItem('activeTabId', tabId);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "activeId", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "setTab", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "setTab"), _class.prototype)), _class);
  _exports.default = ControlPanelComponent;
});
;define("overlay/components/control-panel/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "control-panel": "_control-panel_1fc8uc"
  };
  _exports.default = _default;
});
;define("overlay/components/control-panel/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "sg1EWLtF",
    "block": "{\"symbols\":[\"tab\",\"nav\"],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"control-panel\"],[[\"from\"],[\"overlay/components/control-panel/styles\"]]]]],null],[10],[1,1,0,0,\"\\n  \"],[7,\"bs-tab\",[],[[\"@activeId\",\"@customTabs\"],[[27,[26,1,\"AppendSingleId\"],[]],true]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n    \"],[7,\"bs-nav\",[],[[\"@type\"],[\"tabs\"]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n      \"],[7,[27,[24,2],[\"item\"]],[],[[\"@active\"],[[31,160,5,[27,[26,2,\"CallHead\"],[]],[[27,[26,1,\"Expression\"],[]],\"admiral-lightning-bot\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[9,\"a\",true],[12,\"href\",\"#admiral-lightning-bot\",null],[12,\"class\",\"nav-link\",null],[12,\"role\",\"tab\",null],[13,\"onclick\",[31,282,6,[27,[26,4,\"CallHead\"],[]],[[27,[24,0],[]],[27,[26,3,\"Expression\"],[]],\"admiral-lightning-bot\"],null],null],[10],[1,1,0,0,\"\\n          Admiral Lightning Bot\\n        \"],[11],[1,1,0,0,\"\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n      \"],[7,[27,[24,2],[\"item\"]],[],[[\"@active\"],[[31,416,5,[27,[26,2,\"CallHead\"],[]],[[27,[26,1,\"Expression\"],[]],\"brain\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[9,\"a\",true],[12,\"href\",\"#brain\",null],[12,\"class\",\"nav-link\",null],[12,\"role\",\"tab\",null],[13,\"onclick\",[31,506,6,[27,[26,4,\"CallHead\"],[]],[[27,[24,0],[]],[27,[26,3,\"Expression\"],[]],\"brain\"],null],null],[10],[1,1,0,0,\"\\n          Brain\\n        \"],[11],[1,1,0,0,\"\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n      \"],[7,[27,[24,2],[\"item\"]],[],[[\"@active\"],[[31,608,5,[27,[26,2,\"CallHead\"],[]],[[27,[26,1,\"Expression\"],[]],\"melee\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[9,\"a\",true],[12,\"href\",\"#melee\",null],[12,\"class\",\"nav-link\",null],[12,\"role\",\"tab\",null],[13,\"onclick\",[31,698,6,[27,[26,4,\"CallHead\"],[]],[[27,[24,0],[]],[27,[26,3,\"Expression\"],[]],\"melee\"],null],null],[10],[1,1,0,0,\"\\n          Melee\\n        \"],[11],[1,1,0,0,\"\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n      \"],[7,[27,[24,2],[\"item\"]],[],[[\"@active\"],[[31,800,5,[27,[26,2,\"CallHead\"],[]],[[27,[26,1,\"Expression\"],[]],\"sound-board\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[9,\"a\",true],[12,\"href\",\"#sound-board\",null],[12,\"class\",\"nav-link\",null],[12,\"role\",\"tab\",null],[13,\"onclick\",[31,902,6,[27,[26,4,\"CallHead\"],[]],[[27,[24,0],[]],[27,[26,3,\"Expression\"],[]],\"sound-board\"],null],null],[10],[1,1,0,0,\"\\n          Sound Board\\n        \"],[11],[1,1,0,0,\"\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n      \"],[7,[27,[24,2],[\"item\"]],[],[[\"@active\"],[[31,1016,5,[27,[26,2,\"CallHead\"],[]],[[27,[26,1,\"Expression\"],[]],\"splash\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[9,\"a\",true],[12,\"href\",\"#splash\",null],[12,\"class\",\"nav-link\",null],[12,\"role\",\"tab\",null],[13,\"onclick\",[31,1108,6,[27,[26,4,\"CallHead\"],[]],[[27,[24,0],[]],[27,[26,3,\"Expression\"],[]],\"splash\"],null],null],[10],[1,1,0,0,\"\\n          Splash\\n        \"],[11],[1,1,0,0,\"\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n      \"],[7,[27,[24,2],[\"item\"]],[],[[\"@active\"],[[31,1212,5,[27,[26,2,\"CallHead\"],[]],[[27,[26,1,\"Expression\"],[]],\"spotify\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[9,\"a\",true],[12,\"href\",\"#spotify\",null],[12,\"class\",\"nav-link\",null],[12,\"role\",\"tab\",null],[13,\"onclick\",[31,1306,6,[27,[26,4,\"CallHead\"],[]],[[27,[24,0],[]],[27,[26,3,\"Expression\"],[]],\"spotify\"],null],null],[10],[1,1,0,0,\"\\n          Spotify\\n        \"],[11],[1,1,0,0,\"\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"parameters\":[2]}]]],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[12,\"class\",\"tab-content\",null],[10],[1,1,0,0,\"\\n      \"],[7,[27,[24,1],[\"pane\"]],[],[[\"@id\",\"@title\"],[\"admiral-lightning-bot\",\"Admiral Lightning Bot\"]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[7,\"controls/twitch-chat-bot\",[],[[],[]],null],[1,1,0,0,\"\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n      \"],[7,[27,[24,1],[\"pane\"]],[],[[\"@id\",\"@title\"],[\"brain\",\"Brain\"]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[7,\"controls/brain\",[],[[],[]],null],[1,1,0,0,\"\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n      \"],[7,[27,[24,1],[\"pane\"]],[],[[\"@id\",\"@title\"],[\"melee\",\"Melee\"]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[7,\"controls/melee\",[],[[],[]],null],[1,1,0,0,\"\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n      \"],[7,[27,[24,1],[\"pane\"]],[],[[\"@id\",\"@title\"],[\"sound-board\",\"Sound Board\"]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[7,\"controls/sound-board\",[],[[],[]],null],[1,1,0,0,\"\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n      \"],[7,[27,[24,1],[\"pane\"]],[],[[\"@id\",\"@title\"],[\"splash\",\"Splash\"]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[7,\"controls/splash\",[],[[],[]],null],[1,1,0,0,\"\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n      \"],[7,[27,[24,1],[\"pane\"]],[],[[\"@id\",\"@title\"],[\"spotify\",\"Spotify\"]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[7,\"controls/spotify\",[],[[],[]],null],[1,1,0,0,\"\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n  \"]],\"parameters\":[1]}]]],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"activeId\",\"bs-eq\",\"setTab\",\"action\"]}",
    "meta": {
      "moduleName": "overlay/components/control-panel/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/controls/brain/component", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let BrainComponent = (_dec = Ember.computed.alias('brain.brainSize'), _dec2 = Ember.computed.alias('brain.showBrain'), (_class = (_temp = class BrainComponent extends _component.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "brain", _descriptor, this);

      _initializerDefineProperty(this, "brainSize", _descriptor2, this);

      _initializerDefineProperty(this, "showBrain", _descriptor3, this);

      _initializerDefineProperty(this, "newBrainSize", _descriptor4, this);

      _initializerDefineProperty(this, "newShowBrain", _descriptor5, this);
    }

    updateBrain() {
      let updateData = {};
      if (!Ember.isNone(this.newBrainSize)) updateData.size = this.newBrainSize;
      updateData.show = this.newShowBrain == null ? false : this.newShowBrain;
      this.brain.updateBrain(updateData);
      this.newBrainSize = null;
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "brain", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "brainSize", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "showBrain", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "newBrainSize", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "newShowBrain", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "updateBrain", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "updateBrain"), _class.prototype)), _class));
  _exports.default = BrainComponent;
});
;define("overlay/components/controls/brain/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "hfeJlxH0",
    "block": "{\"symbols\":[\"form\"],\"statements\":[[9,\"p\",true],[12,\"class\",\"basic\",null],[10],[1,1,0,0,\"Current Brain Size: \"],[1,0,0,0,[27,[26,0,\"Expression\"],[\"brainSize\"]]],[11],[1,1,0,0,\"\\n\"],[9,\"p\",true],[12,\"class\",\"basic\",null],[10],[1,1,0,0,\"Showing Brain: \"],[1,0,0,0,[27,[26,0,\"Expression\"],[\"showBrain\"]]],[11],[1,1,0,0,\"\\n\\n\"],[7,\"bs-form\",[],[[\"@model\"],[[27,[24,0],[]]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n  \"],[7,[27,[24,1],[\"element\"]],[],[[\"@controlType\",\"@label\",\"@property\"],[\"number\",\"Brain Size\",\"newBrainSize\"]],null],[1,1,0,0,\"\\n  \"],[7,[27,[24,1],[\"element\"]],[],[[\"@controlType\",\"@label\",\"@property\"],[\"checkbox\",\"Show Brain\",\"newShowBrain\"]],null],[1,1,0,0,\"\\n\\n  \"],[7,\"bs-button\",[],[[\"@type\",\"@onClick\"],[\"primary\",[31,374,6,[27,[26,1,\"CallHead\"],[]],[[27,[24,0],[]],\"updateBrain\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Update Brain\"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n\"]],\"parameters\":[1]}]]],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"brain\",\"action\"]}",
    "meta": {
      "moduleName": "overlay/components/controls/brain/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/controls/melee/component", ["exports", "@glimmer/component"], function (_exports, _component) {
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
;define("overlay/components/controls/melee/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "melee-controls": "_melee-controls_1ozke1"
  };
  _exports.default = _default;
});
;define("overlay/components/controls/melee/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "c7noclhf",
    "block": "{\"symbols\":[\"form\"],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"melee-controls\"],[[\"from\"],[\"overlay/components/controls/melee/styles\"]]]]],null],[10],[1,1,0,0,\"\\n  \"],[7,\"bs-form\",[],[[\"@model\"],[[27,[24,0],[]]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n    \"],[7,[27,[24,1],[\"element\"]],[],[[\"@controlType\",\"@label\",\"@property\"],[\"text\",\"Player1\",\"player1\"]],null],[1,1,0,0,\"\\n    \"],[7,[27,[24,1],[\"element\"]],[],[[\"@controlType\",\"@label\",\"@property\"],[\"text\",\"Player2\",\"player2\"]],null],[1,1,0,0,\"\\n    \"],[7,[27,[24,1],[\"element\"]],[],[[\"@controlType\",\"@label\",\"@property\"],[\"text\",\"Player3\",\"player3\"]],null],[1,1,0,0,\"\\n    \"],[7,[27,[24,1],[\"element\"]],[],[[\"@controlType\",\"@label\",\"@property\"],[\"text\",\"Player4\",\"player4\"]],null],[1,1,0,0,\"\\n    \"],[7,\"bs-button\",[],[[\"@type\",\"@onClick\"],[\"primary\",[31,431,6,[27,[26,1,\"CallHead\"],[]],[[27,[24,0],[]],\"updatePlayerNames\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Update Player Names\"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n  \"]],\"parameters\":[1]}]]],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"action\"]}",
    "meta": {
      "moduleName": "overlay/components/controls/melee/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/controls/sound-board/board-item/component", ["exports", "@glimmer/component", "overlay/config/environment"], function (_exports, _component, _environment) {
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
;define("overlay/components/controls/sound-board/board-item/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "sound": "_sound_17llkj",
    "add-new-sound": "_add-new-sound_17llkj",
    "sound-name-input": "_sound-name-input_17llkj",
    "upload-button": "_upload-button_17llkj",
    "sound-display": "_sound-display_17llkj",
    "sound-name": "_sound-name_17llkj",
    "actions": "_actions_17llkj",
    "action": "_action_17llkj"
  };
  _exports.default = _default;
});
;define("overlay/components/controls/sound-board/board-item/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "siZtAWlc",
    "block": "{\"symbols\":[\"queue\"],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,7,\"BlockHead\"],[]],[[31,36,2,[27,[26,10,\"CallHead\"],[]],[[27,[26,9,\"Expression\"],[]],[27,[26,8,\"Expression\"],[]]],null]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"add-new-sound\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[1,0,0,0,[31,106,5,[27,[26,6,\"CallHead\"],[]],null,[[\"type\",\"value\",\"class\"],[\"text\",[27,[26,5,\"Expression\"],[]],[31,0,0,[27,[26,4,\"CallHead\"],[]],[\"input \",[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound-name-input\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]],null]]]]],[1,1,0,0,\"\\n      \"],[7,\"file-upload\",[],[[\"@name\",\"@for\",\"@accept\",\"@onfileadd\"],[\"sound_file\",\"sound_file\",\"audio/vnd.wave,audio/wav,audio/wave\",[31,303,6,[27,[26,2,\"CallHead\"],[]],[[27,[24,0],[]],\"addSoundFile\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        \"],[9,\"a\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"upload-button\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,7,\"BlockHead\"],[]],[[27,[24,1],[\"files\",\"length\"]]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"            \"],[1,0,0,0,[27,[24,1],[\"files\",\"0\",\"name\"]]],[1,1,0,0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"            \"],[1,0,0,0,[27,[26,3,\"AppendSingleId\"],[]]],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"        \"],[11],[1,1,0,0,\"\\n      \"]],\"parameters\":[1]}]]],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"actions\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"cancel\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"ban\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"save\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"save\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n      \"],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound-display\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[9,\"p\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"sound-name\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"name\"]]],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"actions\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]]],null],[10],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"play\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"play\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"edit\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"pencil-alt\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n        \"],[9,\"a\",false],[14,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"action\"],[[\"from\"],[\"overlay/components/controls/sound-board/board-item/styles\"]]]]],null],[3,0,0,[27,[26,2,\"ModifierHead\"],[]],[[27,[24,0],[]],\"delete\"],null],[10],[1,1,0,0,\"\\n          \"],[7,\"fa-icon\",[],[[\"@icon\"],[\"dumpster-fire\"]],null],[1,1,0,0,\"\\n        \"],[11],[1,1,0,0,\"\\n      \"],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"sound\",\"action\",\"soundFileName\",\"concat\",\"sound_name\",\"input\",\"if\",\"isNew\",\"isEditing\",\"or\"]}",
    "meta": {
      "moduleName": "overlay/components/controls/sound-board/board-item/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/controls/sound-board/component", ["exports", "@glimmer/component"], function (_exports, _component) {
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
;define("overlay/components/controls/sound-board/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "sound-board": "_sound-board_y3r1x2",
    "create-new": "_create-new_y3r1x2",
    "actual-sounds": "_actual-sounds_y3r1x2"
  };
  _exports.default = _default;
});
;define("overlay/components/controls/sound-board/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "qHM3IAkx",
    "block": "{\"symbols\":[\"sound\"],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"sound-board\"],[[\"from\"],[\"overlay/components/controls/sound-board/styles\"]]]]],null],[10],[1,1,0,0,\"\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"create-new\"],[[\"from\"],[\"overlay/components/controls/sound-board/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,4,\"BlockHead\"],[]],[[27,[26,3,\"Expression\"],[]]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"      \"],[7,\"controls/sound-board/board-item\",[],[[\"@isNew\",\"@createCallback\",\"@cancelCallback\"],[\"true\",[27,[26,1,\"AppendSingleId\"],[]],[27,[26,1,\"AppendSingleId\"],[]]]],null],[1,1,0,0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"      \"],[7,\"bs-button\",[],[[\"@type\",\"@onClick\"],[\"primary\",[31,266,6,[27,[26,0,\"CallHead\"],[]],[[27,[24,0],[]],\"createNew\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Create New Sound\"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"  \"],[11],[1,1,0,0,\"\\n\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"actual-sounds\"],[[\"from\"],[\"overlay/components/controls/sound-board/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,7,\"BlockHead\"],[]],[[31,0,0,[27,[26,6,\"CallHead\"],[]],[[31,0,0,[27,[26,6,\"CallHead\"],[]],[[27,[26,5,\"Expression\"],[]]],null]],null]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"      \"],[7,\"controls/sound-board/board-item\",[],[[\"@sound\"],[[27,[24,1],[]]]],null],[1,1,0,0,\"\\n\"]],\"parameters\":[1]}]]],[1,1,0,0,\"  \"],[11],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"action\",\"callback\",\"local-class\",\"isCreatingNew\",\"if\",\"sounds\",\"-track-array\",\"each\"]}",
    "meta": {
      "moduleName": "overlay/components/controls/sound-board/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/controls/splash/component", ["exports", "@glimmer/component", "ember-concurrency", "ember-concurrency-decorators"], function (_exports, _component, _emberConcurrency, _emberConcurrencyDecorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let SplashComponent = (_class = (_temp = class SplashComponent extends _component.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "websockets", _descriptor, this);

      _defineProperty(this, "socket", null);

      _initializerDefineProperty(this, "title", _descriptor2, this);

      _initializerDefineProperty(this, "preview", _descriptor3, this);

      _initializerDefineProperty(this, "timer", _descriptor4, this);

      _initializerDefineProperty(this, "timerRunning", _descriptor5, this);

      this.socket = this.websockets.socketFor('ws://localhost:7002/');
      this.socket.on('open', this.openHandler, this);
      this.title = localStorage.getItem('splashTitle') || '';
      this.preview = localStorage.getItem('splashPreview') || '';
      this.timer = localStorage.getItem('splashTimer') || 0;
      let timerRunning = localStorage.getItem('splashTimerRunning');
      this.timerRunning = timerRunning != null ? timerRunning == 'true' : false;
    }

    openHandler() {
      if (this.timerRunning) {
        this.startTimer();
      }

      this.updateInfo();
    }

    updateInfo() {
      this.socket.send({
        info: {
          title: this.title,
          preview: this.preview,
          timer: this.timer
        }
      }, true);
      localStorage.setItem('splashTitle', this.title);
      localStorage.setItem('splashPreview', this.preview);
      localStorage.setItem('splashTimer', this.timer);
    }

    startTimer() {
      this.runTimer.perform();
      this.socket.send({
        info: {
          showTimer: true
        }
      }, true);
      localStorage.setItem('splashTimerRunning', true);
      localStorage.setItem('splashShowTimer', true);
      this.timerRunning = true;
    }

    stopTimer() {
      this.runTimer.cancelAll();
      this.socket.send({
        info: {
          showTimer: false
        }
      }, true);
      localStorage.setItem('splashTimerRunning', false);
      localStorage.setItem('splashShowTimer', false);
      this.timerRunning = false;
    }

    *runTimer() {
      while (this.timer > 0) {
        localStorage.setItem('splashTimer', --this.timer);
        this.socket.send({
          info: {
            timer: this.timer
          }
        }, true);
        yield (0, _emberConcurrency.timeout)(1000);
      }

      this.timerRunning = false;
      this.stopTimer();
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "websockets", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "title", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "preview", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "timer", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "timerRunning", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "updateInfo", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "updateInfo"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "startTimer", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "startTimer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stopTimer", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "stopTimer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "runTimer", [_emberConcurrencyDecorators.task], Object.getOwnPropertyDescriptor(_class.prototype, "runTimer"), _class.prototype)), _class);
  _exports.default = SplashComponent;
});
;define("overlay/components/controls/splash/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "splash-controls": "_splash-controls_1ovuze"
  };
  _exports.default = _default;
});
;define("overlay/components/controls/splash/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "pgmiLFiB",
    "block": "{\"symbols\":[\"form\"],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,1,\"CallHead\"],[]],[\"splash-controls\"],[[\"from\"],[\"overlay/components/controls/splash/styles\"]]]]],null],[10],[1,1,0,0,\"\\n  \"],[7,\"bs-form\",[],[[\"@formLayout\",\"@model\"],[\"vertical\",[27,[24,0],[]]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n    \"],[7,[27,[24,1],[\"element\"]],[],[[\"@controlType\",\"@label\",\"@property\"],[\"text\",\"Title\",\"title\"]],null],[1,1,0,0,\"\\n    \"],[7,[27,[24,1],[\"element\"]],[],[[\"@controlType\",\"@label\",\"@property\"],[\"textarea\",\"Stream Preview\",\"preview\"]],null],[1,1,0,0,\"\\n    \"],[7,[27,[24,1],[\"element\"]],[],[[\"@controlType\",\"@label\",\"@property\"],[\"number\",\"Timer\",\"timer\"]],null],[1,1,0,0,\"\\n    \"],[7,\"bs-button\",[],[[\"@type\",\"@onClick\"],[\"primary\",[31,381,6,[27,[26,0,\"CallHead\"],[]],[[27,[24,0],[]],\"updateInfo\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Update Info\"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n\"],[5,[27,[26,3,\"BlockHead\"],[]],[[27,[26,2,\"Expression\"],[]]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"      \"],[7,\"bs-button\",[],[[\"@type\",\"@onClick\"],[\"primary\",[31,496,6,[27,[26,0,\"CallHead\"],[]],[[27,[24,0],[]],\"stopTimer\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Stop Timer\"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"      \"],[7,\"bs-button\",[],[[\"@type\",\"@onClick\"],[\"primary\",[31,597,6,[27,[26,0,\"CallHead\"],[]],[[27,[24,0],[]],\"startTimer\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Start Timer\"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"  \"]],\"parameters\":[1]}]]],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"action\",\"local-class\",\"timerRunning\",\"if\"]}",
    "meta": {
      "moduleName": "overlay/components/controls/splash/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/controls/spotify/component", ["exports", "@glimmer/component", "ember-concurrency", "ember-concurrency-decorators"], function (_exports, _component, _emberConcurrency, _emberConcurrencyDecorators) {
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

  let SpotifyComponent = (_class = (_temp = class SpotifyComponent extends _component.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "websockets", _descriptor, this);

      _initializerDefineProperty(this, "spotify", _descriptor2, this);

      _defineProperty(this, "socket", null);

      _initializerDefineProperty(this, "isPolling", _descriptor3, this);

      this.socket = this.websockets.socketFor('ws://localhost:7001/');
      this.isPolling = localStorage.getItem('spotifyPolling') == 'true';
      if (this.isPolling) this.pollingTask.perform();
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
      this.socket.send({
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

    togglePolling() {
      if (this.isPolling) {
        this.pollingTask.cancelAll();
        localStorage.removeItem('spotifyPolling');
        this.isPolling = false;
      } else {
        this.pollingTask.perform();
        localStorage.setItem('spotifyPolling', true);
        this.isPolling = true;
      }
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
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "isPolling", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "authorizeSpotify", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "authorizeSpotify"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getTokens", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "getTokens"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "refresh", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "refresh"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pollingTask", [_emberConcurrencyDecorators.task], Object.getOwnPropertyDescriptor(_class.prototype, "pollingTask"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "togglePolling", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "togglePolling"), _class.prototype)), _class);
  _exports.default = SpotifyComponent;
});
;define("overlay/components/controls/spotify/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {};
  _exports.default = _default;
});
;define("overlay/components/controls/spotify/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "4DR4HSKZ",
    "block": "{\"symbols\":[],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"spotify-controls\"],[[\"from\"],[\"overlay/components/controls/spotify/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"    \"],[9,\"p\",true],[12,\"class\",\"basic\",null],[10],[1,1,0,0,\"Spotify is Polling\"],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"  \"],[7,\"bs-button\",[],[[\"@type\",\"@onClick\"],[\"primary\",[31,154,6,[27,[26,3,\"CallHead\"],[]],[[27,[24,0],[]],\"authorizeSpotify\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Authorize Spotify\"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n  \"],[7,\"bs-button\",[],[[\"@type\",\"@onClick\"],[\"primary\",[31,251,6,[27,[26,3,\"CallHead\"],[]],[[27,[24,0],[]],\"getTokens\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Get Tokens\"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n  \"],[7,\"bs-button\",[],[[\"@type\",\"@onClick\"],[\"primary\",[31,334,6,[27,[26,3,\"CallHead\"],[]],[[27,[24,0],[]],\"refresh\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Refresh\"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n\\n  \"],[7,\"bs-button\",[],[[\"@type\",\"@onClick\"],[\"primary\",[31,414,6,[27,[26,3,\"CallHead\"],[]],[[27,[24,0],[]],\"togglePolling\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[]]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"      Stop Polling\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"      Start Polling\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"  \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"isPolling\",\"if\",\"action\"]}",
    "meta": {
      "moduleName": "overlay/components/controls/spotify/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/controls/twitch-chat-bot/component", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class, _descriptor, _descriptor2, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let TwitchChatBotComponent = (_dec = Ember.computed.alias('twitchChat.botIsAlive'), (_class = (_temp = class TwitchChatBotComponent extends _component.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "twitchChat", _descriptor, this);

      _initializerDefineProperty(this, "botIsAlive", _descriptor2, this);
    }

    toggleBot() {
      if (this.botIsAlive) {
        this.twitchChat.stop();
      } else {
        this.twitchChat.start();
      }
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "twitchChat", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "botIsAlive", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "toggleBot", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleBot"), _class.prototype)), _class));
  _exports.default = TwitchChatBotComponent;
});
;define("overlay/components/controls/twitch-chat-bot/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {};
  _exports.default = _default;
});
;define("overlay/components/controls/twitch-chat-bot/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "eM+T9fVX",
    "block": "{\"symbols\":[],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"twitch-chat-controls\"],[[\"from\"],[\"overlay/components/controls/twitch-chat-bot/styles\"]]]]],null],[10],[1,1,0,0,\"\\n  \"],[9,\"p\",true],[12,\"class\",\"basic\",null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[]]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"      Admiral Lightning Bot is online.\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"      Bot has been terminated.\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"  \"],[11],[1,1,0,0,\"\\n  \"],[7,\"bs-button\",[],[[\"@type\",\"@onClick\"],[\"primary\",[31,233,6,[27,[26,3,\"CallHead\"],[]],[[27,[24,0],[]],\"toggleBot\"],null]]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[]]],null,[[\"default\",\"else\"],[{\"statements\":[[1,1,0,0,\"      Stop Bot\\n\"]],\"parameters\":[]},{\"statements\":[[1,1,0,0,\"      Start Bot\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"  \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"botIsAlive\",\"if\",\"action\"]}",
    "meta": {
      "moduleName": "overlay/components/controls/twitch-chat-bot/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/ember-popper-targeting-parent", ["exports", "ember-popper/components/ember-popper-targeting-parent"], function (_exports, _emberPopperTargetingParent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberPopperTargetingParent.default;
    }
  });
});
;define("overlay/components/ember-popper", ["exports", "ember-popper/components/ember-popper"], function (_exports, _emberPopper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberPopper.default;
    }
  });
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
;define("overlay/components/layouts/melee/component", ["exports", "overlay/components/socket-client/component"], function (_exports, _component) {
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
;define("overlay/components/layouts/melee/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "melee-layout": "_melee-layout_a99bzv",
    "vidja-game": "_vidja-game_a99bzv",
    "name-space": "_name-space_a99bzv",
    "name-plates": "_name-plates_a99bzv",
    "name-plate-spacer": "_name-plate-spacer_a99bzv",
    "name-wrapper": "_name-wrapper_a99bzv",
    "player": "_player_a99bzv",
    "p1": "_p1_a99bzv",
    "p2": "_p2_a99bzv",
    "p3": "_p3_a99bzv",
    "p4": "_p4_a99bzv",
    "name": "_name_a99bzv",
    "panel": "_panel_a99bzv",
    "vertical-spacer": "_vertical-spacer_a99bzv",
    "web-cam": "_web-cam_a99bzv",
    "spacer": "_spacer_a99bzv",
    "camera-box": "_camera-box_a99bzv",
    "the-rest": "_the-rest_a99bzv"
  };
  _exports.default = _default;
});
;define("overlay/components/layouts/melee/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "0ZVJWdBR",
    "block": "{\"symbols\":[],\"statements\":[[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"melee-layout\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"vidja-game\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-space\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-plates\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-plate-spacer\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-wrapper\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[\"player1\"]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"player p1\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"P1\"],[11],[1,1,0,0,\"\\n          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"player1\"]]],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"      \"],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-wrapper\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[\"player2\"]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"player p2\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"P2\"],[11],[1,1,0,0,\"\\n          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"player2\"]]],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"      \"],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-wrapper\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[\"player3\"]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"player p3\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"P3\"],[11],[1,1,0,0,\"\\n          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"player3\"]]],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"      \"],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name-wrapper\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[\"player4\"]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"player p4\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"P4\"],[11],[1,1,0,0,\"\\n          \"],[9,\"span\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"name\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,0,0,0,[27,[26,1,\"Expression\"],[\"player4\"]]],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"      \"],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n  \"],[11],[1,1,0,0,\"\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"panel\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"vertical-spacer\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"web-cam\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"spacer\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"camera-box\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n      \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"spacer\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,0,\"CallHead\"],[]],[\"the-rest\"],[[\"from\"],[\"overlay/components/layouts/melee/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\\n    \"],[11],[1,1,0,0,\"\\n  \"],[11],[1,1,0,0,\"\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"local-class\",\"playerNames\",\"if\"]}",
    "meta": {
      "moduleName": "overlay/components/layouts/melee/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/layouts/splash/component", ["exports", "overlay/components/socket-client/component", "ember-concurrency", "ember-concurrency-decorators"], function (_exports, _component, _emberConcurrency, _emberConcurrencyDecorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let MIN_ANGLE = -Math.PI / 2.0 - Math.PI / 8.0;
  let MAX_ANGLE = -Math.PI / 2.0 + Math.PI / 8.0; // Credit where it's due:
  // https://codepen.io/jlong64/pen/jwJpc
  // Thanks Jarod Long!

  let SplashComponent = (_class = (_temp = class SplashComponent extends _component.default {
    constructor() {
      super(...arguments, 7002);

      _initializerDefineProperty(this, "title", _descriptor, this);

      _initializerDefineProperty(this, "preview", _descriptor2, this);

      _initializerDefineProperty(this, "timer", _descriptor3, this);

      _initializerDefineProperty(this, "showTimer", _descriptor4, this);

      _defineProperty(this, "canvas", null);

      _defineProperty(this, "context", null);

      _defineProperty(this, "scale", 1.0);

      _defineProperty(this, "width", 1920);

      _defineProperty(this, "height", 1080);

      _defineProperty(this, "tick", 25);

      _defineProperty(this, "flashOpacity", 0.0);

      _defineProperty(this, "maxFlash", 0.07);

      _defineProperty(this, "shouldFlash", false);

      _defineProperty(this, "flashHitPeak", false);

      _defineProperty(this, "boltFlashDuration", 0.25);

      _defineProperty(this, "boltFadeDuration", 0.5);

      _defineProperty(this, "totalBoltDuration", (this.boltFlashDuration + this.boltFadeDuration) * 1000);

      _defineProperty(this, "bolts", []);
    }

    get readableTimer() {
      let minutes = Math.floor(this.timer / 60);
      let seconds = this.timer % 60;
      if (seconds < 10) seconds = `0${seconds}`;
      return `${minutes}:${seconds}`;
    }

    messageHandler(event) {
      let data = JSON.parse(event.data);
      if (!data.info) return;
      if (data.info.title) this.title = data.info.title;
      if (data.info.preview) this.preview = data.info.preview;
      if (data.info.hasOwnProperty('timer')) this.timer = data.info.timer;
      if (data.info.hasOwnProperty('showTimer')) this.showTimer = data.info.showTimer;
    } // ALL the lightning bolt logic below.


    makeItRain() {
      this.canvas = document.getElementById('lightning');
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.context = this.canvas.getContext('2d');
      this.storm.perform();
    }

    launchBolt(x, y, length, direction) {
      this.shouldFlash = true;
      let boltCanvas = document.createElement('canvas');
      boltCanvas.width = this.width;
      boltCanvas.height = this.height;
      this.bolts.push({
        canvas: boltCanvas,
        duration: 0.0
      });
      this.drawBolt.perform(x, y, length, direction, boltCanvas, MIN_ANGLE, MAX_ANGLE);
    }

    *drawBolt(x, y, length, direction, boltCanvas, minAngle, maxAngle) {
      let originalDirection = direction;
      let boltContext = boltCanvas.getContext('2d');
      let i = 0;

      while (length > 0) {
        let x1 = Math.floor(x);
        let y1 = Math.floor(y);
        x += Math.cos(direction);
        y -= Math.sin(direction);
        --length;

        if (x1 != Math.floor(x) || y1 != Math.floor(y)) {
          let alpha = Math.min(1.0, length / 800.0);
          boltContext.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          boltContext.fillRect(x1, y1, 1.0, 1.0);
          direction = Math.max(minAngle, Math.min(maxAngle, direction + (-Math.PI / 16.0 + Math.random() * (Math.PI / 8.0)))); // 2% chance to split a lightning bolt.

          if (Math.random() < Math.max(0.015, length / 100000)) {
            if (Math.random() < 0.3) {
              yield (0, _emberConcurrency.timeout)(0);
            }

            let directionMod = -Math.PI / 6.0 + Math.random() * (Math.PI / 3.0);
            this.drawBolt.perform(x1, y1, length * (0.3 + Math.random() * 0.4), originalDirection + directionMod, boltCanvas, minAngle + directionMod, maxAngle + directionMod); // 5% chance to change directions.
          } else if (Math.random() < 0.05) {
            if (Math.random() < 0.3) {
              yield (0, _emberConcurrency.timeout)(0);
            }

            this.drawBolt.perform(x1, y1, length, originalDirection + (-Math.PI / 6.0 + Math.random() * (Math.PI / 3.0)), boltCanvas, minAngle, maxAngle);
            length = 0;
          }
        }
      }
    }

    *storm() {
      while (true) {
        if (this.bolts.length == 0 && Math.random() < 0.05) {
          let x = Math.floor(-10 + Math.random() * (this.width + 20.0));
          let y = Math.floor(Math.random() * (this.height / 3.0) + 5.0);
          let length = Math.floor(this.height / 2.0 + Math.random() * 2 * (this.height / 3.0));
          this.launchBolt(x, y, length, Math.PI * 3.0 / 2.0);
        }

        this.context.clearRect(0, 0, this.width, this.height);

        if (this.shouldFlash) {
          if (this.flashHitPeak) {
            this.flashOpacity -= this.tick / 2000.0;

            if (this.flashOpacity <= 0) {
              this.flashOpacity = 0;
              this.shouldFlash = false;
              this.flashHitPeak = false;
            }
          } else {
            this.flashOpacity = Math.max(this.maxFlash, this.flashOpacity + this.tick / 2000.0);
            if (this.flashOpacity == this.maxFlash) this.flashHitPeak = true;
          }

          this.context.fillStyle = `rgba(255, 255, 255, ${this.flashOpacity})`;
          this.context.fillRect(0, 0, this.width, this.height);
        }

        for (let [index, bolt] of this.bolts.entries()) {
          bolt.duration += this.tick;

          if (bolt.duration >= this.totalBoltDuration) {
            this.bolts.splice(index, 1);
            --index;
            continue;
          }

          this.context.globalAlpha = 1; // this.context.globalAlpha = Math.max(0.0, Math.min(1.0, (this.totalBoltDuration - bolt.duration) / this.boltFadeDuration));

          this.context.drawImage(bolt.canvas, 0.0, 0.0);
        }

        yield (0, _emberConcurrency.timeout)(this.tick);
      }
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "title", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "preview", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "timer", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "showTimer", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "makeItRain", [Ember._action], Object.getOwnPropertyDescriptor(_class.prototype, "makeItRain"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "drawBolt", [_emberConcurrencyDecorators.task], Object.getOwnPropertyDescriptor(_class.prototype, "drawBolt"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "storm", [_emberConcurrencyDecorators.task], Object.getOwnPropertyDescriptor(_class.prototype, "storm"), _class.prototype)), _class);
  _exports.default = SplashComponent;
});
;define("overlay/components/layouts/splash/styles", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    "lightning": "_lightning_1imuj3",
    "darken": "_darken_1imuj3",
    "info": "_info_1imuj3",
    "spacer": "_spacer_1imuj3",
    "title": "_title_1imuj3",
    "timer": "_timer_1imuj3",
    "stream-preview": "_stream-preview_1imuj3"
  };
  _exports.default = _default;
});
;define("overlay/components/layouts/splash/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "ikL3I2xG",
    "block": "{\"symbols\":[],\"statements\":[[9,\"div\",false],[23,\"class\",\"layout\",null],[3,0,0,[27,[26,1,\"ModifierHead\"],[]],[[27,[24,0],[\"makeItRain\"]]],null],[10],[1,1,0,0,\"\\n\\n  \"],[9,\"canvas\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"lightning\"],[[\"from\"],[\"overlay/components/layouts/splash/styles\"]]]]],null],[12,\"id\",\"lightning\",null],[10],[11],[1,1,0,0,\"\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"darken\"],[[\"from\"],[\"overlay/components/layouts/splash/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n\\n  \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"info\"],[[\"from\"],[\"overlay/components/layouts/splash/styles\"]]]]],null],[10],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"spacer\"],[[\"from\"],[\"overlay/components/layouts/splash/styles\"]]]]],null],[10],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"title\"],[[\"from\"],[\"overlay/components/layouts/splash/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[1,0,0,0,[27,[26,3,\"AppendSingleId\"],[]]],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"timer\"],[[\"from\"],[\"overlay/components/layouts/splash/styles\"]]]]],null],[10],[1,1,0,0,\"\\n\"],[5,[27,[26,5,\"BlockHead\"],[]],[[27,[26,4,\"Expression\"],[]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"        \"],[1,0,0,0,[27,[26,0,\"AppendSingleId\"],[]]],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]],[1,1,0,0,\"    \"],[11],[1,1,0,0,\"\\n    \"],[9,\"div\",true],[13,\"class\",[32,[[31,0,0,[27,[26,2,\"CallHead\"],[]],[\"stream-preview\"],[[\"from\"],[\"overlay/components/layouts/splash/styles\"]]]]],null],[10],[1,1,0,0,\"\\n      \"],[1,1,0,0,[27,[26,6,\"AppendSingleId\"],[]]],[1,1,0,0,\"\\n    \"],[11],[1,1,0,0,\"\\n  \"],[11],[1,1,0,0,\"\\n\\n\"],[11],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"readableTimer\",\"did-insert\",\"local-class\",\"title\",\"showTimer\",\"if\",\"preview\"]}",
    "meta": {
      "moduleName": "overlay/components/layouts/splash/template.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/components/plugins/brain/component", ["exports", "overlay/components/socket-client/component"], function (_exports, _component) {
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

  let SpotifyComponent = (_class = (_temp = class SpotifyComponent extends _component.default {
    constructor() {
      super(...arguments, 7003);

      _initializerDefineProperty(this, "brainSize", _descriptor, this);

      _initializerDefineProperty(this, "showBrain", _descriptor2, this);
    }

    messageHandler(event) {
      let data = JSON.parse(event.data);
      if (data.brainSize) this.brainSize = data.brainSize;
      if (data.hasOwnProperty('showBrain')) this.showBrain = data.showBrain;
    }

    get adjustedWidth() {
      return this.brainSize;
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "brainSize", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "showBrain", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = SpotifyComponent;
});
;define("overlay/components/plugins/brain/template", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "451nppjM",
    "block": "{\"symbols\":[],\"statements\":[[5,[27,[26,2,\"BlockHead\"],[]],[[27,[26,1,\"Expression\"],[]]],null,[[\"default\"],[{\"statements\":[[1,1,0,0,\"  \"],[9,\"img\",true],[13,\"style\",[32,[\"width: \",[27,[26,0,\"AppendSingleId\"],[]],\"px;\"]],null],[12,\"src\",\"/assets/images/brain.png\",null],[10],[11],[1,1,0,0,\"\\n\"]],\"parameters\":[]}]]]],\"hasEval\":false,\"upvars\":[\"adjustedWidth\",\"showBrain\",\"if\"]}",
    "meta": {
      "moduleName": "overlay/components/plugins/brain/template.hbs"
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
;define("overlay/helpers/bs-contains", ["exports", "ember-bootstrap/helpers/bs-contains"], function (_exports, _bsContains) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsContains.default;
    }
  });
  Object.defineProperty(_exports, "bsContains", {
    enumerable: true,
    get: function () {
      return _bsContains.bsContains;
    }
  });
});
;define("overlay/helpers/bs-eq", ["exports", "ember-bootstrap/helpers/bs-eq"], function (_exports, _bsEq) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsEq.default;
    }
  });
  Object.defineProperty(_exports, "eq", {
    enumerable: true,
    get: function () {
      return _bsEq.eq;
    }
  });
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
;define("overlay/helpers/on-document", ["exports", "ember-on-helper/helpers/on-document"], function (_exports, _onDocument) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _onDocument.default;
    }
  });
});
;define("overlay/helpers/on-window", ["exports", "ember-on-helper/helpers/on-window"], function (_exports, _onWindow) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _onWindow.default;
    }
  });
});
;define("overlay/helpers/on", ["exports", "ember-on-helper/helpers/on"], function (_exports, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _on.default;
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
;define("overlay/initializers/load-bootstrap-config", ["exports", "overlay/config/environment", "ember-bootstrap/config"], function (_exports, _environment, _config) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize()
  /* container, application */
  {
    _config.default.load(_environment.default['ember-bootstrap'] || {});
  }

  var _default = {
    name: 'load-bootstrap-config',
    initialize
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
;define("overlay/instance-initializers/brain", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize(appInstance) {
    let brain = appInstance.lookup('service:brain');
  }

  var _default = {
    initialize
  };
  _exports.default = _default;
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
;define("overlay/modifiers/did-insert", ["exports", "@ember/render-modifiers/modifiers/did-insert"], function (_exports, _didInsert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didInsert.default;
    }
  });
});
;define("overlay/modifiers/did-update", ["exports", "@ember/render-modifiers/modifiers/did-update"], function (_exports, _didUpdate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didUpdate.default;
    }
  });
});
;define("overlay/modifiers/focus-trap", ["exports", "ember-focus-trap/modifiers/focus-trap"], function (_exports, _focusTrap) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _focusTrap.default;
    }
  });
});
;define("overlay/modifiers/ref", ["exports", "ember-ref-modifier/modifiers/ref"], function (_exports, _ref) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ref.default;
    }
  });
});
;define("overlay/modifiers/will-destroy", ["exports", "@ember/render-modifiers/modifiers/will-destroy"], function (_exports, _willDestroy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _willDestroy.default;
    }
  });
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
      this.route('splash');
    });
    this.route('plugins', function () {
      this.route('spotify');
      this.route('brain');
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
;define("overlay/routes/layouts/splash", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class LayoutsSplashRoute extends Ember.Route {}

  _exports.default = LayoutsSplashRoute;
});
;define("overlay/routes/plugins/brain", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class PluginsBrainRoute extends Ember.Route {}

  _exports.default = PluginsBrainRoute;
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
;define("overlay/services/brain", ["exports", "ember-concurrency-decorators"], function (_exports, _emberConcurrencyDecorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class, _descriptor, _descriptor2, _descriptor3, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let BrainService = (_dec = (0, _emberConcurrencyDecorators.task)({
    enqueue: true
  }), (_class = (_temp = class BrainService extends Ember.Service {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "websockets", _descriptor, this);

      _defineProperty(this, "socket", null);

      _initializerDefineProperty(this, "brainSize", _descriptor2, this);

      _initializerDefineProperty(this, "showBrain", _descriptor3, this);

      this.socket = this.websockets.socketFor('ws://localhost:7003/');
      this.socket.on('open', this.openHandler, this);
      this.brainSize = parseInt(localStorage.getItem('brainSize') || 0);
      this.showBrain = localStorage.getItem('showBrain') == 'true';
    }

    openHandler() {
      this.socket.send({
        brainSize: this.brainSize,
        showBrain: this.showBrain
      }, true);
    }

    updateBrain(info) {
      let sendData = {};

      if (info.size) {
        this.brainSize = info.size;
        localStorage.setItem('brainSize', this.brainSize);
        sendData.brainSize = this.brainSize;
      }

      if (info.hasOwnProperty('show')) {
        this.showBrain = info.show;
        localStorage.setItem('showBrain', this.showBrain);
        sendData.showBrain = this.showBrain;
      }

      if (sendData) this.socket.send(sendData, true);
    }

    *atomicAdjustSize(increment) {
      this.updateBrain({
        size: increment ? this.brainSize + 1 : this.brainSize - 1
      });
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "websockets", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "brainSize", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "showBrain", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "atomicAdjustSize", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "atomicAdjustSize"), _class.prototype)), _class));
  _exports.default = BrainService;
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
;define("overlay/services/twitch-chat", ["exports", "tmi", "overlay/config/environment", "overlay/utils/commands/get-command"], function (_exports, _tmi, _environment, _getCommand) {
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

      _initializerDefineProperty(this, "brain", _descriptor, this);

      _initializerDefineProperty(this, "client", _descriptor2, this);

      _initializerDefineProperty(this, "botIsAlive", _descriptor3, this);
    }

    init() {
      super.init(...arguments);
      this.botIsAlive = localStorage.getItem('botIsAlive');
      if (this.botIsAlive) this.start();
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

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "brain", [Ember.inject.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "client", [Ember._tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "botIsAlive", [Ember._tracked], {
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
;define("overlay/templates/components/ember-popper-targeting-parent", ["exports", "ember-popper/templates/components/ember-popper-targeting-parent"], function (_exports, _emberPopperTargetingParent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberPopperTargetingParent.default;
    }
  });
});
;define("overlay/templates/components/ember-popper", ["exports", "ember-popper/templates/components/ember-popper"], function (_exports, _emberPopper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberPopper.default;
    }
  });
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
    "id": "3feI2G9n",
    "block": "{\"symbols\":[],\"statements\":[[7,\"layouts/melee\",[],[[],[]],null],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "overlay/templates/layouts/melee.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/templates/layouts/splash", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "N5C7YZKo",
    "block": "{\"symbols\":[],\"statements\":[[7,\"layouts/splash\",[],[[],[]],null],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "overlay/templates/layouts/splash.hbs"
    }
  });

  _exports.default = _default;
});
;define("overlay/templates/plugins/brain", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "6VRpZxng",
    "block": "{\"symbols\":[],\"statements\":[[7,\"plugins/brain\",[],[[],[]],null],[1,1,0,0,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "overlay/templates/plugins/brain.hbs"
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
;define("overlay/utils/commands/big-brain", ["exports", "commander", "overlay/utils/commands/command-base"], function (_exports, _commander, _commandBase) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class BigBrain extends _commandBase.default {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "name", '!bigbrain');

      _defineProperty(this, "description", 'This streamer is 3 smart 5 you, increase the size of the brain.');
    }

    parseAndExecute(emberContext, target, twitchContext, command, args) {
      super.parseAndExecute(emberContext, target, twitchContext, command, args);
      emberContext.brain.atomicAdjustSize.perform(
      /*increment=*/
      true);
    }

  }

  _exports.default = BigBrain;
});
;define("overlay/utils/commands/command-base", ["exports", "commander"], function (_exports, _commander) {
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
;define("overlay/utils/commands/get-command", ["exports", "overlay/utils/commands/big-brain", "overlay/utils/commands/small-brain", "overlay/utils/commands/test-command"], function (_exports, _bigBrain, _smallBrain, _testCommand) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = getCommand;
  let COMMANDS = [new _bigBrain.default(), new _smallBrain.default(), new _testCommand.default()];

  function getCommand(name) {
    let COMMAND_MAP = {};

    for (let command of COMMANDS) {
      COMMAND_MAP[command.name] = command;
    }

    return COMMAND_MAP[name] || undefined;
  }
});
;define("overlay/utils/commands/small-brain", ["exports", "commander", "overlay/utils/commands/command-base"], function (_exports, _commander, _commandBase) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class SmallBrain extends _commandBase.default {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "name", '!smallbrain');

      _defineProperty(this, "description", 'This streamer is the big dumb, reduce the size of the brain.');
    }

    parseAndExecute(emberContext, target, twitchContext, command, args) {
      super.parseAndExecute(emberContext, target, twitchContext, command, args);
      emberContext.brain.atomicAdjustSize.perform(
      /*increment=*/
      false);
    }

  }

  _exports.default = SmallBrain;
});
;define("overlay/utils/commands/test-command", ["exports", "commander", "overlay/utils/commands/command-base"], function (_exports, _commander, _commandBase) {
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
            require("overlay/app")["default"].create({"name":"overlay","version":"0.0.0+7e594b3d"});
          }
        
//# sourceMappingURL=overlay.map
