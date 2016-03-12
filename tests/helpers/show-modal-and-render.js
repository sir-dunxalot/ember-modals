import Ember from 'ember';

const { run } = Ember;

export default function(context, options) {
  return new Ember.RSVP.Promise((resolve) => {

    run(context, function() {
      this.modals.send('showModal', options);

      run.scheduleOnce('afterRender', this, function() {
        const $this = this.$();

        resolve({
          $overlay: $this.find('.ember-modal-overlay').last(),
          $this,
        });
      });
    });

  });
}
