import Ember from 'ember';
import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import { module } from 'qunit';

var App, container;
var templateName = 'modals/modal-one';
var templateNameTwo = 'modals/modal-two';

module('Modals - DOM', {

  setup: function() {
    App = startApp();
    container = App.__container__;
  },

  teardown: function() {
    Ember.run(App, 'reset');
  }

});


test('Default modal layout', function(assert) {
  var controller = container.lookup('controller:index');
  var falseDuration = 1234;
  var viewConstructor = container.lookup('view:modal');

  assert.expect(11);

  visit('/');

  andThen(function() {
    assert.ok(!inspect('overlay', false),
      'Modal should not be in DOM before it is shown');

    /* Set some false duration so we can check if the CP
    recalculates once the element is in the DOM */

    controller.set('modal.transitionDuration', falseDuration);
  });

  showModal(templateName);

  andThen(function() {
    var overlay = inspect('overlay');
    var modal = inspect('content');

    assert.notEqual(controller.get('modal.transitionDuration'), falseDuration,
      'transitionDuration should have new value based on CSS transition duration');

    /* Overlay element that wraps the visible modal */

    assert.ok(inspect('overlay', false),
      'Overlay should be in DOM once it is shown');

    assert.ok(overlay.hasClass(viewConstructor.get('overlayClassName')),
      'Overlay should have overlayClassName');

    assert.ok(overlay.hasClass('visible'),
      'Overlay should have class of visible');

    assert.equal(overlay.attr('aria-hidden'), 'false',
      'Overlay should have attribute of aria-hidden="false"');

    /* Modal element that houses main modal content */

    assert.ok(inspect('content', false),
      'Modal element should be rendered in modal layout');

    assert.equal(inspect('content').attr('role'), 'dialog',
      'Modal element should have role="dialog"');

    assert.ok(modal.hasClass('modal'),
      'Modal should have class of modal');

    assert.ok(inspect('title', false),
      'Modal should render the ' + templateName + ' template in the modal layout');

  });

  asyncClick('close');

  andThen(function() {

    assert.ok(!inspect('overlay', false),
      'modal should be removed from template after clicking the close button');

  });

});


test('Custom modal template - string argument', function(assert) {

  visit('/');

  showModal(templateNameTwo);

  andThen(function() {

    assert.ok(inspect('title-two', false),
      'Second modal template should be rendered in the modal view');

  });
});


test('Custom modal template - object argument', function(assert) {

  visit('/');

  showModal({
    template: templateNameTwo
  });

  andThen(function() {

    assert.ok(inspect('title-two', false),
      'Second modal template should be rendered in the modal view');

  });
});


test('Custom modal model', function(assert) {
  var name = 'hello';

  visit('/');

  showModal({
    template: templateName,
    model: { name: name }
  });

  andThen(function() {

    assert.equal(inspect('model-name').text().trim(), name,
      'Modal template should have access to the modal model');

  });
});


test('Close button', function(assert) {

  visit('/');

  showModal(templateName);

  andThen(function() {
    var closeButton = inspect('close');

    assert.ok(closeButton,
      'Modal layout should have a close button');

  });

  asyncClick('close');

  andThen(function() {

    assert.ok(!inspect('close', false),
      'Clicking the close button should remove modal layout from DOM');

  });

});
