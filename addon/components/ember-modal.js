import Ember from 'ember';
import layout from '../templates/components/ember-modal';

const { RSVP, on, run } = Ember;
const duration = 1000;

export default Ember.Component.extend({
  ariaRole: 'dialog',
  attributeBindings: ['hidden:aria-hidden'],
  classNames: ['ember-modal'],
  classNameBindings: ['hidden:ember-modal-hidden'],
  hidden: true,
  layout,
  modal: null,

  actions: {
    closeModal() {
      this._hide().then(() => {
        this.modals.send('removeModal', this.get('modal'));
      });
    },
  },

  hide() {
    return new RSVP.Promise((resolve) => {
      const animationDuration = parseFloat(this.$().css('transition-duration') || 0);

      run.later(() => {
        resolve();
      }, animationDuration * 1000);
    });
  },

  show() {
    return new RSVP.Promise((resolve) => {
      const animationDuration = parseFloat(this.$().css('transition-duration') || 0);

      run.later(() => {
        resolve();
      }, animationDuration * 1000);
    });
  },

  didInsertElement() {
    this._super(...arguments);
    this._show().then(() => {
      this.$().focus();
    });
  },

  closeWithEscape: on('keyDown', function(event) {
    if (event.which === 27) {
      this.send('closeModal');
    }
  }),

  willDestroy() {
    this.set('ariaHidden', true);
  },

  _hide() {
    return new RSVP.Promise((resolve) => {
      run.next(() => {
        this.set('hidden', true);
        this.get('parentView').send('hide');
      });

      this.hide().then(() => {
        resolve();
      });
    });
  },

  _show() {
    return new RSVP.Promise((resolve) => {
      this.set('hidden', false);
      this.get('parentView').send('show');

      this.show().then(() => {
        resolve();
      });
    });
  }

});
