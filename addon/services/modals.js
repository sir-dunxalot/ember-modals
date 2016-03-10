import Ember from 'ember';

const { RSVP } = Ember;

export default Ember.Service.extend({
  modalsInDom: null,

  animateHideModal() {
    return new RSVP.Promise((resolve) => {
      resolve();
    });
  },

  animateShowModal() {
    return new RSVP.Promise(() => {
      resolve();
    });
  },

  clearModals() {

  },

  init() {
    this._super(...arguments);
    this.modalsInDom = [];
  },

  hideModal(componentName) {
    this.animateHideModal().then(() => {

    });
  },

  showModal(componentName, context) {
    this.modalsInDom.addObject({
      componentName,
      context,
    });
    // const container = this.get('container');
    // const component = container.lookup(`component:${componentName}`);
  },

});
