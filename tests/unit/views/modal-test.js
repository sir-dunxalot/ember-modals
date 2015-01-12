import Em from 'ember';
import { moduleFor, test } from 'ember-qunit';
import resolver from '../../helpers/resolver';

var view;
var contains = QUnit.contains;
var typeOf = QUnit.typeOf;
var isFunction = QUnit.isFunction;

moduleFor('view:modal', 'Modals - Modal View', {
  setup: function() {
    view = this.subject();
  }
});


test('Event triggers', function() {

  ok(view.on,
    'Em.Evented should be mixed in');

  isFunction(view.on,
    'on should be a function');

});


test('Visuals', function() {

  equal(view.get('layoutName'), 'modal',
    'Should have default layoutName');

  isFunction(view.show,
    'Should have a show() method');

  isFunction(view.hide,
    'Should have a hide() method');

  contains(view.get('classNameBindings'), 'visible',
    'visible should be bound to classNames');

  typeOf(view.get('visible'), 'boolean',
    'visible should be a boolean property');

  strictEqual(view.get('visible'), false,
    'visible should default to false');

  view.show();

  strictEqual(view.get('visible'), true,
    'visible should be true after calling show()');

  view.hide();

  strictEqual(view.get('visible'), false,
    'visible should be false after calling hide()');

});


test('Usability', function() {

  ok(view.get('ariaHidden'),
    'ariaHidden should be a property');

  contains(view.get('attributeBindings'), 'ariaHidden:aria-hidden',
    'ariaHidden should be bound to attributes as aria-hidden');

  strictEqual(view.get('ariaHidden'), 'true',
    "ariaHidden should be 'true' by default");

  view.show();

  strictEqual(view.get('ariaHidden'), 'false',
    "ariaHidden should be 'false' after calling show()");

  view.hide();

  strictEqual(view.get('ariaHidden'), 'true',
    "ariaHidden should be 'true' after calling hide()");

  isFunction(view.autofocus,
    'Should have an autofocus function');

});
