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
    this.trigger('closeModal'); // Start close animation

    outlet = defaultFor(
      outlet,
      this.get('defaultOutlet')
    );

    parentViewName = this.get('_cachedRelationships.' + outlet);

    Em.run.later(this, function() {
      this.send('removeModal', outlet, parentViewName);
    }, this.get('transitionDuration'));
  },

  show: function(outlet, parentViewName) {
    var options = {
      controller: this.get('controllerName'),
      template: this.get('templateName'),
      outlet: defaultFor(
        outlet,
        this.get('defaultOutlet')
      ),
      into: defaultFor(
        parentViewName,
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

    this.set('_cachedRelationships.' + options.outlet,
      options.parentViewName);

    this.send('renderModal', options);
  },

  _cachedRelationships: Em.Object.create(),

});
