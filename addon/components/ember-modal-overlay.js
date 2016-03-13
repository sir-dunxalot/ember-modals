import Ember from 'ember';
import layout from '../templates/components/ember-modal-overlay';

const className = 'ember-modal-overlay';

export default Ember.Component.extend({
  classNameBindings: [`hidden:${className}-hidden`],
  classNames: [className],
  hidden: true,
  layout,
  modal: null,

  actions: {
    didHideModal() {
      this.set('hidden', true);
    },

    didShowModal() {
      this.set('hidden', false);
    },
  },

});
