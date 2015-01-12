import Em from 'ember';

export default Em.Test.registerHelper('inspect',
  function inspect(app, name, useJquery) {
    var element = find('[data-test="modal-' + name + '"]')[0];

    if (useJquery === false) {
      return element;
    } else {
      return $(element);
    }
  }
);
