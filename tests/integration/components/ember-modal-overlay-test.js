import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-modal-overlay', 'Integration | Component | ember modal overlay', {
  integration: true
});

test('It renders', function(assert) {

  this.render(hbs`{{ember-modal-overlay}}`);

  assert.equal(this.$().text().trim(), '');

  this.render(hbs`
    {{#ember-modal-overlay}}
      Overlay content
    {{/ember-modal-overlay}}
  `);

  assert.equal(this.$().text().trim(), 'Overlay content');

});
