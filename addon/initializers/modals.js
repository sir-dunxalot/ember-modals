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

        removeModal: function(outlet, parentViewName) {
          this.disconnectOutlet({
            outlet: outlet,
            parentView: parentViewName
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

      Em.assert('You can\'t show a modal without a template name',
        options || this.get('templateName'));

      /* If options are passed together as a single object... */

      if (Em.typeOf(options) === 'string') {
        modal.set('templateName', options);
      } else {
        modal.set('templateName', options['template']);
      }

      /* Sets value to undefined if they're not set */

      modal.set('controllerName', options['controller']);
      modal.set('model', options['model']);
      modal.set('viewName', options['view']);

      /* Auto-call the show function to do rendering */

      this.get('modal').show(renderingOptions);
    }

  });
}
