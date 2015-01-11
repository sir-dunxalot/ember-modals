import Em from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var contains = QUnit.contains;
var isFunction = QUnit.isFunction;
var typeOf = QUnit.typeOf;
var actionHandled, App, actionArguments, container, controllerTests;

var render = function(templateName, options) {
  handleAction();

  actionArguments = {
    templateName: templateName,
    options: options
  };
};

var disconnectOutlet = function(options) {
  handleAction();

  actionArguments = {
    options: options
  };
}

var handleAction = function() {
  actionHandled = true;
}

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
  var options = controller.get('_options');
  var route = container.lookup('route:application');

  options.set('templateName', 'test-modal');

  visit('/');

  andThen(function() {

    /* Overwrite the functions called in the actions so we can
    test if the action is called successfully */

    route.setProperties({
      render: render,
      disconnectOutlet: disconnectOutlet
    });

    route.send('renderModal', options);

    ok(actionHandled,
      'The renderModal action should be handled by the application route');

    resetAction();

    route.send('removeModal', options);

    ok(actionHandled,
      'The removeModal action should be handled by the application route');

  });
});


/* Define the controllers' tests here  so we can share them
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
and once for calling the hdie() and show() methods directly so
we specify them as variables */

var showTests = function() {

  ok(actionHandled,
    'showModal should send renderModal to the application route');

  ok(actionArguments.templateName && actionArguments.options,
    'showModal shound send options to renderModal in the application route');

}


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

      equal(actionArguments.options.outlet, modal.get('outlet'),
        'closeModal should send options to removeModal in the application route');

      resolve();

    }, transitionDuration + 100);
  });

}

test('Action routing', function() {
  var controller = container.lookup('controller:index');
  var applicationRoute = container.lookup('route:application');
  var modal = controller.get('modal');
  var options = ['controllerName', 'outlet', 'templateName', 'viewName'];
  var templateName = 'test-modal';

  expect(10);

  visit('/');

  andThen(function() {

    applicationRoute.setProperties({
      render: render,
      disconnectOutlet: disconnectOutlet
    });

    /* Test by calling modal methods directly */

    modal.set('templateName', templateName)
    modal.show();

    showTests()
    resetAction();

    modal.hide();

    closeTests(modal).then(function() {
      resetAction();

      /* Test via action on regular controller */

      controller.showModal(templateName);

      showTests();
      resetAction();

      controller.send('closeModal');

      closeTests(modal);
    });

  });
});
