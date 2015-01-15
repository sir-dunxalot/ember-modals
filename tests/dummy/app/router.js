import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('array-controller');

  this.resource('info', function() {
    this.route('about');
  });
});

export default Router;
