import Em from 'ember';

export default Em.View.extend(
  Em.Evented,
  Em.ViewTargetActionSupport, {

  classNames: ['modal_overlay'],
  classNameBindings: ['showModal:fade_in_modal'],
  layoutName: 'modal',

  showModal: false,
  transitionTime: 300, // Default

  actions: {

    closeModal: function() {
      if (this.get('_state') === 'inDOM') {
        this.set('showModal', false);

        Em.run.later(this, function() {
          this.triggerAction({
            action: 'removeModal', // Action is on the application route
          });


        }, this.get('transitionTime'));

        // return true; // Bubble - NEEDS to delay
      }
    },

  },

  autofocus: function() {
    var inputs = this.$().find('input');

    if (inputs.length) {
      inputs[0].focus();
    }
  }.on('didInsertElement'),

  fadeInModal: function() {
    this.set('showModal', true);
  }.on('didInsertElement'),

  setTransitionTime: function() {
    var ms = parseFloat(this.$().css('transition-duration')) * 1000; // In milliseconds

    this.set('transitionTime', ms);
  }.on('didInsertElement'),

  // watchForExternalCall: function() {
  //   this.get('controller').on('closeModal', this, this._callCloseModal);
  // }.on('willInsertElement'),

  // _callCloseModal: function() {
  //   this.triggerAction({
  //     action: 'closeModal',
  //     target: this
  //   });
  // },

});
