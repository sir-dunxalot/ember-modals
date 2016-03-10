import Ember from 'ember';
import layout from '../templates/components/ember-modal';

const { RSVP, run } = Ember;
const duration = 1000;

export default Ember.Component.extend({
  classNames: ['modal-hidden'],
  layout,
  modal: null,

  actions: {
    closeModal() {
      this.hide().then(() => {
        this.modals.send('removeModal', this.get('modal'));
      });
    },
  },

  hide() {
    return new RSVP.Promise((resolve) => {
      this.$().fadeOut(duration);

      run.later(() => {
        resolve();
      }, duration);
    });
  },

  show() {
    return new RSVP.Promise((resolve) => {
      this.$().fadeIn(duration);

      run.later(() => {
        resolve();
      }, duration);
    });
  },

  didInsertElement() {
    this._super(...arguments);
    this.show().then(() => {

    });
  },

});
