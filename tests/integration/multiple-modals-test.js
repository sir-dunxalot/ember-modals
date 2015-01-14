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


test('Changing between outlets on the same route', function() {
  var options = {
    template: 'modals/modal-one'
  };

  var renderingOptions = {
    outlet: 'modal-two'
  }

  expect(12);

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


test('Changing between outlets on different views', function() {
  var options = {
    template: 'modals/modal-one'
  };

  var renderingOptions = {
    outlet: 'modal-on-index',
    parentView: 'index'
  }

  expect(12);

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


test('Showing two modals at the same time', function() {
  var options = {
    template: 'modals/modal-one'
  };

  var optionsAlt = {
    template: 'modals/modal-two'
  }

  var renderingOptions = {
    outlet: 'modal-on-index',
    parentView: 'index'
  }

  expect(19);

  visit('/');

  showModal(options);

  andThen(function() {
    testModal(options);
  });

  showModal(optionsAlt, renderingOptions);

  andThen(function() {
    testModal(optionsAlt, renderingOptions);
  });

  asyncClick('close');

  andThen(function() {

    ok(inspect('close', false),
      'Should still be one close button in the DOM');

    /* Original modal should still be in the DOM */

    testModal(options);

  });
});
