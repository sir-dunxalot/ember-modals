/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-modals',

  included: function(app) {
    var options = app.options.modals;
    var animation;

    if (options) {
      animation = options.animation;

      if (options.layout) {
        app.import('vendor/styles/layout.css', {
          prepend: true,
        });
      }

      if (options.style) {
        app.import('vendor/styles/style.css', {
          prepend: true,
        });
      }

      if (animation) {
        app.import('vendor/styles/animations/' + animation + '.css', {
          prepend: true
        });
      }
    }
  }
};
