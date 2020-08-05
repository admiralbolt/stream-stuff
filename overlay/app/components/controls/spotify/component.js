import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

let IS_POLLING = 'spotify_should_poll';

export default class SpotifyComponent extends Component {
  @service keyValue;
  @tracked isPolling = false;

  constructor() {
    super(...arguments);
    this.initialize();
  }

  async initialize() {
    this.isPolling = await this.keyValue.getValue(IS_POLLING);
  }

  @action
  togglePolling() {
    if (this.isPolling) {
      this.keyValue.createOrUpdate(IS_POLLING, false);
      this.isPolling = false;
    } else {
      this.keyValue.createOrUpdate(IS_POLLING, true);
      this.isPolling = true;
    }
  }

}
