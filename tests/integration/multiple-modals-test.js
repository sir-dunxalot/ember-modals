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

var App, container;

module('Modals - Using multiple modals', {

  setup: function() {
    App = startApp();
    container = App.__container__;
  },

  teardown: function() {
    Em.run(App, 'reset');
  }

});


test('Changing between outlets', function() {
  var options = {
    template: 'modals/modal-one'
  };

  var renderingOptions = {
    outlet: 'modal-on-index',
    parentView: 'index'
  }

  visit('/');

  showModal(options);

  andThen(function() {
    testModal(options);
  });

  asyncClick('close');

  showModal(options, renderingOptions);

  andThen(function() {
    testModal(options, renderingOptions);
  });
});
