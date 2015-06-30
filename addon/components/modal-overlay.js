import Ember from 'ember';
import ifElse from 'ember-modals/utils/computed/if-else';
import layout from '../templates/components/modal-overlay';

const { computed } = Ember;

export default Ember.Component.extend(
  Ember.Evented, {

  /* Options */

  layoutName: 'modal',
  overlayClassName: 'overlay',

  /* Properties */

  ariaHidden: ifElse('visible', 'false', 'true'), // Set as strings
  attributeBindings: ['ariaHidden:aria-hidden', 'aria-label', 'dataTest:data-test', 'tabIndex:tabindex'],
  classNameBindings: ['overlayClassName', 'visible'],
  dataTest: 'modal-overlay',
  escapeKeyCode: 27,
  layout: layout,
  outlet: computed.oneWay('_parentView.name'),
  tabIndex: 1,
  transitionDuration: computed.alias('controller.modal.transitionDuration'),
  visible: false,

  actions: {
    closeModal(outlet) {
      this.get('modal').hide(outlet);
    }
  },

  /* Animation methods. If you override these, call this._super()
  in the methods to ensure properties are set correctly */

  hide() {
    this.set('visible', false);
  },

  show() {
    this.set('visible', true);
  },

  closeWithEscape: Ember.on('keyDown', function(event) {
    if (event.which === this.escapeKeyCode) {
      this.send('closeModal', this.get('outlet'));
    }
  }),

  /* Misc methods */

  autofocus() {
    const inputs = this.$().find('input');

    if (inputs.length) {
      inputs[0].focus();
    } else {
      this.$().focus();
    }
  },

  click(event) {
    const classNames = [this.get('overlayClassName'), 'modal-wrapper'];
    const targetElement = $(event.target);

    $.each(classNames, function(i, className) {
      if (targetElement.hasClass(className)) {
        this.send('closeModal', _this.get('outlet'));

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
    const modalService = this.get('modal');

    modalService.on('closeModal', this, function() {
      const outletBeingClosed = modalService.get('_outletBeingClosed');
      const shouldCloseOutlet = outletBeingClosed === this.get('outlet');

      if (!this.get('isDestroying') && shouldCloseOutlet) {
        if (!this.get('isDestroying')) {
          this.hide();
        }
      }
    });
  }),

});
