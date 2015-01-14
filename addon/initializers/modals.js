import Em from 'ember';
import defaultFor from '../utils/default-for';

export default {
  name: 'modals',

  initialize: initialize
};

export function initialize(container, app) {
  var applicationRoute = container.lookup('route:application');

  if (applicationRoute) {
    applicationRoute.reopen({

      /* You shouldn't need to call these aciton directly. Use
      show() and hide() on the modal controller */

      _actions: {
        renderModal: function(options) {
          var templateName = options.template;

          delete options.template;

          /* Default to route's controller */

          options.controller = defaultFor(
            options.controller,
            this.get('controller.currentRouteName')
          );

          this.render(templateName, options);
        },

        removeModal: function(outlet, parentView) {
          this.disconnectOutlet({
            outlet: outlet,
            parentView: parentView
          });
        }
      },
    });
  } else {
    Em.warn('Application route was not found so it\'s action hash was not reopened. If you are in a unit test you can ignore this warning.');
  }

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

      Em.assert('You can\'t show a modal without a template name',
        optionsIsString || options['template']);

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
