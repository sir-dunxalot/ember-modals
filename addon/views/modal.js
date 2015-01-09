import Em from 'ember';

export default Em.View.extend(
  Em.Evented, {

  classNameBindings: ['overlayClassName', 'visible'],
  layoutName: 'modal',
  visible: false,
  overlayClassName: 'overlay',
  transitionTime: Em.computed.alias('controller.modal.transitionDuration'),

  show: function() {
    this.set('visible', true);
  },

  hide: function() {
    this.set('visible', false);
  },

  autofocus: function() {
    var inputs = this.$().find('input');

    if (inputs.length) {
      inputs[0].focus();
    }
  }.on('didInsertElement'),

  setTransitionTime: function() {
    var modal = this.$('.modal');
    var ms = parseFloat(modal.css('transition-duration')) * 1000;

    if (ms) {
      this.set('transitionDuration', ms);
    }
  }.on('didInsertElement'),

  _listen: function() {
    this.get('controller.modal').on('closeModal', this, function() {
      if (!this.get('isDestroying')) {
        this.hide();
      }
    });
  }.on('willInsertElement'),

  _willShow: function() {
    this.show();
  }.on('didInsertElement'),

});
