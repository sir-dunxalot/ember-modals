/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-modals',
  modalOptions: {},

  included: function(app) {
    var modalOptions = app.options.modals;

    // app.registry.add('js', modalOptions);
    // console.log(app.container); // HERE - need to register options
    // console.log(app);
  }
};
