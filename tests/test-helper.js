import Ember from 'ember';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

QUnit.extend(QUnit, {

  contains: function(arrayOrString, item, message) {
    QUnit.assert.ok(arrayOrString.indexOf(item) > -1, message);
  },

  isFunction: function(name, message) {
    QUnit.assert.equal(Ember.typeOf(name), 'function', message);
  },

  typeOf: function(name, type, message) {
    QUnit.assert.equal(Ember.typeOf(name), type, message);
  },

});
