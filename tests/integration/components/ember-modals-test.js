// import Ember from 'ember';
import ModalsService from 'ember-modals/services/modals';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import showModalAndRender from '../../helpers/show-modal-and-render';

moduleForComponent('ember-modals', 'Integration | Component | ember modals', {
  integration: true,

  beforeEach() {

    /* Inject the modals service */

    this.register('service:modals', ModalsService);
    this.inject.service('modals', { as: 'modals' });
  }
});

test('It renders a modal', function(assert) {

  this.render(hbs`{{ember-modals}}`);

  assert.equal(this.$().text().trim(), '',
    'Should have no content by default');

  showModalAndRender(this, 'demo-modal-1').then(({ $overlay, $html }) => {

    console.log($overlay);

    assert.ok($overlay, 'Should render an overlay and modal');

    assert.equal($html.find('.ember-modal-overlay').length, 1,
      'Should render only one overlay');

    assert.equal($overlay.text().trim(), 'This is a modal!',
      'Should have the modal content');

    assert.ok($overlay.hasClass('ember-modal-overlay'),
      'Should have the overlay CSS class');

    assert.ok($overlay.find('.ember-modal').length,
      'Should have a modal component rendered');

  });
});
