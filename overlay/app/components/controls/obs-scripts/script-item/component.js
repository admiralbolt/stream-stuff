import Component from '@glimmer/component';
import { action } from '@ember/object';
import ENV from 'overlay/config/environment';

export default class ScriptItemComponent extends Component {
  script = null;

  constructor() {
    super(...arguments);
    this.script = this.args.script;
  }

  @action
  trigger(stop = false) {
    console.log(this.script);
    let url = `${ENV.host}/run_script/?script_name=${this.script.script_name}`;
    if (stop) {
      url = `${url}&stop=true`;
    }
    fetch(url);
  }
}
