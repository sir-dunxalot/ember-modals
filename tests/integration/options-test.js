import defaultFor from 'ember-modals/utils/default-for';
import Em from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

/* QUnit helpers */

var contains = QUnit.contains;
var isFunction = QUnit.isFunction;
var typeOf = QUnit.typeOf;

/* Variables - use when you want to overwrite
the default */

// var choices = {
//   controller: 'model-one',
//   model: {
//     name: 'Peter Griffin',
//   },
//   outlet: 'modal-two',
//   template: 'modals/modal-one',
//   templateAlt: 'modals/modal-two',
//   view: 'modal-two',

//   parentViewAlt: 'index',
//   outletAlt: 'modal-on-index',
// }

var controller = 'modal-one';
var template = 'modals/modal-one';
var templateAlt = 'modals/modal-two';
var model = {
  name: 'Peter Griffin'
};
var view = 'modal-two';

/* Rendering options */

var outlet = 'modal-two';

var outletAlt = 'modal-on-index';
var parentViewAlt = 'index';

var App, container;

module('Modals - Using options with API', {

  setup: function() {
    App = startApp();
    container = App.__container__;
  },

  teardown: function() {
    Em.run(App, 'reset');
  }

});

// Check changing model
// Check rendering options
// Get default options from modal controller
// Add warning for no options

/* Test combinations of modal options without
rendering options. Template is automatically added
unless otherwise defined */

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
    renderingOptions: { outlet: outlet }
  }, {
    renderingOptions: { outlet: outlet, view: view }
  }, {
    renderingOptions: { outlet: outletAlt, parentView: parentViewAlt }
  }

];

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


/* Helper methods */

var testModal = function(options, renderingOptions) {

  /* Allow us to pass no object */

  options = defaultFor(options, {});
  renderingOptions = defaultFor(renderingOptions, {});

  /* Then check each component of the modal */

  checkTemplate(options.template);
  checkView(options.view);
  checkModel(options.model);
  checkController(options.controller);

  checkOutlet(renderingOptions.outlet);
  checkParentView(renderingOptions.parentView);
};

var checkTemplate = function(name) {
  var expectedName, text;

  name = defaultFor(name, template);
  expectedName = name.replace('/', '.');
  text = name ? name : 'default';

  equal(inspect('template_name').text().trim(), expectedName,
    'Modal should have the ' + text + ' template');

};

var checkView = function(name) {
  var expectedName;

  name = defaultFor(name, 'modal');
  expectedName = ':' + name + ':';

  ok(inspect('view_constructor').text().indexOf(expectedName) > -1,
    'Modal should have the ' + name + ' view');

};

var checkModel = function(expectedModel) {
  var name;

  if (expectedModel) {
    name = expectedModel.name;

    equal(inspect('model-name').text().trim(), name,
      'Modal should have a model with name equal to ' + name);

  } else {

    ok(!inspect('model').is(':empty'),
      'The modal should not have a model');

  }

};

var checkController = function(name) {
  var constructor = inspect('controller_constructor').text().trim();
  var text;

  name = defaultFor(name, currentRouteName());
  text = name ? name : 'default (a.k.a. the route\'s controller';

  ok(constructor.indexOf(name) > -1,
    'Modal should have the ' + text + ' controller');
};

var checkOutlet = function(name) {
  name = defaultFor(name, 'modal');

  equal(inspect('outlet_name').text().trim(), name,
    'Modal should be rendered into the ' + name + ' outlet');
};

var checkParentView = function(name) {
  var actualName = inspect('parent_view_name').text().trim();

  name = defaultFor(name, 'application');

  equal(name, actualName,
    'The modal\'s outlet should have the ' + name + ' parent view');
};
