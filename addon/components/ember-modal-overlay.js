import Ember from 'ember';
import layout from '../templates/components/ember-modal-overlay';

export default Ember.Component.extend({
  classNameBindings: ['hidden:ember-modal-overlay-hidden'],
  classNames: ['ember-modal-overlay'],
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
