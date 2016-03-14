import Ember from 'ember';
import ModalsService from 'ember-modals/services/modals';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import showModalAndRender from '../../helpers/show-modal-and-render';

const { run } = Ember;

moduleForComponent('ember-modals', 'Integration | Component | ember modals', {
  integration: true,

  beforeEach() {

    /* Inject the modals service */

    this.register('service:modals', ModalsService);
    this.inject.service('modals', { as: 'modals' });

    run(this, function() {
      this.modals.clearModals();
    });
  }
});

test('It renders a modal', function(assert) {

  assert.expect(6);

  this.render(hbs`{{ember-modals}}`);

  assert.equal(this.$().text().trim(), '',
    'Should have no content by default');

  showModalAndRender(this, 'demo-modal-1').then(({ $overlay, $this }) => {

    assert.ok($this, 'Should render an overlay and modal');

    assert.equal($this.find('.ember-modal-overlay').length, 1,
      'Should render only one overlay');

    assert.equal($overlay.text().trim(), 'This is a modal!',
      'Should have the modal content');

    assert.ok($overlay.hasClass('ember-modal-overlay'),
      'Should have the overlay CSS class');

    assert.ok($overlay.find('.ember-modal').length,
      'Should have a modal component rendered');

  });
});

test('It renders multiple modals', function(assert) {
  const done = assert.async();

  assert.expect(1);

  this.render(hbs`{{ember-modals}}`);

  showModalAndRender(this, 'demo-modal-1').then(() => {
    showModalAndRender(this, 'demo-modal-2').then(({ $overlay, $this }) => {

      const $overlays = $this.find('.ember-modal-overlay');

      assert.equal($overlays.length, 2,
        'Should render two modals');

      done();

    });
  });
});

test('It renders modals with the given context', function(assert) {

  assert.expect(1);

  this.render(hbs`{{ember-modals}}`);

  this.set('isReceivingContext', true);

  showModalAndRender(this, {
    componentName: 'demo-modal-2',
    context: this,
  }).then(({ $overlay }) => {

    assert.equal($overlay.find('[data-test="context"]').text(), 'true',
      'Should render with the context of this');

  });
});

test('It binds class name options', function(assert) {

  this.render(hbs`{{ember-modals}}`);

  showModalAndRender(this, {
    componentName: 'demo-modal-1',
    context: this,
    overlayClassName: 'my-overlay',
    modalClassName: 'my-modal',
  }).then(({ $overlay, $this }) => {

    assert.ok($this.find('.my-overlay.ember-modal-overlay').length,
      'Should bind the overlayClassName to the overlay');

    assert.ok($this.find('.my-modal.ember-modal').length,
      'Should bind the modalClassName to the modal');
  });
});

test('It renders configurable, useable close buttons', function(assert) {
  const done = assert.async();

  assert.expect(3);

  this.render(hbs`{{ember-modals}}`);

  showModalAndRender(this, 'demo-modal-1').then((components) => {

    assert.notOk(components.$overlay.find('.ember-modal-close-button').length,
      'Should not have a close button by default');

    this.modals.clearModals();

    /* Wait for the modals to clear... */

    run.scheduleOnce('afterRender', this, function() {

      showModalAndRender(this, {
        componentName: 'demo-modal-1',
        context: this,
        showCloseButton: true,
      }).then(({ $overlay }) => {
        const $buttons = $overlay.find('.ember-modal-close-button');
        // const $modal = $overlay.find('.ember-modal');

        // $modal.css('transition-duration')

        assert.equal($buttons.length, 1,
          'Should have a close button');

        /* Now test clicking the button... */

        run(() => {
          $buttons.first().click();
        });

        run.scheduleOnce('afterRender', this, function() {
          run.later(this, function() {
            const $overlays = this.$().find('.ember-modal-overlay');

            assert.notOk($overlays.length,
              'Should remove modal when close button is clicked');

            done();
          }, 10);
        });
      });
    });
  });
});

test('It closes modals when esc is hit', function(assert) {
  const done = assert.async();

  assert.expect(2);

  this.render(hbs`{{ember-modals}}`);

  showModalAndRender(this, {
    componentName: 'demo-modal-1',
    context: this,
  }).then(({ $overlay, $this }) => {

    /* Fake event in a Phantom-compatible way */

    const event = document.createEvent('Events');

    event.initEvent('keyup', true, true);
    event.which = 27;
    event.keyCode = 27;

    assert.ok($overlay, 'Should render a modal');

    /* Simulate esc being hit... */

    $this.find('.ember-modal')[0].dispatchEvent(event);

    /* Now, check the modal exists */

    run.scheduleOnce('afterRender', this, function() {
      run.later(this, function() {

        assert.equal(this.$().find('.ember-modal').length, 0,
          'Should close the modal when esc is hit');

        done();

      }, 200);
    });
  });
});

test('It closes modals when overlays are clicked', function(assert) {
  const done = assert.async();

  assert.expect(2);

  this.render(hbs`{{ember-modals}}`);

  showModalAndRender(this, {
    componentName: 'demo-modal-1',
    context: this,
  }).then(({ $overlay, $this }) => {

    assert.ok($overlay, 'Should render a modal');

    /* Simulate clicking the modal... */

    $this.find('.ember-modal-overlay').click();

    /* Now, check the modal exists */

    run.scheduleOnce('afterRender', this, function() {
      run.later(this, function() {

        assert.equal(this.$().find('.ember-modal').length, 0,
          'Should close the modal when overlay is clicked');

        done();

      }, 200); // Longer delay because of Phantom
    });
  });
});
