import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { localClassName } from 'ember-css-modules';

export default class ToggleButtonComponent extends Component {
  negativeText = 'Off';
  positiveText = 'On';

  constructor() {
    super(...arguments);
    this.negativeText = this.args.negativeText || 'Off';
    this.positiveText = this.args.positiveText || 'On';
  }

  @action
  toggle() {
    if (this.args.callback) {
      this.args.callback(!this.args.value);
    }
  }

  get className() {
    return this.args.value ? 'on' : 'off';
  }

}
