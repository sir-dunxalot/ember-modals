import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    didTransition: function() {
      Ember.run.next(this, function() {
        this.get('controller').showModal('modals/modal-one');
      });
    }
  }

});
