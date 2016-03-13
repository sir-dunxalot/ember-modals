import Ember from 'ember';
import layout from '../templates/components/ember-modal';

const { RSVP, on, run } = Ember;
const className = 'ember-modal';

export default Ember.Component.extend({
  ariaRole: 'dialog',
  attributeBindings: ['hidden:aria-hidden', 'tabIndex'],
  classNames: [className],
  classNameBindings: [`hidden:${className}-hidden`],
  hidden: true,
  layout,
  modal: null,
  showCloseButton: false,
  tabIndex: 1,
  tagName: 'section',

  _animationDuration: 0,

  actions: {
    closeModal() {
      this._hide().then(() => {
        const modalsService = this.modals || this.get('modal.context').modals; // For testing

        modalsService.send('removeModal', this.get('modal'));
      });
    },
  },

  hide() {
    return new RSVP.Promise((resolve) => {
      run.later(() => {
        resolve();
      }, this.get('_animationDuration'));
    });
  },

  show() {
    return new RSVP.Promise((resolve) => {
      run.later(() => {
        resolve();
      }, this.get('_animationDuration'));
    });
  },

  didRender() {
    this._super(...arguments);

    /* wrap in scheduleOnce to avoid setting
    properties in the didInsertElement hook*/

    run.scheduleOnce('afterRender', () => {
      const parentView = this.get('parentView');
      const transitionDuration = this.$().css('transition-duration');
      const animationDuration = parseFloat(transitionDuration || 0) * 1000;

      this.set('_animationDuration', animationDuration);

      this._show().then(() => {
        const $this = this.$();

        /* Wrap in an if ($this) for testing */

        if ($this) {
          $this[0].focus();
        }
      });

      parentView.$().click((event) => {

        /* Don't let a click on a child of the overlay
        close the overlay */

        if (event.target === parentView.get('element')) {
          this.send('closeModal');
        }
      });
    });
  },

  keyUp(event) {
    if (event.which === 27) {
      this.send('closeModal');
    }
  },

  willDestroy() {
    this.set('ariaHidden', true);
  },

  _hide() {
    return new RSVP.Promise((resolve) => {
      this.set('hidden', true);
      this.get('parentView').send('hide');

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
