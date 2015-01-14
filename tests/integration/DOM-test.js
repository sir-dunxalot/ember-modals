import Em from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App, container;
var templateName = 'modals/modal-one';
var templateNameTwo = 'modals/modal-two';

module('Modals - DOM', {

  setup: function() {
    App = startApp();
    container = App.__container__;
  },

  teardown: function() {
    Em.run(App, 'reset');
  }

});


test('Default modal layout', function() {
  var controller = container.lookup('controller:index');
  var falseDuration = 1234;
  var viewConstructor = container.lookup('view:modal');

  expect(11);

  visit('/');

  andThen(function() {
    ok(!inspect('overlay', false),
      'Modal should not be in DOM before it is shown');

    /* Set some false duration so we can check if the CP
    recalculates once the element is in the DOM */

    controller.set('modal.transitionDuration', falseDuration);
  });

  showModal(templateName);

  andThen(function() {
    var overlay = inspect('overlay');
    var modal = inspect('content');

    notEqual(controller.get('modal.transitionDuration'), falseDuration,
      'transitionDuration should have new value based on CSS transition duration');

    /* Overlay element that wraps the visible modal */

    ok(inspect('overlay', false),
      'Overlay should be in DOM once it is shown');

    ok(overlay.hasClass(viewConstructor.get('overlayClassName')),
      'Overlay should have overlayClassName');

    ok(overlay.hasClass('visible'),
      'Overlay should have class of visible');

    equal(overlay.attr('aria-hidden'), 'false',
      'Overlay should have attribute of aria-hidden="false"');

    /* Modal element that houses main modal content */

    ok(inspect('content', false),
      'Modal element should be rendered in modal layout');

    equal(inspect('content').attr('role'), 'dialog',
      'Modal element should have role="dialog"');

    ok(modal.hasClass('modal'),
      'Modal should have class of modal');

    ok(inspect('title', false),
      'Modal should render the ' + templateName + ' template in the modal layout');

  });

  asyncClick('close');

  andThen(function() {

    ok(!inspect('overlay', false),
      'modal should be removed from template after clicking the close button');

  });

});


test('Custom modal template - string argument', function() {

  visit('/');

  showModal(templateNameTwo);

  andThen(function() {

    ok(inspect('title-two', false),
      'Second modal template should be rendered in the modal view');

  });
});


test('Custom modal template - object argument', function() {

  visit('/');

  showModal({
    template: templateNameTwo
  });

  andThen(function() {

    ok(inspect('title-two', false),
      'Second modal template should be rendered in the modal view');

  });
});


test('Custom modal model', function() {
  var name = 'hello';

  visit('/');

  showModal({
    template: templateName,
    model: { name: name }
  });

  andThen(function() {

    equal(inspect('model-name').text(), name,
      'Modal template should have access to the modal model');

  });
});


test('Close button', function() {

  visit('/');

  showModal(templateName);

  andThen(function() {

    var closeButton = inspect('close');

    ok(closeButton,
      'Modal layout should have a close button');

  });

  asyncClick('close');

  andThen(function() {

    ok(!inspect('close', false),
      'Clicking the close button should remove modal layout from DOM');

  });

});
