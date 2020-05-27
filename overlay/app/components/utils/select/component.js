import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { isNone } from '@ember/utils';
import { action } from '@ember/object';

export default class SelectComponent extends Component {
  // choices should be input as a list of dictionaries with two keys, value &
  // display:
  // [{value: 'hello', display: 'Hello World'}, ...]

  // To update values in the parent component, pass in a setCallback function.
  @tracked value;

  constructor() {
    super(...arguments);
    this.value = this.args.value;

    if (this.args.choices.length == 0 || !isNone(this.value)) return;

    this.value = this.choices[0].value;
  }

  @action
  setSelection(value) {
    this.value = value;
    if (!isNone(this.args.setCallback)) {
      this.args.setCallback(this.value);
    }
  }

}
