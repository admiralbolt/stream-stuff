import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

// Thanks https://codepen.io/beauhaus/pen/QJrpPY!
export default class CloudComponent extends Component {

  get cloudPosition() {
    let top = this.args.top || 0;
    let left = this.args.left || 0;
    return htmlSafe(`top: ${top}px; left: ${left}px;`);
  }
}
