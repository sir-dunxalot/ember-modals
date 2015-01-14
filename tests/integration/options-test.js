import defaultFor from 'ember-modals/utils/default-for';
import Em from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

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

/* Each of the below methods checks the given component of the
modal. If an option is passed, it checks that the given option
is set on the modal. If no option is passed it checks that the
default option is set on the modal */

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

  name = defaultFor(name, defaultView);
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
  name = defaultFor(name, defaultOutlet);

  equal(inspect('outlet_name').text().trim(), name,
    'Modal should be rendered into the ' + name + ' outlet');

};

var checkParentView = function(name) {
  var actualName = inspect('parent_view_name').text().trim();

  name = defaultFor(name, defaultParentView);

  equal(name, actualName,
    'The modal\'s outlet should have the ' + name + ' parent view');

};
