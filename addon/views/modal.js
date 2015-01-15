import Em from 'ember';
import ifElse from 'ember-modals/utils/computed/if-else';

export default Em.View.extend(
  Em.Evented, {

  /* Options */

  layoutName: 'modal',
  overlayClassName: 'overlay',

  /* Properties */

  ariaHidden: ifElse('visible', 'false', 'true'), // Set as strings
  attributeBindings: ['ariaHidden:aria-hidden', 'aria-label', 'dataTest:data-test'],
  classNameBindings: ['overlayClassName', 'visible'],
  dataTest: 'modal-overlay',
  transitionDuration: Em.computed.alias('controller.modal.transitionDuration'),
  visible: false,

  outlet: function() {
    return this.get('_parentView.name');
  }.property(),

  /* Animation methods. If you override these, call this._super()
  in the methods to ensure properties are set correctly */

  hide: function() {
    this.set('visible', false);
  },

  show: function() {
    this.set('visible', true);
  },

  /* Misc methods */

  autofocus: function() {
    var inputs = this.$().find('input');

    if (inputs.length) {
      inputs[0].focus();
    }
  },

  setTransitionDuration: function() {
    var modal = this.$('[role="dialog"]');
    var ms = parseFloat(modal.css('transition-duration')) * 1000;

    if (ms) {
      this.set('transitionDuration', ms);
    }
  }.on('didInsertElement'),

  setup: function() {
    this.show();
    this.autofocus();
  }.on('didInsertElement'),

  /* Private methods */

  _listen: function() {
    this.get('controller.modal').on('closeModal', this, function() {
      var outletBeingClosed = this.get('controller.modal._outletBeingClosed');
      var shouldCloseOutlet = outletBeingClosed === this.get('outlet');

      if (!this.get('isDestroying') && shouldCloseOutlet) {
        if (!this.get('isDestroying')) {
          this.hide();
        }
      }
    });
  }.on('willInsertElement'),

});
