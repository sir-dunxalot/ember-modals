Ember Modals [![Build Status](https://travis-ci.org/sir-dunxalot/ember-modals.svg?branch=master)](https://travis-ci.org/sir-dunxalot/ember-modals) [![Ember Addon](https://s3.amazonaws.com/images.jebbit.com/ember/badge.svg)](http://www.emberaddons.com)
======

`ember-modals` is an Ember addon that adds API-like functionality for rendering and managing modals in your Ember application. The primary purpose of this addon is to manage modal functionality in your JS whilst getting out of the way for styling and templating, allowing you to match your styleguide and mockups precisely. However, basic stylesheets and animations are included and may be optionally imported.

```
npm install --save-dev ember-modals
```

## Documentation

Documentation, including setup, usage, customization, and styling/animating, can be found in [the wiki](https://github.com/sir-dunxalot/ember-modals/wiki).


## Issues

If you have any issues or feature requests, please [open an issue](https://github.com/sir-dunxalot/ember-modals/issues/new) or submit a PR.


## TODO - Features and Improvements

- Improved WAI-ARIA support and documentation (aria-haspopup for buttons and aria-label for modals)
- Expose a `resetModal()` method to reset default properties
- More Browser support for included stylesheets
- Modal view to use `one()` instead of `on()`
- Test(s) for animation duration of modals
