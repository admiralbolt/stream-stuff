import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';

export default class RainDropComponent extends Component {

  @tracked animationDelay;
  @tracked animationDuration;
  @tracked bottom;

  constructor() {
    super(...arguments);
    let rando = Math.random();
    this.animationDelay = rando;
    this.animationDuration = rando + 0.75;
    this.bottom = 100 + Math.random() * 4 - 2;
  }

  get dropStyle() {
    return htmlSafe(`
      left: ${this.args.left}%;
      bottom: ${this.bottom}%;
      animation-delay: ${this.animationDelay}s;
      animation-duration: ${this.animationDuration}s;
    `);
    return htmlSafe(``);
  }

  get stemStyle() {
    return htmlSafe(`
      animation-delay: ${this.animationDelay}s;
      animation-duration: ${this.animationDuration}s;
    `);
  }

  get splatStyle() {
    return htmlSafe(`
      animation-delay: ${this.animationDelay}s;
      animation-duration: ${this.animationDuration}s;
    `);
  }

}
