import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SoundBoardComponent extends Component {
  @service store;
  @tracked isCreatingNew = false;
  @tracked sounds = null;

  constructor() {
    super(...arguments);
    this.sounds = this.store.findAll('sound')
  }

  @action
  createNew() {
    this.isCreatingNew = true;
  }

  @action
  callback() {
    this.isCreatingNew = false;
  }


}
