# Ember Modals

Adds API-like functionality for rendering and managing modals in your Ember application.

This addon tracks the context from where you showed a modal, allowing you to easily interact with your current route, component, or controller from within the modal.

- [Installation](#installation)
- [Showing modals](#showing-modals)
- [Passing modal options](#passing-modal-options)
- [Accessing the caller context](#accessing-the-caller-context)
- [Closing modals](#closing-modals)

## Installation

```sh
ember install ember-modals
```

And add the `{{ember-modals}}` component in your application template:

```hbs
{{outlet}}

{{ember-modals}}
```

## Showing Modals

To show a modal using a HTMLBars action, call `showModal` and pass the name of any component to render as a modal.

You must specify `target` as `modals`. The target will reference the `modals` service, which is injected into routes, components, and controllers by default.

```hbs
<button {{action 'showModal' 'welcome-dialog' target=modals}}>
  Show welcome
</button>
```

The showModal action accepts a second, optional parameter, context:

```hbs
<button {{action 'showModal' 'welcome-dialog' this target=modals}}>
  Show welcome
</button>
```

When you pass a context, this will be set as the `targetObject` of the component you passed.

## Passing Modal Options

Instead of passing a component and context to the `showModal` action, you can pass a single options object.

This object supports more options that name-and-context approach mentioned above:

```js
/* Within some route, component, or controller... */

this.modals.send('showModal', {
  componentName: 'my-welcome-dialog',
  context: this,
  modalClassName: 'welcome-modal',
  overlayClassName: 'overlay-transparent',
  showCloseButton: true,
});
```

## Accessing the Caller Context

Congratulations! You shiney new modal has been render in the DOM!

Because you rendered it from within some component or route, you might want to access properties or actions on that class. To do this, just access the `targetObject` property in your component or component's layout:

```js
/* Some route, component, or controller... */

export default Ember.Component.extend({
  userName: 'Dave',

  actions: {
    checkWeCanDeleteThis() {
      this.modals.showModal('confirm-delete', this);
    },

    confirmDelete() {
      this.get('model').deleteRecord();
    }
  },
});
```

```hbs
/* templates/components/confirm-delete.hbs */

Hey, {{targetObject.userName}}! Are you sure you want to delete this?

<button {{action 'confirmDelete' target=targetObject}}>
  Yes!
</button>

<button {{action 'closeModal'}}>
  No
</button>
```

**Note two things:**

- You must have passed `context` to `showModal()` as described in [passing modal options](#passing-modal-options)**
- Set `target=targetObject` to call actions on the route or component you rendered the modal from

You can also access the `modal` property, giving you access to the original options to passed to `showModal()`:

```hbs
/* templates/components/confirm-delete.hbs */

I'm showing {{modal.componentName}}. {{!-- confirm-delete --}}

The context is {{modal.context}}, which is the same as {{targetObject}}.

The modal class name is {{modal.modalClassName}}.
```

## Closing Modals

There are three ways modals can be closed:

- Hitting `esc`
- Clicking on the overlay
- By sending the `closeModal` action from within the modal content:

```hbs
/* templates/components/welcome-dialog.hbs */

Welcome to this app!

<button {{action 'closeModal'}}>
  Close modal
</button>
```
