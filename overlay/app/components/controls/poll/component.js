import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';

let POLL_TITLE = 'poll_title';
let POLL_TIMER = 'poll_max_timer';
let POLL_QUESTIONS = 'poll_questions';

export default class PollComponent extends Component {
  @service keyValue;
  @service poll;
  @service websockets;

  @tracked pollTitle = 'Hello';
  @tracked pollTimer = 30;
  @tracked questions = A(['Yes', 'No']);

  socket = null;

  constructor() {
    super(...arguments);
    this.socket = this.websockets.socketFor('ws://localhost:7005/');
    this.initialize();
  }

  async initialize() {
    this.pollTitle = await this.keyValue.getValue(POLL_TITLE);
    this.pollTimer = await this.keyValue.getValue(POLL_TIMER);
    this.questions = await this.keyValue.getValue(POLL_QUESTIONS);
    if (isNone(this.questions)) {
      this.questions = A();
    }
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

  @action
  save() {
    this.keyValue.createOrUpdate(POLL_TITLE, this.pollTitle);
    this.keyValue.createOrUpdate(POLL_TIMER, this.pollTimer);
    this.keyValue.createOrUpdate(POLL_QUESTIONS, this.questions);
  }

}
