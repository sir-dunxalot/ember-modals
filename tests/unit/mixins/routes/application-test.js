import ApplicationRouteMixin from 'ember-modals/mixins/routes/application';
import Ember from 'ember';
import { test } from 'ember-qunit';

var contains = QUnit.contains;
var isFunction = QUnit.isFunction;
var App, container;

module('Modals - Application route mixin');

test('Actions hash', function() {

  var TestClass = Ember.Object.extend(ApplicationRouteMixin);
  var testClassInstance = TestClass.create();
  var actions = testClassInstance.actions;

  ok(testClassInstance,
    'The test object should be created without errors');

  isFunction(actions.renderModal,
    'The test object should be created with a renderModal action');

  isFunction(actions.removeModal,
    'The test object should be created with a removeModal action');

});

