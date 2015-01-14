import defaultFor from 'ember-modals/utils/default-for';
import Em from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
import {
  checkController,
  checkModel,
  checkTemplate,
  checkView,
  testModal
} from '../helpers/checks';

/* QUnit helpers */

var contains = QUnit.contains;
var isFunction = QUnit.isFunction;
var typeOf = QUnit.typeOf;

/* Variables - use when you want to overwrite the
defaults. Each of these are reliant on real files in
the dummy app and the files' content */

var controller = 'modal-one';
var template = 'modals/modal-one';
var templateAlt = 'modals/modal-two';
var model = {
  name: 'Peter Griffin'
};
var outlet = 'modal-two';
var outletAlt = 'modal-on-index';
var parentViewAlt = 'index';
var view = 'modal-two';

var App, container, defaultOutlet, defaultView, defaultParentView;

/* Define the testing module */

module('Modals - Using options with API', {

  setup: function() {
    var modalController;

    App = startApp();
    container = App.__container__;

    modalController = container.lookup('controller:modal');

    defaultOutlet = modalController.get('defaultOutlet');
    defaultView = modalController.get('defaultView');
    defaultParentView = modalController.get('defaultParentView');
  },

  teardown: function() {
    Em.run(App, 'reset');
  }

});

/* Set different combinations of modal options. Template
is automatically added unless otherwise defined */

var variationsToTest = [
  {
    options: { controller: controller },
  }, {
    options: { model: model }
  }, {
    options: { view: view }
  }, {
    options: { controller: controller, model: model }
  }, {
    route: 'array-controller',
    options: { controller: controller, model: model }
  }, {
    options: { controller: controller, view: view }
  }, {
    options: { model: model, view: view }
  }, {
    options: { controller: controller, model: model, view: view }
  }, {
    options: { template: templateAlt }
  }, {
    options: { template: templateAlt, view: view }
  }, {
    route: 'array-controller',
    options: { template: templateAlt }
  }, {
    route: 'array-controller',
    options: { template: templateAlt, view: view }
  }, {
    renderingOptions: { outlet: outlet }
  }, {
    renderingOptions: { outlet: outlet, view: view }
  }, {
    renderingOptions: { outlet: outletAlt, parentView: parentViewAlt }
  }, {
    options: { controller: controller },
    renderingOptions: { outlet: outletAlt, parentView: parentViewAlt }
  }, {
    options: { model: model },
    renderingOptions: { outlet: outletAlt, parentView: parentViewAlt }
  }, {
    options: { view: view },
    renderingOptions: { outlet: outletAlt, parentView: parentViewAlt }
  }, {
    options: { controller: controller, model: model, view: view },
    renderingOptions: { outlet: outletAlt, parentView: parentViewAlt }
  }

];

/* Run the tests for each variation */

variationsToTest.forEach(function(variation) {
  var description = 'Custom ';
  var route = defaultFor(variation.route, '/');

  /* Build up the description */

  for (var option in variation.options) {
    description += option + ', ';
  }

  for (var option in variation.renderingOptions) {
    description += option + ', ';
  }

  /* Set the template - hackyyyyy */

  if (!variation.options) {
    variation.options = {};
    variation.options.template = template;
  } else if (!variation.options.template) {
    variation.options.template = template;
  }

  /* Run the test */

  test(description, function() {

    expect(6);

    visit(route);

    showModal(variation.options, variation.renderingOptions);

    andThen(function() {
      testModal(variation.options, variation.renderingOptions);
    });
  });
});
