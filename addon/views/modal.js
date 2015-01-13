import Em from 'ember';
import ifElse from 'ember-modals/utils/computed/if-else';

export default Em.View.extend(
  Em.Evented, {

  ariaHidden: ifElse('visible', 'false', 'true'),
  attributeBindings: ['ariaHidden:aria-hidden', 'aria-label', 'dataTest:data-test'],
  classNameBindings: ['overlayClassName', 'visible'],
  dataTest: 'modal-overlay',
  layoutName: 'modal',
  overlayClassName: 'overlay',
  transitionDuration: Em.computed.alias('controller.modal.transitionDuration'),
  visible: false,

  autofocus: function() {
    var inputs = this.$().find('input');

    if (inputs.length) {
      inputs[0].focus();
    }
  },

  hide: function() {
    this.set('visible', false);
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

  show: function() {
    this.set('visible', true);
  },

  _listen: function() {
    this.get('controller.modal').on('closeModal', this, function() {
      if (!this.get('isDestroying')) {
        this.hide();
      }
    });
  }.on('willInsertElement'),

});
