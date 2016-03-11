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
      this.showModal({
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

  /**
  Pass an object  `showModal()` that contains `componentName` (required) plus any numebr of optional params:

  ```js
  showModal({
    componentName: 'modals/welcom', // The modal content component
    context: this, // The targetObject for the modal content component
    modalClassName: 'modal-warning',
    overlayClassName: 'overlay-transparent',
  });
  ```

  @method showModal
  @param Object modal The options to render the modal with
  */

  showModal(modal) {
    Ember.assert('You must pass componentName on the object passed to showModal', modal.componentName);

    this.get('modalsInDom').addObject(modal);
  },

});
