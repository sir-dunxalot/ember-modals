import defaultFor from 'ember-modals/utils/default-for';
import Em from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

/* QUnit helpers */

var contains = QUnit.contains;
var isFunction = QUnit.isFunction;
var typeOf = QUnit.typeOf;

/* Variables */

var controller = 'modal-one';
var template = 'modals/modal-one';
var templateAlt = 'modals/modal-two';
var model = {
  name: 'Peter Griffin'
};
var view = 'modal-two';

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

// template, controller, model, view
// Check changing model
// Check rendering options

/* Test combinations of modal options without
rendering options */

test('Custom controller', function() {

  visit('/');

  showModal({
    template: template,
    controller: controller
  });

  andThen(function() {
    checkTemplate();
    checkView();
    checkModel();
    checkController(controller);
  });
});


test('Custom model', function() {

  visit('/');

  showModal({
    template: template,
    model: model
  });

  andThen(function() {
    checkTemplate();
    checkView();
    checkModel(model);
    checkController();
  });
});


test('Custom view', function() {

  visit('/');

  showModal({
    template: template,
    view: view
  });

  andThen(function() {
    checkTemplate();
    checkView(view);
    checkModel();
    checkController();
  });
});


test('Custom controller and model', function() {

  visit('/');

  showModal({
    template: template,
    controller: controller,
    model: model
  });

  andThen(function() {
    checkTemplate();
    checkView();
    checkModel(model);
    checkController(controller);
  });
});


test('Custom controller and view', function() {

  visit('/');

  showModal({
    template: template,
    controller: controller,
    view: view
  });

  andThen(function() {
    checkTemplate();
    checkView(view);
    checkModel();
    checkController(controller);
  });
});


test('Custom model and view', function() {

  visit('/');

  showModal({
    template: template,
    model: model,
    view: view
  });

  andThen(function() {
    checkTemplate();
    checkView(view);
    checkModel(model);
    checkController();
  });
});


test('Custom controller, model, and view', function() {

  visit('/');

  showModal({
    template: template,
    controller: controller,
    model: model,
    view: view
  });

  andThen(function() {
    checkTemplate();
    checkView(view);
    checkModel(model);
    checkController(controller);
  });
});


test('Custom template', function() {

  visit('/');

  showModal({
    template: templateAlt
  });

  andThen(function() {
    checkTemplate(templateAlt);
    checkView();
    checkModel();
    checkController();
  });
});


test('Custom template and view', function() {

  visit('/');

  showModal({
    template: templateAlt,
    view: view
  });

  andThen(function() {
    checkTemplate(templateAlt);
    checkView(view);
    checkModel();
    checkController();
  });
});









/* Helper methods */

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
  var constructor = inspect('controller_constructor').text();
  var text;

  name = defaultFor(name, currentRouteName());
  text = name ? name : 'default (a.k.a. the route\'s controller';

  ok(constructor.indexOf(name) > -1,
    'Modal should have the ' + text + ' controller');
};
