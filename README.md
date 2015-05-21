Ember Modals [![Build Status](https://travis-ci.org/sir-dunxalot/ember-modals.svg?branch=master)](https://travis-ci.org/sir-dunxalot/ember-modals)
======

`ember-modals` is an Ember addon that adds API-like functionality for rendering and managing modals in your Ember application. The primary purpose of this addon is to manage modal functionality in your JS whilst getting out of the way for styling and templating.

This allows you to match your styleguide and mockups precisely. However, basic stylesheets and animations are included and may be imported.

```
ember install:addon ember-modals
```

### Features:

- Complete control over the context your modals renders in
- By default modals will render in the context of the current route
- Use multiple outlets with different modal views and overlays
- Action handling enables you to interact with modals from different areas of your app
- Easily customize animations (JS or CSS)
- Show multiple modals at the same time
- Import stylesheets for layout and animation

Please note, there may be backwards incompatible changes before v1.0.0.


## Documentation

Documentation, including setup, usage, customization, styling/animating, and development can be found in [the wiki](https://github.com/sir-dunxalot/ember-modals/wiki).


## Demo

In absence of an online demo (WIP), you can clone this repo to your desktop and run `ember s`. You will see a lot of buttons that allow you to show preset modals. Each modal contains info about the context in which it's rendered.

The demo uses the `'scale'` animation (see [styling](https://github.com/sir-dunxalot/ember-modals/wiki/Styling) for more info).


## Issues

If you have any issues or feature requests, please [open an issue](https://github.com/sir-dunxalot/ember-modals/issues/new) or submit a PR.


## Features and Improvements in the Works

- Improved WAI-ARIA support and documentation (aria-haspopup for buttons and aria-label for modals)
- Expose a `resetModal()` method to reset default properties
- More Browser support for included stylesheets
- Test(s) for animation duration of modals
- Hitting esc should close the modal
- Online demo
