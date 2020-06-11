import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { isNone } from '@ember/utils';
import { action } from '@ember/object';

export default class SelectComponent extends Component {
  // choices should be input as a list of dictionaries with two keys, value &
  // display:
  // [{value: 'hello', display: 'Hello World'}, ...]

  // To update values in the parent component, pass in a setCallback function.
  @action
  setSelection(value) {
    if (!isNone(this.args.setCallback)) {
      this.args.setCallback(value);
    }
  }

}
