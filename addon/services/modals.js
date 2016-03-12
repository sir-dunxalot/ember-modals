import Ember from 'ember';

const { RSVP } = Ember;

export default Ember.Service.extend(
  Ember.ActionHandler, {

  modalsInDom: null,

  actions: {

    removeModal(modal) {
      this.get('modalsInDom').removeObject(modal);
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

    @event showModal
    @param Object modal The options to render the modal with
    @param Object [context] The targetObject for the component when it's rendered
    */

    showModal(modal, context) {
      let modalObject = modal;

      if (Ember.typeOf(modal) === 'string') {
        modalObject = {
          componentName: modal,
        };

        if (context) {
          modalObject.context = context;
        }
      }

      Ember.assert('You must pass componentName on the object passed to showModal', modalObject.componentName);

      this.get('modalsInDom').addObject(modalObject);
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
