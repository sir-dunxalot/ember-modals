import Em from 'ember';
import ifElse from 'ember-modals/utils/computed/if-else';

export default Em.View.extend(
  Em.Evented, {

  /* Options */

  layoutName: 'modal',
  overlayClassName: 'overlay',

  /* Properties */

  ariaHidden: ifElse('visible', 'false', 'true'), // Set as strings
  attributeBindings: ['ariaHidden:aria-hidden', 'aria-label', 'dataTest:data-test', 'tabIndex:tabindex'],
  classNameBindings: ['overlayClassName', 'visible'],
  dataTest: 'modal-overlay',
  transitionDuration: Em.computed.alias('controller.modal.transitionDuration'),
  visible: false,
  escapeKeyCode: 27,
  tabIndex: 1,

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

  closeWithEscape: function(event) {
    if (event.which === this.escapeKeyCode) {
      this.get('controller').send('closeModal', this.get('outlet'));
    }
  }.on('keyDown'),

  /* Misc methods */

  autofocus: function() {
    var inputs = this.$().find('input');

    if (inputs.length) {
      inputs[0].focus();
    } else {
      this.$().focus();
    }
  },

  click: function(event) {
    var _this = this;
    var classNames = [this.get('overlayClassName'), 'modal_wrapper'];
    var targetElement = Em.$(event.target);

    Em.$.each(classNames, function(i, className) {
      if (targetElement.hasClass(className)) {
        _this.get('controller').send('closeModal', _this.get('outlet'));

        return false; // Break loop
      }
    });
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
    var modalController = this.get('controller.modal');

    modalController.on('closeModal', this, function() {
      var outletBeingClosed = modalController.get('_outletBeingClosed');
      var shouldCloseOutlet = outletBeingClosed === this.get('outlet');

      if (!this.get('isDestroying') && shouldCloseOutlet) {
        if (!this.get('isDestroying')) {
          this.hide();
        }
      }
    });
  }.on('willInsertElement'),

});
