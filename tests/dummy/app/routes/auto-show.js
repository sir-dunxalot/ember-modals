import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    didTransition: function() {
      this.get('controller').showModal('modals/modal-one');
    }
  }

});
