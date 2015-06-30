import Ember from 'ember';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

window.QUnit.extend(window.QUnit, {

  contains: function(arrayOrString, item, message) {
    window.QUnit.assert.ok(arrayOrString.indexOf(item) > -1, message);
  },

  isFunction: function(name, message) {
    window.QUnit.assert.equal(Ember.typeOf(name), 'function', message);
  },

  typeOf: function(name, type, message) {
    window.QUnit.assert.equal(Ember.typeOf(name), type, message);
  },

});
