import Em from 'ember';

var template = 'modals/modal-one';
var controller = 'modal-one';
var model = {
  name: 'test',
};
var outlet = 'modal-two';
var parentView = ''

export default Em.Mixin.create({

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

    showModalSix: function() {
      this.showModal(template.replace('one', 'two'));
    },

    showModalSeven: function() {
      this.showModal(template, {
        outlet: 'modal-two'
      });
    },

    showModalEight: function() {
      var viewName = this.toString().split(':')[1];

      this.showModal(template, {
        outlet: 'modal-on-route',
        parentView: viewName
      });
    },

    showModalNine: function() {
      var viewName = this.toString().split(':')[1];

      this.showModal(template, {
        parentView: viewName
      });
    }

  }

});
