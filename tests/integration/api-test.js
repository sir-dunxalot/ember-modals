import Em from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

/* QUnit helpers */

var contains = QUnit.contains;
var isFunction = QUnit.isFunction;
var typeOf = QUnit.typeOf;

/* Variables */
var templateName = 'modals/modal-one';

var actionHandled, App, actionArguments, container, controllerTests;

/* For overwriting class methods with custom functions */

var disconnectOutlet = function(options) {
  handleAction();

  actionArguments = {
    options: options
  };
};

var render = function(templateName, options) {
  handleAction();

  actionArguments = {
    templateName: templateName,
    options: options
  };
};

/* Action helpers */

var handleAction = function() {
  actionHandled = true;
};

var resetAction = function() {
  actionHandled = false;
  actionArguments = {};
};

module('Modals - Additions to API', {

  setup: function() {
    App = startApp();
    container = App.__container__;
    resetAction();
  },

  teardown: function() {
    Em.run(App, 'reset');
  }

});


test('Application route', function() {
  var controller = container.lookup('controller:modal');
  var route = container.lookup('route:application');

  visit('/');

  andThen(function() {

    /* Override methods we know the application route's actions
    will call so we can test whether or not they get called */

    route.setProperties({
      render: render,
      disconnectOutlet: disconnectOutlet
    });

    route.send('renderModal', {
      template: templateName
    });

    ok(actionHandled,
      'The renderModal action should call render');

    resetAction();

    route.send('removeModal');

    ok(actionHandled,
      'The removeModal action should call disconnectOutlet');

  });
});


/* Define the controllers' tests here so we can share them
between object and array controller tests */

var controllerTests = function(controller) {
  var modalController = controller.get('modal');

  modalController.set('hide', handleAction);

  isFunction(controller.showModal,
    'Controller should have a showModal() method');

  controller.send('closeModal');

  ok(actionHandled,
    'Controller should have a closeModal action');

  ok(modalController,
    'Controller should have a modal property');

  typeOf(modalController, 'instance',
    'Controller\'s modal property should be an instance');

  contains(modalController.get('constructor').toString(), 'controller',
    'Controller\'s modal property should be a controller');

};


test('Object controllers', function() {
  var controller = container.lookup('controller:index');

  expect(5);

  visit('/');

  andThen(function() {
    controllerTests(controller);
  });
});


test('Array controllers', function() {
  var controller = container.lookup('controller:array-controller');

  expect(5);

  visit('array-controller');

  andThen(function() {
    controllerTests(controller);
  });
});

/* We will run showTests and closeTests twice (once for actions
and once for calling the hide() and show() methods directly) so
we specify them as variables */

var showTests = function() {

  ok(actionHandled,
    'showModal should send renderModal to the application route');

  ok(actionArguments.templateName && actionArguments.options,
    'showModal shound send options to renderModal in the application route');

};


var closeTests = function(modal) {

  /* Use a promise so the test waits for the transitionDuration */

  return new Em.RSVP.Promise(function(resolve, reject) {
    var transitionDuration = modal.get('transitionDuration');

    Em.run.later(function() {

      ok(!actionHandled,
        'closeModal should not send renderModal to the application route until after the transitionDuration');

    }, transitionDuration - 10);

    Em.run.later(function() {

      ok(actionHandled,
        'closeModal shound send renderModal to the application route after the transitionDuration');

      equal(actionArguments.options.outlet, modal.get('defaultOutlet'),
        'closeModal should send options to removeModal in the application route');

      resolve();

    }, transitionDuration + 100);
  });

};

test('Action routing', function() {
  var applicationRoute = container.lookup('route:application');
  var controller = container.lookup('controller:index');
  var modal = controller.get('modal');
  var options = ['controller', 'outlet', 'template', 'view'];

  expect(10);

  visit('/');

  andThen(function() {

    /* Override methods we know the application route's actions
    will call so we can test whether or not they get called */

    applicationRoute.setProperties({
      render: render,
      disconnectOutlet: disconnectOutlet
    });

    /* Test by calling modal methods directly */

    modal.set('template', templateName);
    modal.show();

    showTests();
    resetAction();

    modal.hide();

    closeTests(modal);
    resetAction();

  });

  showModal(templateName);

  andThen(function() {
    showTests();
    resetAction();

    controller.send('closeModal');

    closeTests(modal);
  });

});


test('Default controller - string argument', function() {

  visit('array-controller');

  showModal(templateName);

  andThen(function() {
    var routeName = currentRouteName();
    var controller = container.lookup('controller:' + routeName);
    var constructor = controller.get('constructor').toString();

    equal(inspect('controller_constructor').text().trim(), constructor,
      'When no controllerName is passed, the modal template\'s controller should default to the route\'s controller');

  });

});


test('Default controller - object argument', function() {

  visit('array-controller');

  showModal({
    template: templateName
  });

  andThen(function() {
    var routeName = currentRouteName();
    var controller = container.lookup('controller:' + routeName);
    var constructor = controller.get('constructor').toString();

    equal(inspect('controller_constructor').text().trim(), constructor,
      'When no controllerName is passed, the modal template\'s controller should default to the route\'s controller');

  });
});
