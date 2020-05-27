import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('control-panel');
  this.route('layouts', function() {
    this.route('melee');
    this.route('splash');
    this.route('canvas');
  });

  this.route('plugins', function() {
    this.route('spotify');
    this.route('brain');
  });
});
