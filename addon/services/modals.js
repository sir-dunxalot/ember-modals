import Ember from 'ember';

const { RSVP } = Ember;

export default Ember.Service.extend(
  Ember.ActionHandler, {

  modalsInDom: null,

  actions: {

    removeModal(modalObject) {
      this.get('modalsInDom').removeObject(modalObject);
    },

    showModal(componentName, context) {
      this.get('modalsInDom').addObject({
        componentName,
        context,
      });
    },
  },

  clearModals() {

  },

  init() {
    this._super(...arguments);
    this.modalsInDom = Ember.A();
  },

});
