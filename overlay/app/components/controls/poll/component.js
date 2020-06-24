import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class PollComponent extends Component {
  @service poll;
  @service websockets;

  @tracked pollTitle = 'Hello';
  @tracked pollTimer = 30;
  @tracked questions = A(['Yes', 'No']);

  socket = null;

  constructor() {
    super(...arguments);
    this.socket = this.websockets.socketFor('ws://localhost:7005/');
  }

  @action
  addQuestion() {
    this.questions.pushObject('');
  }

  @action
  removeQuestion() {
    this.questions.popObject();
  }

  @action
  togglePoll() {
    if (this.poll.isRunning) {
      this.poll.stopPoll();
      return;
    }

    this.poll.startPoll(this.pollTitle, this.pollTimer, this.questions);
  }

}
