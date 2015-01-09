import Em from 'ember';
import defaultFor from '../utils/default-for';

export default {
  name: 'addModalMethods',

  initialize: function(container, app) {
    var applicationRoute = container.lookup('route:application');

    applicationRoute.reopen({
      _actions: {
        renderModal: function(options) {
          options.setProperties({
            controller: defaultFor(
              options.get('controllerName'),
              this.get('controller.currentRouteName')
            ),
            into: 'application',
            outlet: 'modal', // Should be an addon option
            view: 'modal',
          });

          this.render(options.get('templateName'), options);
        },

        removeModal: function() {
          this.disconnectOutlet({
            outlet: 'modal',
            parentView: 'application',
          });
        }
      }
    });

    Em.ControllerMixin.reopen({
      needs: ['modal'],
      modal: Em.computed.alias('controllers.modal'),

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
          modalOptions.templateName = options['template'];
          modalOptions.controllerName = options['controller'];
          modalOptions.model = options['model'];
        }

        // Now check to see if we have a templateName
        Em.assert('You must pass a templateName with the showModal action', modalOptions.templateName);

        for (var option in modalOptions) {
          this.set('modal.' + option, modalOptions[option]);
        }

        this.get('modal').show();
      }

    });
  }
};
