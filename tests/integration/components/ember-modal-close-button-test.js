import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-modal-close-button', 'Integration | Component | ember modal close button', {
  integration: true
});

test('Clicking', function(assert) {

  assert.expect(2);

  this.render(hbs`{{ember-modal-close-button onClick='clickReceived'}}`);

  this.on('clickReceived', () => {
    assert.ok(true, 'A click should send the onClick action');
  });

  assert.ok(this.$().text().trim().indexOf('X'),
    'Should contain a close icon');

  this.$().find('button')[0].click();
});
