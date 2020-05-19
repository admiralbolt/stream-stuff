import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class ControlPanelComponent extends Component {
  @tracked activeId;

  constructor() {
    super(...arguments);
    this.activeId = localStorage.getItem('activeTabId');
  }

  @action
  setTab(tabId) {
    this.activeId = tabId;
    localStorage.setItem('activeTabId', tabId);
  }
}
