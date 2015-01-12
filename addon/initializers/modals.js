import Em from 'ember';
import defaultFor from '../utils/default-for';

export default {
  name: 'modals',

  initialize: initialize
};

export function initialize(container, app) {
  var applicationRoute = container.lookup('route:application');

  /* Use if statement to allow unit tests to work */

  if (applicationRoute) {
    applicationRoute.reopen({
      _actions: {
        renderModal: function(options) {
          options.setProperties({
            controller: defaultFor(
              options.get('controllerName'),
              this.get('controller.currentRouteName')
            ),
            into: 'application',
            view: options.get('viewName')
          });

          this.render(options.get('templateName'), options);
        },

        removeModal: function(options) {
          this.disconnectOutlet({
            outlet: options.get('outlet'),
            parentView: 'application',
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
      var modalOptions = {
        controllerName: null,
        model: null,
        templateName: null
      };

      /* If options are passed together as a single object... */

      if (typeof options === 'string') {
        modalOptions.templateName = options;
      } else {
        Em.assert('You must pass a templateName to the showModal method', options['template']);

        modalOptions.templateName = options['template'];
        modalOptions.controllerName = options['controller'];
        modalOptions.model = options['model'];
      }

      for (var option in modalOptions) {
        this.set('modal.' + option, modalOptions[option]);
      }

      this.get('modal').show();
    }

  });
}
