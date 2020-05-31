import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { sort } from '@ember/object/computed';

export default class SoundBoardComponent extends Component {
  @service store;
  @tracked isCreatingNew = false;
  @tracked storeSounds = null;

  nameSorting = ['name'];
  @sort('storeSounds', 'nameSorting') sounds;

  constructor() {
    super(...arguments);
    this.storeSounds = this.store.findAll('sound')
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
