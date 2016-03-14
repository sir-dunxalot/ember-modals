import Ember from 'ember';
import layout from '../templates/components/ember-modal-close-button';

export default Ember.Component.extend({
  classNames: ['ember-modal-close-button'],
  layout,
  onClick: null,
  tagName: 'button',

  click() {
    this.sendAction('onClick');
  },
});
