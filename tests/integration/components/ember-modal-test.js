import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-modal', 'Integration | Component | ember modal', {
  integration: true
});

test('It renders modal content', function(assert) {

  /* We only do a few assertions here because most unit
  testing occurs in the {{ember-modals}} component unit
  test */

  assert.expect(4);

  this.on('didShowModal', function() {
    assert.ok(true, 'Should send show action on didRender');
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
