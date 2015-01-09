/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-modals',

  included: function(app) {
    var options = app.options.modals;

    if (options.layout) {
      app.import('vendor/styles/layout.css');
    }

    if (options.style) {
      app.import('vendor/styles/style.css');
    }

    // app.registry.add('js', modalOptions);
    // console.log(app.container); // HERE - need to register options
    // console.log(app);
  }
};
