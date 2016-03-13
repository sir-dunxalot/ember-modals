import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-modal', 'Integration | Component | ember modal', {
  integration: true
});

test('It renders modal content', function(assert) {

  this.on('didShowModal', function() {

  });

  this.render(hbs`{{ember-modal}}`);

  assert.equal(this.$().text().trim(), '');

  this.render(hbs`
    {{#ember-modal}}
      Modal content
    {{/ember-modal}}
  `);

  assert.equal(this.$().text().trim(), 'Modal content',
    'Should render content in a modal');

});
