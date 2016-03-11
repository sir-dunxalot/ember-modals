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
      console.log('here');
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

  didRender() {
    this._super(...arguments);

    /* wrap in scheduleOnce to avoid setting
    properties in the didInsertElement hook*/

    run.scheduleOnce('afterRender', this, function() {
      this._show().then(() => {
        this.$().focus();
      });

      const parentView = this.get('parentView');

      parentView.$().click((event) => {

        /* Don't let a click on a child of the overlay
        close the overlay */

        if (event.target === parentView.get('element')) {
          this.send('closeModal');
        }
      });
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
      // run.next(() => {
        this.set('hidden', true);
        this.get('parentView').send('hide');
      // });

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
