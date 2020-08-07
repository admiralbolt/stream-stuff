import SocketClientComponent from 'overlay/components/socket-client/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

let TWITCH_SUBSCRIBER_COUNT = 'twitch_subscriber_count';
let TWITCH_SUBSCRIBER_GOAL_COUNT = 'twitch_subscriber_goal_count';
let TWITCH_SUBSCRIBER_GOAL_MESSAGE = 'twitch_subscriber_goal_message';
let TWITCH_SUBSCRIBER_PLUGIN_MODE = 'twitch_subscriber_plugin_mode';

let MEME_MODE = 'almost_there';
let NORMAL_MODE = 'normal';

export default class SubGoalComponent extends SocketClientComponent {
  @service keyValue;

  @tracked subCount;
  @tracked subGoal;
  @tracked goalMessage;
  @tracked mode;

  get progressPercent() {
    return 100 * this.subCount / ((this.mode == MEME_MODE) ? this.fakeGoal : this.subGoal);
  }

  get fakeGoal() {
    return this.subCount + 1;
  }

  constructor() {
    super(...arguments, 7006);
    this.initialize();
  }

  async initialize() {
    this.subCount = await this.keyValue.getValue(TWITCH_SUBSCRIBER_COUNT);
    this.goalMessage = await this.keyValue.getValue(TWITCH_SUBSCRIBER_GOAL_MESSAGE);
    this.mode = await this.keyValue.getValue(TWITCH_SUBSCRIBER_PLUGIN_MODE);
    this.subGoal = await this.keyValue.getValue(TWITCH_SUBSCRIBER_GOAL_COUNT);
  }

  messageHandler(event) {
    let data = JSON.parse(event.data);

    if (data.hasOwnProperty('sub_count')) {
      this.subCount = data.sub_count;
    }

    if (data.hasOwnProperty('sub_goal')) {
      this.subGoal = data.sub_goal;
    }

    if (data.hasOwnProperty('goal_message')) {
      this.goalMessage = data.goal_message;
    }

    if (data.hasOwnProperty('mode')) {
      this.mode = data.mode;
    }

  }

};
