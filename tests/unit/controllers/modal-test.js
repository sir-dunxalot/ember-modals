import Em from 'ember';
import { moduleFor, test } from 'ember-qunit';

var controller;

moduleFor('controller:modal', 'Modals - Modal Controller', {
  setup: function() {
    controller = this.subject();
  }
});


test('Event triggers', function() {
  ok(controller.trigger, 'Em.Evented should be mixed in');
  equal(typeof controller.trigger, 'function', 'trigger should be a function');
});


test('Default properties', function() {
  var keys = ['controllerName', 'model', 'templateName'];
  var options = ['outlet', 'transitionDuration', 'viewName'];

  keys.forEach(function(key) {
    strictEqual(controller.get(key), null, key + ' should be null');
  });

  options.forEach(function(option) {
    ok(controller.get(option), 'Should have a default value for the ' + option + 'option');
  });

});


test('_options property', function() {
  var _options = Em.Object.create({
    controllerName: controller.get('controllerName'),
    outlet: controller.get('outlet'),
    templateName: controller.get('templateName'),
    viewName: controller.get('viewName')
  });

  ok(controller.get('_options'), 'Should have an _options property');
  propEqual(controller.get('_options'), _options, '_options should return an object of properties required');

  controller.set('outlet', 'test');
  _options.set('outlet', 'test'); // Update what we expect

  propEqual(controller.get('_options'), _options, '_options should reflect new properties');
});


test('Animation methods', function() {
  equal(typeof controller.hide, 'function', 'Should have a hide method');
  equal(typeof controller.show, 'function', 'Should have a show method');
});
