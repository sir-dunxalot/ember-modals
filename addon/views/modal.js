import Em from 'ember';

export default Em.View.extend(
  Em.Evented, {

  classNames: ['overlay'],
  classNameBindings: ['isModalVisible:'],
  layoutName: 'modal',
  isModalVisible: false,
  isOverlayVisible: false,
  transitionTime: Em.computed.alias('controller.modal.transitionDuration'),

  show: function() {
    this.set('isModalVisible', true);
  },

  hide: function() {
    this.set('isModalVisible', false);
  },

  autofocus: function() {
    var inputs = this.$().find('input');

    if (inputs.length) {
      inputs[0].focus();
    }
  }.on('didInsertElement'),

  setTransitionTime: function() {
    var ms = parseFloat(this.$().css('transition-duration')) * 1000; // In milliseconds

    if (ms) {
      this.set('transitionDuration', ms);
    }
  }.on('didInsertElement'),

  _listen: function() {
    this.get('controller.modal').on('closeModal', this, this.hide);
  }.on('willInsertElement'),

  _willShow: function() {
    this.$().hide();
    this.show();
  }.on('didInsertElement'),

});
