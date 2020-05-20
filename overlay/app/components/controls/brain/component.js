import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { isNone } from '@ember/utils';

export default class BrainComponent extends Component {
  @service brain;

  @alias('brain.brainSize') brainSize;
  @alias('brain.showBrain') showBrain;

  @tracked newBrainSize = null;
  @tracked newShowBrain = null;

  @action
  updateBrain() {
    let updateData = {};

    if (!isNone(this.newBrainSize)) updateData.size = this.newBrainSize;
    updateData.show = this.newShowBrain == null ? false : this.newShowBrain;

    this.brain.updateBrain(updateData);

    this.newBrainSize = null;
  }

}
