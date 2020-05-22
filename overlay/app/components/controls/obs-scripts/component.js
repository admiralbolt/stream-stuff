import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ObsScriptsComponent extends Component {
  @service store;

  constructor() {
    super(...arguments);
    this.scripts = this.store.findAll('script')
  }

}
