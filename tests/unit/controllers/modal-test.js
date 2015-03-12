import Em from 'ember';
import { moduleFor, test } from 'ember-qunit';

var controller;
var isFunction = QUnit.isFunction;

moduleFor('controller:modal', 'Modals - Modal Controller', {
  setup: function() {
    controller = this.subject();
  }
});


test('Event triggers', function(assert) {

  assert.ok(controller.trigger,
    'Em.Evented should be mixed in');

  isFunction(controller.trigger,
    'trigger should be a function');

});


test('Default properties', function(assert) {
  var properties = ['controller', 'model', 'template', 'view'];
  var options = [
    'defaultOutlet',
    'defaultParentView',
    'defaultView',
    'transitionDuration'
  ];

  assert.expect(9);

  properties.forEach(function(key) {
    assert.strictEqual(controller.get(key), null,
      key + ' should be null');
  });

  options.forEach(function(option) {
    assert.ok(controller.get(option),
      'Should have a default value for the ' + option + ' option');
  });

  assert.ok(controller.get('_previousRelationships'),
    'Should have a _previousRelationships property');

});


test('Animation methods', function(assert) {

  isFunction(controller.hide,
    'Should have a hide method');

  isFunction(controller.show,
    'Should have a show method');

});
