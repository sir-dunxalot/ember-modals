import defaultFor from 'ember-modals/utils/default-for';

var defaultTemplate = 'modals/modal-one';
var defaultView = 'modal';
var defaultOutlet = 'modal';
var defaultParentView = 'application';

export function testModal(options, renderingOptions) {

  /* Allow us to pass no object */

  options = defaultFor(options, {});
  renderingOptions = defaultFor(renderingOptions, {});

  /* Then check each component of the modal */

  checkTemplate(options.template);
  checkView(options.view);
  checkModel(options.model);
  checkController(options.controller);

  checkOutlet(renderingOptions.outlet);
  checkParentView(renderingOptions.parentView);
};

/* Each of the below methods checks the given component of the
modal. If an option is passed, it checks that the given option
is set on the modal. If no option is passed it checks that the
default option is set on the modal */

export function checkTemplate(name) {
  var expectedName, text;

  name = defaultFor(name, defaultTemplate);
  expectedName = name.replace('/', '.');
  text = name ? name : 'default';

  equal(inspect('template_name').text().trim(), expectedName,
    'Modal should have the ' + text + ' template');

};

export function checkView(name) {
  var expectedName;

  name = defaultFor(name, defaultView);
  expectedName = ':' + name + ':';

  ok(inspect('view_constructor').text().indexOf(expectedName) > -1,
    'Modal should have the ' + name + ' view');

};

export function checkModel(expectedModel) {
  var name;

  if (expectedModel) {
    name = expectedModel.name;

    equal(inspect('model-name').text().trim(), name,
      'Modal should have a model with name equal to ' + name);

  } else {

    ok(!inspect('model').is(':empty'),
      'The modal should not have a model');

  }

};

export function checkController(name) {
  var constructor = inspect('controller_constructor').text().trim();
  var text;

  name = defaultFor(name, currentRouteName());
  text = name ? name : 'default (a.k.a. the route\'s controller';

  ok(constructor.indexOf(name) > -1,
    'Modal should have the ' + text + ' controller');

};

export function checkOutlet(name) {
  name = defaultFor(name, defaultOutlet);

  equal(inspect('outlet_name').text().trim(), name,
    'Modal should be rendered into the ' + name + ' outlet');

};

export function checkParentView(name) {
  var actualName = inspect('parent_view_name').text().trim();

  name = defaultFor(name, defaultParentView);

  equal(name, actualName,
    'The modal\'s outlet should have the ' + name + ' parent view');

};
