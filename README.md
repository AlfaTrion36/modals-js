# ModalsJS v0.0.1

> Quick and easy to use modal dialogs for web sites and apps.

I made an entire custom, reusable, responsive, accessible modal dialog package with easy to use configurations so I could reuse it in any side project _because I was bored..._ And then after I was almost done with the code cleanup and full README, I realized HTML5 has a DIALOG tag which is supported by all modern browsers! 🤦🏽‍♂️

Since DIALOG is still pretty new, it's not as fancy as my original package. But we can get there eventually.

Anyway...

This package will give you an HTML5 modal dialog, as per [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog), with as much accessibility baked in, along with override-able styling for quick setup and use.

> ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
> This is a rough work-in-progress. Please see [TODOs](#todos) to see if this package is right for you at this moment in time.

## Feedback

How has your DX been while using this package? I made this for my own uses so let me know what I can add so I can make it better for you!

## TODOs

-   figure out the final name
-   add backdrop click handler
    -   (maybe a dialog onclick, get mouse location, if outside, close?)
-   workaround for backdrop transition
    -   See CSS overlay? (experimental)
-   make non-modal dialog option
-   test in all supported browsers
-   build the damn package
    -   set `./dist` contents
        - ✅ JavaScript
        - ⬜ CSS
-   Check if I missed other a11y TODOs...
-   Unit tests to backup my claims of how things work lol
-   TS version
-   DX: remove use of `dataset`
-   extra export for modal template generator(s)?

---

## Default Setup

### JavaScript

You can import ModalsJS as whatever name is available. For this readme, the JS object will be called `modalsJs`.

```javascript
import modalsJs from 'modals-js';

modalsJs.init();
```

### Styles

Import `main.css` using your preferred method.

Override the styles as desired, but keep in mind accessibility and user experience.

```html
<!-- HTML -->
<link rel="stylesheet" href="node_modules/modals-js/dist/styles/index.css" />
```

```sass
// SASS
@import "../node_modules/modals-js/dist/styles/index.scss";

// OR using `pkg:` importers
@import "pkg:modals-js";
```

```javascript
// CSS-in-JS
@import 'modals-js/styles/index.css';
```

Let me know how you prefer!

### Markup

> 🛑🛑🛑🛑🛑🛑🛑🛑
> It is recommended to add ModalsJS markup as close to the closing `body` tag as possible.

The example below will be using the default class names. See [Options](#options) for how to override them.

#### Modal Dialog

The following markup is the recommended skeleton for your modals. It takes into account accessibility for users using assistive technology.

```html
<!-- Recommended modal markup -->
<dialog
    class="modalsJS my-modal-selector-class"
    aria-labelledby="my-modal-selector-class-title"
>
    <div class="my-modal-selector-class__wrapper">
        <h1
            id="my-modal-selector-class-title"
            class="my-modal-selector-class__title"
            tabindex="-1"
        >
            Modal Title
        </h1>

        <!-- Rest of your markup goes here -->

        <button class="modalsJS__close" aria-label="Close">×</button>
    </div>
</dialog>
```

Replace `my-modal-selector-class` with a unique class name (per modal). Otherwise, the `open` and `close` methods will just target `.modalsJS` by default (or the custom option for `options.classNames.dialogWindow`).

### Requirements & Recommendations

To comply with accessibility standards around the world, make sure your markup complies with the following:

-   Modals have an aria-label (usually the pointing to the H1)
-   Modals follow heading level hierarchy
-   Close button is the final element to tab through for keyboard users

---

## Methods

### `init`

Initialize ModalsJS.

-   Registers common class name for all Modal.js modals.
-   Adds event listeners to the default close buttons.

```javascript
modalsJs.init();
```

Use `options` object to override defaults, if desired.

```javascript
modalsJs.init(options);
```

#### Options

The following tables represent key names for the `options` object:

##### `classNames`

Please note, at this time, that if you change the defaults, you will have to update the class names in the CSS file as well.

| Property       |  Type  | Default            | Notes                                                                      |
| :------------- | :----: | :----------------- | :------------------------------------------------------------------------- |
| `dialogWindow` | string | `".dialog"`        | Common class name for all modals.                                          |
| `btnClose`     | string | `".dialog__close"` | Common class name for all default close buttons (the `x` on the top right) |

---

### `open`

Activates target modal.

| Arguments     |  Type  | Default       | Notes                                                            |
| :------------ | :----: | :------------ | :--------------------------------------------------------------- |
| Selector      | string | `".modalsJS"` | Default may be overridden with `options.classNames.dialogWindow` |
| Extra Classes | string | `""`          | Comma separated list of classes to add to target modal           |

```javascript
// Example 1 — Default, use when there is only one modal available
modalsJs.open();

// Example 2 — Pass a unique selector when there are multiple modals available
modalsJs.open('.my-modal-selector');

// Example 3 — When you need to add any classes when the modal is open
modalsJs.open('.my-modal-selector', 'my-extra-class-1, my-other-extra-class');
```

---

### `close`

Deactivates target modal.

| Arguments     |  Type  | Default       | Notes                                                            |
| :------------ | :----: | :------------ | :--------------------------------------------------------------- |
| Selector      | string | `".modalsJS"` | Default may be overridden with `options.classNames.dialogWindow` |
| Extra Classes | string | `""`          | Comma separated list of classes to remove from target modal      |

```javascript
// Example 1 — Default, use when there is only one modal available
modalsJs.close();

// Example 2 — Pass a unique selector when there are multiple modals available
modalsJs.close('.my-modal-selector');

// Example 3 — When you need to remove any classes when the modal is closed
modalsJs.close('.my-modal-selector', 'my-extra-class-1, my-other-extra-class');
```

**NOTE:** To _always_ remove certain classes on close for a specific modal, add a comma separated list **(with no spaces)** to the dataset of the dialog element, `data-modal-reset-classes`.

```html
<dialog
    class="modalsJS drawn-card"
    aria-labelledby="drawn-card-title"
    data-modal-reset-classes="drawn-card--chance,drawn-card--community_chest"
>
    ...
</dialog>
```
