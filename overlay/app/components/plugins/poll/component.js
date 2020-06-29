import SocketClientComponent from 'overlay/components/socket-client/component';
import { tracked } from '@glimmer/tracking';
import { isEmpty, isNone } from '@ember/utils';
import { htmlSafe } from '@ember/template';
import { A } from '@ember/array';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';

let HIGHLIGHT_COLOR = 'rgb(80, 218, 216)';

/*
Displays a currently active poll on screen. Polls have
the following options:

All messages require the following options:
  * type: (Required) Should be either 'setup', 'update', 'finalize'.

SETUP OPTIONS
=============
  * title: (Required) The question or thing being asked.
  * questions: (Required) Array of questions
  * timer: (Required) Timer

UPDATE OPTIONS
==============
  * votes: (Required) Array of votes
  * timer: (Required) The time left on the poll.

FINALIZE OPTIONS
================
Nothing! You're done. :)

*/


class Question {
  @tracked text;
  @tracked ordinal;
  @tracked votes = 0;
  @tracked totalVotes = 0;

  @tracked final = false;
  @tracked winner = false;

  constructor(text, ordinal) {
    this.text = text;
    this.ordinal = ordinal;
  }

  get percent() {
    if (this.totalVotes == 0) return 0;

    return 100 * this.votes / this.totalVotes;
  }

  get barStyle() {
    if (!this.final || !this.winner) return htmlSafe(`width: ${this.percent}%;`);

    return htmlSafe(`width: ${this.percent}%;background-color: ${HIGHLIGHT_COLOR};`);
  }

  get accentCss() {
    if (!this.final || !this.winner) return htmlSafe('');

    return htmlSafe(`color: ${HIGHLIGHT_COLOR}`);
  }

  get accentCssBackground() {
    if (!this.final || !this.winner) return htmlSafe('');

    return htmlSafe(`background-color: ${HIGHLIGHT_COLOR}`);
  }

  get finalizedCss() {
    if (!this.final) return htmlSafe('');

    if (this.winner) {
      return htmlSafe(`color: ${HIGHLIGHT_COLOR};`);
    } else {
      return htmlSafe(`filter: brightness(50%)`);
    }
  }
}


export default class PollComponent extends SocketClientComponent {
  @tracked questions = [];
  @tracked show = false;
  @tracked timer = 0;
  @tracked title = '';
  @tracked totalVotes = 0;

  constructor() {
    super(...arguments, 7005);
  }

  get showPoll() {
    return htmlSafe(this.show ? 'opacity: 1;' : 'opacity: 0;');
  }

  messageHandler(event) {
    let data = JSON.parse(event.data);
    if (isNone(data.type) || isEmpty(data.type)) return;

    // Setup the title and questions.
    if (data.type == 'setup') {
      if (isNone(data.title) || isEmpty(data.title) || isNone(data.timer) || data.questions.length == 0) return;

      this.title = data.title;
      this.timer = data.timer;

      let questions = [];
      for (let i = 0; i < data.questions.length; ++i) {
        questions.push(new Question(data.questions[i], i+1));
      }
      this.questions = questions;
      this.show = true;
      return;
    }

    // Update vote counts for all records.
    if (data.type == 'update') {
      if (isNone(data.votes) || isNone(data.timer)) return;

      this.timer = data.timer;

      if (Object.keys(data.votes).length === 0) return;

      let totalVotes = Object.values(data.votes).reduce((a, b) => a + b);
      this.totalVotes = totalVotes;
      for (let ordinal in data.votes) {
        if (!data.votes.hasOwnProperty(ordinal)) continue;

        this.questions[ordinal - 1].votes = data.votes[ordinal];
        this.questions[ordinal - 1].totalVotes = totalVotes;
      }

      return;
    }

    // Finalize the results. Ignores all new votes after this point.
    if (data.type == 'finalize') {
      let maxOrdinals = [];
      let maxVotes = -1;
      this.questions.forEach((question) => {
        if (question.votes > maxVotes) {
          maxVotes = question.votes;
          maxOrdinals = [question.ordinal];
        } else if (question.votes == maxVotes) {
          maxOrdinals.push(question.ordinal);
        }
      });

      this.questions.forEach((question) => {
        if (maxOrdinals.includes(question.ordinal)) {
          question.winner = true;
        }
        question.final = true;
      });

      this.hideAfterDelay.perform();
      return;
    }
  }

  @task
  *hideAfterDelay() {
    yield timeout(5000);
    this.show = false;
  }

}
