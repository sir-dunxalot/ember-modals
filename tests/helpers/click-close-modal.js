import Em from 'ember';

export default Em.Test.registerAsyncHelper('clickCloseModal',
  function(app) {
    click(inspect('close'));
  }
);
