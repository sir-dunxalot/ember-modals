import { moduleFor, test } from 'ember-qunit';

moduleFor('service:modals', 'Unit | Service | modals', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('It has public methods', function(assert) {
  let service = this.subject();

  assert.ok(typeof service.clearModals === 'function',
    'Should have a clearModals method');

  ['showModal', 'removeModal'].forEach((action) => {

    assert.equal(typeof service.actions[action], 'function',
      `Should have a ${action} action`);

  });

});

test('It adds and removes modals', function(assert) {
  let service = this.subject();

  assert.expect(8);

  /* Add one modal using the showModal(name, context) pattern */

  service.send('showModal', 'welcome', this);

  const modalsInDom = service.get('modalsInDom');

  assert.equal(modalsInDom.get('length'), 1,
    'Should have added the modal');

  assert.equal(modalsInDom.get('firstObject').componentName, 'welcome',
    'Should parse componentName when it is passed as a param');

  assert.equal(modalsInDom.get('firstObject').context, this,
    'Should parse context when it is passed as a param');

  /* Remove the modal */

  service.clearModals();

  assert.equal(service.get('modalsInDom.length'), 0,
    'Should have removed the modal');

  /* Add one modal using the showModal(options) pattern */

  const options = {
    componentName: 'welcome',
    context: this,
    someOtherOption: true,
  };

  service.send('showModal', options);

  assert.equal(service.get('modalsInDom.length'), 1,
    'Should have added the modal');

  const modal = service.get('modalsInDom.firstObject');

  for (let property in options) {

    assert.equal(modal[property], options[property],
      `Should parse ${property} when it is passed via the options param`);

  }

});
