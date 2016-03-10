import Ember from 'ember';
import EmberModalsInitializer from 'dummy/initializers/ember-modals';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | ember modals', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  EmberModalsInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
