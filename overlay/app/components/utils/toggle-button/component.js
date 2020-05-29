import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { localClassName } from 'ember-css-modules';

export default class ToggleButtonComponent extends Component {
  @tracked value = false;
  negativeText = 'Off';
  positiveText = 'On';

  constructor() {
    super(...arguments);
    this.negativeText = this.args.negativeText || 'Off';
    this.positiveText = this.args.positiveText || 'On';
    this.value = this.args.value;
  }

  @action
  toggle() {
    this.value = !this.value;
    if (this.args.callback) {
      this.args.callback(this.value);
    }
  }

  get className() {
    return this.value ? 'on' : 'off';
  }

}
