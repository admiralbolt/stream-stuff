import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';


let TWITCH_SUBSCRIBER_COUNT = 'twitch_subscriber_count';
let TWITCH_SUBSCRIBER_GOAL_COUNT = 'twitch_subscriber_goal_count';
let TWITCH_SUBSCRIBER_GOAL_MESSAGE = 'twitch_subscriber_goal_message';
let TWITCH_SUBSCRIBER_PLUGIN_MODE = 'twitch_subscriber_plugin_mode';

export default class SubGoalComponent extends Component {
  @service keyValue;
  @service websockets;

  @tracked subGoal;
  @tracked goalMessage;
  @tracked mode;

  constructor() {
    super(...arguments);
    this.initialize();
  }

  async initialize() {
    this.goalMessage = await this.keyValue.getValue(TWITCH_SUBSCRIBER_GOAL_MESSAGE);
    this.mode = await this.keyValue.getValue(TWITCH_SUBSCRIBER_PLUGIN_MODE);
    this.subGoal = await this.keyValue.getValue(TWITCH_SUBSCRIBER_GOAL_COUNT);

    this.socket = this.websockets.socketFor('ws://localhost:7006/');
  }

  @action
  async updateInfo() {
    await this.keyValue.createOrUpdate(TWITCH_SUBSCRIBER_GOAL_MESSAGE, this.goalMessage);
    await this.keyValue.createOrUpdate(TWITCH_SUBSCRIBER_GOAL_COUNT, this.subGoal);
    await this.keyValue.createOrUpdate(TWITCH_SUBSCRIBER_PLUGIN_MODE, this.mode);

    this.socket.send({
      goal_message: this.goalMessage,
      mode: this.mode,
      sub_goal: this.subGoal
    }, true);
  }

}
