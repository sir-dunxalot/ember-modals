import Em from 'ember';
import defaultFor from 'ember-modals/utils/default-for';

export default Em.Controller.extend(
  Em.Evented, {

  /* Options - best set by extending this controller */

  defaultView: 'modal',
  defaultOutlet: 'modal',
  defaultParentView: 'application',
  transitionDuration: 500, // Fallback from CSS value

  /* Properties - best set using showModal() */

  controller: null,
  model: null,
  template: null,
  view: null,

  _outletBeingClosed: null,

  /**
  Triggers the animation to hide the modal. Once the `transitionDuration` has passed the action to remove the outlet will be triggered.

  If the outlet is not provided, the `defaultOutlet` property will be used. Whe using a modal other than the default you should always pass the outlet name.

  @method hide
  @param [outlet] String The name of the outlet to remove the modal from. Defaults to defaultOutlet
  */

  hide: function(outlet) {
    var parentView;

    outlet = defaultFor(outlet, this.get('defaultOutlet'));

    this.set('_outletBeingClosed', outlet);
    this.trigger('closeModal'); // Start close animation

    parentView = this.get('_previousRelationships.' + outlet);

    Em.run.later(this, function() {
      this.set('_outletBeingClosed', null);
      this.send('removeModal', outlet, parentView);
    }, this.get('transitionDuration'));
  },

  /**
  Renders a modal in a given outlet within the application using the properties previously set on this controller from another controller (either directly using set() or indirectly using the showMethod() method).

  If `outlet` or `parentView` are not set as a property on `renderingOptions`, `defaultOutlet` and `defaultParentView` will be used, respectively.

  @method show
  @param [renderingOptions] Object The `outlet` and `parentView` to render the modal into.
  */

  show: function(renderingOptions) {
    var previousRelationships = this.get('_previousRelationships');
    var options, previousParentView;

    renderingOptions = defaultFor(renderingOptions, {});

    options = {
      controller: this.get('controller'),
      template: this.get('template'),
      outlet: defaultFor(
        renderingOptions.outlet,
        this.get('defaultOutlet')
      ),
      into: defaultFor(
        renderingOptions.parentView,
        this.get('defaultParentView')
      ),
      view: defaultFor(
        this.get('view'),
        this.get('defaultView')
      )
    };

    /* Save the developer-defined coupling of outlet and
    parent view so we can easily hide outlets in a route's
    view later */

    previousParentView = previousRelationships.get(options.outlet);

    if (previousParentView && previousParentView !== options.into) {
      Em.warn('You should not use the same named outlet in different views with ember-modals. Behaviour will be unexpected.');
    }

    previousRelationships.set(options.outlet, options.into);

    this.send('renderModal', options);
  },

  _previousRelationships: Em.Object.create(),

});
