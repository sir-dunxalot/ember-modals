export function initialize(application) {

  /* Inject the modals service into all compoennts and routes */

  ['component', 'route'].forEach((klass) => {
    application.inject(klass, 'modals', 'service:modals');
  });
}

export default {
  name: 'ember-modals',
  initialize
};
