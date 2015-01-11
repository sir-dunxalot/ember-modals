import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

QUnit.extend(QUnit, {

  contains: function(array, item, message) {
    ok(array.indexOf(item) > -1, message);
  },

  isFunction: function(name, message) {
    equal(typeof name, 'function', message);
  },

  typeOf: function(name, type, message) {
    equal(typeof name, type, message);
  },

});

QUnit.config.urlConfig.push({ id: 'nocontainer', label: 'Hide container'});
// var containerVisibility = QUnit.urlParams.nocontainer ? 'hidden' : 'visible';
var containerVisibility = 'hidden';
document.getElementById('ember-testing-container').style.visibility = containerVisibility;
