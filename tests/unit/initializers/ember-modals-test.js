import Ember from 'ember';
import EmberModalsInitializer from 'dummy/initializers/ember-modals';
import ModalsService from 'ember-modals/services/modals';
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

test('it injects the modals service', function(assert) {
  EmberModalsInitializer.initialize(application);

  const container = application.__container__;

  assert.expect(3);

  application.register('service:modals', ModalsService);

  ['controller', 'route'].forEach((name) => {

    assert.ok(container.lookup(`${name}:basic`).create().modals,
      `Should have the modals service injected on ${name}s`);

  });

  assert.ok(container.lookup('component:linkTo').modals,
    'Should have the modal service injected on components');

});
