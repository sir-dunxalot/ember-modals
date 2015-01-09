import Em from 'ember';
import defaultFor from '../utils/default-for';

export default {
  name: 'addModalMethods',

  initialize: function(container, app) {
    var applicationRoute = container.lookup('route:application');

    applicationRoute.reopen({
      _actions: {
        renderModal: function(modalOptions) {
          var defaultOptions = {
            controller: modalOptions.get('controllerName'), // Default
            into: 'application',
            outlet: 'modal', // Should be an addon option
            view: 'modal',
          };

          this.render(modalOptions.get('templateName'), defaultOptions); // Needs an object merge
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

      showModal: function(templateNameOrOptions) {
        var modalOptions = {};
        var currentControllerName;

        /* If options are passed together as a single object... */

        if (typeof templateNameOrOptions === 'string') {
          modalOptions.templateName = templateNameOrOptions;
        } else {
          modalOptions.templateName = templateNameOrOptions['template'];
          modalOptions.controllerName = templateNameOrOptions['controller'];
          modalOptions.model = templateNameOrOptions['model'];
        }

        // Now check to see if we have a templateName
        Em.assert('You must pass a templateName with the showModal action', modalOptions.templateName);

        if (!modalOptions.controllerName) {
          currentControllerName = this.get('constructor').toString().split(':').objectAt(1);

          modalOptions.controllerName = currentControllerName;
        }

        for (var option in modalOptions) {
          this.set('modal.' + option, modalOptions[option]);
        }

        this.get('modal').show();
      }

    });
  }
};
