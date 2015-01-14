import Em from 'ember';
import defaultFor from 'ember-modals/utils/default-for';

export default Em.ObjectController.extend(
  Em.Evented, {

  /* Best set */

  controllerName: null,
  model: null,
  templateName: null,
  viewName: null,

  /* Options */

  defaultViewName: 'modal',
  defaultOutlet: 'modal',
  defaultParentViewName: 'application',
  transitionDuration: 500, // Fallback from CSS value

  hide: function(outlet) {
    var parentViewName;

    this.trigger('closeModal'); // Start close animation

    outlet = defaultFor(outlet, this.get('defaultOutlet'));
    parentViewName = this.get('_previousRelationships.' + outlet);

    Em.run.later(this, function() {
      this.send('removeModal', outlet, parentViewName);
    }, this.get('transitionDuration'));
  },

  show: function(renderingOptions) {
    var previousRelationships = this.get('_previousRelationships');
    var options, previousParentView;

    renderingOptions = defaultFor(renderingOptions, {});

    options = {
      controller: this.get('controllerName'),
      template: this.get('templateName'),
      outlet: defaultFor(
        renderingOptions.outlet,
        this.get('defaultOutlet')
      ),
      into: defaultFor(
        renderingOptions.parentView,
        this.get('defaultParentViewName')
      ),
      view: defaultFor(
        this.get('viewName'),
        this.get('defaultViewName')
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
