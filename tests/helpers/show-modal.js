import Em from 'ember';

export default Em.Test.registerAsyncHelper('showModal',
  function(app, options, renderingOptions) {
    var container = app.__container__;
    var controller = container.lookup('controller:' + currentRouteName());

    /* Get the route's controller and call show modal */

    controller.showModal(options, renderingOptions);

    /* Wait for it to finish rendering before allowing
    the next async helper to fire off */

    return app.testHelpers.wait();
  }
);
