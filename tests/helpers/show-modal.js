import Em from 'ember';

export default Em.Test.registerAsyncHelper('showModal',
  function(app, options, renderingOptions) {
    var container = app.__container__;
    var controller = container.lookup('controller:' + currentRouteName());

    controller.showModal(options, renderingOptions);

    return app.testHelpers.wait();
  }
);
