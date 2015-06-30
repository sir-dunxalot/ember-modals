import Ember from 'ember';

const {
  assert,
  computed,
} = Ember;

export function initialize(/* container, app */) {

  Ember.ControllerMixin.reopen({
    modal: computed.alias('controllers.modal'),
    needs: ['modal'],

    _actions: {
      closeModal: function(outlet) {
        this.get('modal').hide(outlet);
      }
    },

    showModal: function(options, renderingOptions) {
      const modal = this.get('modal');
      const optionsIsString = Ember.typeOf(options) === 'string';

      if (!options) {
        assert('You must pass options or a template name to the showModal() method');
      } else {
        assert('You can\'t show a modal without a template name',
          optionsIsString || options.template);
      }

      /* If options are passed together as a single object... */

      if (optionsIsString) {
        modal.set('template', options);
      } else {
        modal.set('template', options.template);
      }

      /* Sets value to undefined if they're not set */

      modal.setProperties({
        controller: options.controller,
        model: options.model,
        view: options.view,
      });

      /* Auto-call the show function to do rendering */

      this.get('modal').show(renderingOptions);
    }

  });
}

export default {
  name: 'modals',
  initialize: initialize
};
