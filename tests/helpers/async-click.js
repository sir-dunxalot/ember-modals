import Em from 'ember';

export default Em.Test.registerAsyncHelper('asyncClick',
  function(app, testProperty) {
    click(inspect(testProperty));
  }
);
