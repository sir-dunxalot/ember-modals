import Em from 'ember';

/* Locates an element(s) identified by a test helper attribute.
By default this returns a jQuery element unless you specify
false as the second argument (useJQuery) */

export default Em.Test.registerHelper('inspect',
  function inspect(app, name, useJQuery) {
    var element = find('[data-test="modal-' + name + '"]')[0];

    if (useJQuery === false) {
      return element;
    } else {
      return $(element);
    }
  }
);
