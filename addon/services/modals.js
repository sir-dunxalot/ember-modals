import Ember from 'ember';

const { RSVP } = Ember;

export default Ember.Service.extend(
  Ember.ActionHandler, {

  modalsInDom: null,

  actions: {

    removeModal(modal) {
      this.get('modalsInDom').removeObject(modal);
    },

    showModal(componentName, context) {
      this.get('modalsInDom').addObject({
        componentName,
        context,
      });
    },
  },

  clearModals() {
    this.set('modalsInDom', Ember.A());
  },

  init() {
    this._super(...arguments);
    this.modalsInDom = Ember.A();
  },

});
