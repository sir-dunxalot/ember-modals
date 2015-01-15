import Em from 'ember';

export default Em.ObjectController.extend({

  actions: {
    showModalOne: function() {
      this.showModal({
        template: 'modals/modal-one'
      }, {
        outlet: 'about',
        parentView: 'info.about'
      });
    }
  }

});
