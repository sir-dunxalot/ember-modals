import Ember from 'ember';
import ifElse from 'ember-modals/utils/computed/if-else';

const {
  computed,
  $,
} = Ember;

export default Ember.View.extend(
  Ember.Evented, {

  /* Options */

  layoutName: 'modal',
  overlayClassName: 'overlay',

  /* Properties */

  ariaHidden: ifElse('visible', 'false', 'true'), // Set as strings
  attributeBindings: ['ariaHidden:aria-hidden', 'aria-label', 'dataTest:data-test', 'tabIndex:tabindex'],
  classNameBindings: ['overlayClassName', 'visible'],
  dataTest: 'modal-overlay',
  transitionDuration: computed.alias('controller.modal.transitionDuration'),
  visible: false,
  escapeKeyCode: 27,
  tabIndex: 1,

  outlet: Ember.computed(function() {
    return this.get('_parentView.name');
  }),

  /* Animation methods. If you override these, call this._super()
  in the methods to ensure properties are set correctly */

  hide: function() {
    this.set('visible', false);
  },

  show: function() {
    this.set('visible', true);
  },

  closeWithEscape: Ember.on('keyDown', function(event) {
    if (event.which === this.escapeKeyCode) {
      this.get('controller').send('closeModal', this.get('outlet'));
    }
  }),

  /* Misc methods */

  autofocus: function() {
    const inputs = this.$().find('input');

    if (inputs.length) {
      inputs[0].focus();
    } else {
      this.$().focus();
    }
  },

  click: function(event) {
    const classNames = [this.get('overlayClassName'), 'modal-wrapper'];
    const targetElement = $(event.target);

    $.each(classNames, function(i, className) {
      if (targetElement.hasClass(className)) {
        this.get('controller').send('closeModal', _this.get('outlet'));

        return false; // Break loop
      }
    }, this);
  },

  setTransitionDuration: Ember.on('didInsertElement', function() {
    const modal = this.$('[role="dialog"]');
    const ms = parseFloat(modal.css('transition-duration')) * 1000;

    if (ms) {
      this.set('transitionDuration', ms);
    }
  }),

  setup: Ember.on('didInsertElement', function() {
    this.show();
    this.autofocus();
  }),

  /* Private methods */

  _listen: Ember.on('willInsertElement', function() {
    const modalController = this.get('controller.modal');

    modalController.on('closeModal', this, function() {
      const outletBeingClosed = modalController.get('_outletBeingClosed');
      const shouldCloseOutlet = outletBeingClosed === this.get('outlet');

      if (!this.get('isDestroying') && shouldCloseOutlet) {
        if (!this.get('isDestroying')) {
          this.hide();
        }
      }
    });
  }),

});
