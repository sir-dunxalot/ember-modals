import Em from 'ember';

var template = 'test-modal';
var controller = 'test-modal';
var model = {
  name: 'test',
};

export default Em.ObjectController.extend({

  actions: {

    showModalOne: function() {
      this.showModal(template);
    },

    showModalTwo: function() {
      this.showModal({
        template: template,
        controller: controller
      });
    },

    showModalThree: function() {
      this.showModal({
        template: template,
        model: model
      });
    },

    showModalFour: function() {
      this.showModal({
        template: template,
        controller: controller,
        model: model
      });
    },

    showModalFive: function() {
      this.showModal();
    },

  }

});
