import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-modal-overlay', 'Integration | Component | ember modal overlay', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-modal-overlay}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-modal-overlay}}
      template block text
    {{/ember-modal-overlay}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
