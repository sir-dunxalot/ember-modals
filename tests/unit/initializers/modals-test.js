import Em from 'ember';
import { initialize } from 'ember-modals/initializers/modals';
import { test } from 'ember-qunit';
import { module } from 'qunit';

var contains = QUnit.contains;
var isFunction = QUnit.isFunction;
var App, container;

module('Modals - Modal initializer', {
  setup: function() {
    Em.run(function() {
      App = Em.Application.create();
      container = App.__container__;
      App.deferReadiness();
    });

    initialize(container, App);
  },

  destroy: function() {
    Em.run(App, 'destroy');
  }
});

test('Reopening Em.ControllerMixin', function(assert) {
  var modalMixin = Em.A(Em.ControllerMixin.mixins).find(function(mixin) {
    var properties = mixin.properties;

    if (properties) {
      return properties.modal;
    } else {
      return false;
    }
  });

  var controllerProxy;

  assert.ok(modalMixin,
    'Mixin for modals should be added to Em.ControllerMixin');

  controllerProxy = Em.Object.create(modalMixin.properties);

  assert.ok(controllerProxy.get('modal'),
    'Controller mixin should have a modal property');

  contains(Em.A(controllerProxy.get('needs')), 'modal',
    'Controller mixin should need modal controller');

  isFunction(controllerProxy.showModal,
    'Controller mixin should have showModal function');

  isFunction(controllerProxy.get('_actions').closeModal,
    'Controller mixin should have closeModal action');

});

