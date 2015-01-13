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
      _actions: {
        renderModal: function(options) {

          /* Default to route's controller */

          options.controller = defaultFor(
            options.controller,
            this.get('controller.currentRouteName')
          );

          this.render(options.template, options);
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
      closeModal: function() {
        this.get('modal').hide();
      }
    },

    showModal: function(options) {
      var modal = this.get('modal');

      Em.assert('You can\'t show a modal without a template name',
        options || this.get('templateName'));

      /* If options are passed together as a single object... */

      if (typeof options === 'string') {
        modal.set('templateName', options);
      } else {
        modal.set('templateName', options['template']);
      }

      modal.set('controllerName', options['controller']);
      modal.set('model', options['model']);
      modal.set('viewName', options['viewName']);

      this.get('modal').show();
    }

  });
}
