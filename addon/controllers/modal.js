import Em from 'ember';

export default Em.ObjectController.extend(
  Em.Evented, {

  controllerName: null,
  model: null,
  outlet: 'modal',
  templateName: null,
  transitionDuration: 500, // Fallback from CSS value

  _options: function() {
    return Em.Object.create({
      controllerName: this.get('controllerName'),
      outlet: this.get('outlet'),
      templateName: this.get('templateName'),
    });
  }.property('controllerName', 'model', 'templateName'),

  show: function() {
    this.send('renderModal', this.get('_options'));
  },

  hide: function() {
    this.trigger('closeModal');

    Em.run.later(this, function() {
      this.send('removeModal', this.get('_options'));
    }, this.get('transitionDuration'));
  },

});
