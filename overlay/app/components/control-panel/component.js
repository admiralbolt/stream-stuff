import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class ControlPanelComponent extends Component {
  @service keyValue;
  @tracked activeId;

  constructor() {
    super(...arguments);
    this.initialize();
  }

  async initialize() {
    this.activeId = await this.keyValue.getValue('activeTabId');
  }

  @action
  setTab(tabId) {
    this.activeId = tabId;
    this.keyValue.createOrUpdate('activeTabId', tabId);
  }
}
