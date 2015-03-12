import Em from 'ember';

export default {
  name: 'modals',

  initialize: initialize
};

export function initialize(container, app) {

  Em.ControllerMixin.reopen({
    modal: Em.computed.alias('controllers.modal'),
    needs: ['modal'],

    _actions: {
      closeModal: function(outlet) {
        this.get('modal').hide(outlet);
      }
    },

    showModal: function(options, renderingOptions) {
      var modal = this.get('modal');
      var optionsIsString = Em.typeOf(options) === 'string';

      if (!options) {
        Em.assert('You must pass options or a template name to the showModal() method');
      } else {
        Em.assert('You can\'t show a modal without a template name',
          optionsIsString || options['template']);
      }

      /* If options are passed together as a single object... */

      if (optionsIsString) {
        modal.set('template', options);
      } else {
        modal.set('template', options['template']);
      }

      /* Sets value to undefined if they're not set */

      modal.set('controller', options['controller']);
      modal.set('model', options['model']);
      modal.set('view', options['view']);

      /* Auto-call the show function to do rendering */

      this.get('modal').show(renderingOptions);
    }

  });
}
