import Em from 'ember';

export default Em.ObjectController.extend(
  Em.TargetActionSupport, {

  controllerName: null,
  model: null,
  outlet: 'modal',
  templateName: null,

  modalOptions: function() {
    return Em.Object.create({
      controllerName: this.get('controllerName'),
      model: this.get('model'),
      templateName: this.get('templateName')
    });
  }.property('controllerName', 'model', 'templateName'),

  show: function() {
    this.triggerAction({
      action: 'renderModal',
      actionContext: this.get('modalOptions')
    });
  },

  hide: function() {
    this.triggerAction({
      action: 'removeModal'
    });
  },

});
