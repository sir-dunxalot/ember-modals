import Em from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { initialize } from 'ember-modals/initializers/modals';

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

test('Reopening Em.ControllerMixin', function() {
  var modalMixin = Em.A(Em.ControllerMixin.mixins).find(function(mixin) {
    var properties = mixin.properties;

    if (properties) {
      return properties.modal;
    } else {
      return false;
    }
  });

  var controllerProxy;

  ok(modalMixin,
    'Mixin for modals should be added to Em.ControllerMixin');

  controllerProxy = Em.Object.create(modalMixin.properties);

  ok(controllerProxy.get('modal'),
    'Controller mixin should have a modal property');

  contains(Em.A(controllerProxy.get('needs')), 'modal',
    'Controller mixin should need modal controller');

  isFunction(controllerProxy.showModal,
    'Controller mixin should have showModal function');

  isFunction(controllerProxy.get('_actions').closeModal,
    'Controller mixin should have closeModal action');

});

