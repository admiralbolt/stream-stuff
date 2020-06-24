import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'overlay/config/environment';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';


export default class PollService extends Service {
  @tracked isRunning = false;
  @service keyValue;

  init() {
    super.init(...arguments);
    this.initialize();
  }

  async initialize() {
    this.isRunning = await this.keyValue.getValue('poll_is_running');
    console.log(`isRunning: ${this.isRunning}`);
  }

  async vote(username, choice) {
    if (!this.isRunning) return;

    let voteResponse = await fetch(`${ENV.host}/vote/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        data: {
          type: 'vote',
          attributes: {
            username: username,
            choice: choice
          }
        }
      })
    });

    console.log(voteResponse);
  }

  async startPoll(title, timer, questions) {
    if (this.isRunning) return;

    let poll = await fetch(`${ENV.host}/create_and_start_poll/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        data: {
          type: 'create_and_start_poll',
          attributes: {
            title: title,
            timer: timer,
            questions: questions
          }
        }
      })
    });

    this.resetIsRunning.perform(timer);
    this.isRunning = true;
  }

  @task
  *resetIsRunning(timer) {
    // Timeout is in miliseconds, timer is in seconds.
    // Extra time is for clean up / final display.
    yield timeout(timer * 1000 + 5 * 1000);
    this.isRunning = false;
  }

  async stopPoll() {
    if (!this.isRunning) return;

    await fetch(`${ENV.host}/stop_poll/`, {
      method: 'post'
    });
    this.isRunning = false;
    this.resetIsRunning.cancelAll();
  }

}
