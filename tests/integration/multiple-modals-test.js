import Ember from 'ember';
import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import { module } from 'qunit';
import { testModal } from '../helpers/modal-tests';

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
    Ember.run(App, 'reset');
  }

});


test('Changing between outlets on the same route', function(assert) {
  var options = {
    template: 'modals/modal-one'
  };

  var renderingOptions = {
    outlet: 'modal-two'
  };

  assert.expect(12);

  visit('/');

  showModal(options);

  andThen(function() {
    testModal(assert, options);
  });

  asyncClick('close');

  showModal(options, renderingOptions);

  andThen(function() {
    testModal(assert, options, renderingOptions);
  });
});


test('Changing between outlets on different views', function(assert) {
  var options = {
    template: 'modals/modal-one'
  };

  var renderingOptions = {
    outlet: 'modal-on-index',
    parentView: 'index'
  };

  assert.expect(12);

  visit('/');

  showModal(options);

  andThen(function() {
    testModal(assert, options);
  });

  asyncClick('close');

  showModal(options, renderingOptions);

  andThen(function() {
    testModal(assert, options, renderingOptions);
  });
});


test('Showing two modals at the same time', function(assert) {
  var options = {
    template: 'modals/modal-one'
  };

  var optionsAlt = {
    template: 'modals/modal-two'
  };

  var renderingOptions = {
    outlet: 'modal-on-index',
    parentView: 'index'
  };

  assert.expect(19);

  visit('/');

  showModal(options);

  andThen(function() {
    testModal(assert, options);
  });

  showModal(optionsAlt, renderingOptions);

  andThen(function() {
    testModal(assert, optionsAlt, renderingOptions);
  });

  asyncClick('close');

  andThen(function() {

    assert.ok(inspect('close', false),
      'Should still be one close button in the DOM');

    /* Original modal should still be in the DOM */

    testModal(assert, options);

  });
});
