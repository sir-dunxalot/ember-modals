import Ember from 'ember';
import layout from '../templates/components/ember-modal-overlay';

const className = 'ember-modal-overlay';

export default Ember.Component.extend({
  classNameBindings: [`hidden:${className}-hidden`],
  classNames: [className],
  hidden: true,
  layout,

  actions: {
    hide() {
      this.set('hidden', true);
    },

    show() {
      this.set('hidden', false);
    },
  },

});
