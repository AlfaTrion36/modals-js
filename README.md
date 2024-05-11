# Modals.js v0.0.1

Quick and easy to use modals for web sites and apps.

> ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
> This is a rough work-in-progress. Please see [TODOs](#todos) to see if this package is right for you at this moment in time.

## TODOs

- figure out the final name
- build the package
  - set `./dist` contents
- add demo
- DX: remove use of `dataset`
- a11y: Add focus trap
- a11y: Prevent background scrolling
- a11y: Give focus back to modal launching target
- Check if I missed other a11y TODOs...
- Unit tests
- TS version
- extra export for modal template generator(s)

---

## Default Setup

### JavaScript

```javascript
import modal from "./modals";

modal.init();
```

### Styles

Import `main.css` using your preferred method.

Override the styles as desired, but keep in mind accessibility and user experience.

```sass
// SASS
@use modals/main.css
```

```javascript
// CSS-in-JS
@import 'modals/main.css';
```

Let me know how you prefer!

### Markup

> 🛑🛑🛑🛑🛑🛑🛑🛑
> It is recommended to add Modals.js markup as close to the closing `body` tag as possible.

The examples below will be using the default class names. See [Options](#options) for how to override them.

#### Modal Background

```html
<!-- Modal dialog background -->
<div class="dialog__background"></div>
```

You only need one background `div` despite how many different modals you may have.

#### Modal Dialog

The following markup is the recommended skeleton for your modals. It takes into account accessibility for users using assistive technology.

```html
<!-- Recommended modal markup -->
<div
    role="dialog"
    class="dialog my-modal-selector-class"
    aria-labelledby="my-modal-selector-class-title"
>
    <div
        class="my-modal-selector-class__wrapper"
    >
        <h1
            id="my-modal-selector-class-title"
            class="my-modal-selector-class__title"
        >
            My Modal Title
        </h1>

        <!-- Rest of your markup goes here -->

        <button
            class="dialog__close"
            aria-label="Close"
        >
            ×
        </button>
    </div>
</div>
```

Feel free to replace `my-modal-selector-class` with a unique class name (per modal).

### Requirements & Recommendations

- Modals have the role of "dialog"
- Modals have an aria-label (usually the H1)
- Modals follow heading level hierarchy
- Close button is the final element to tab through for keyboard users

---

## Methods

### `init`

Initialize Modals.js.

- Registers common class name for all Modal.js modals.
- Adds event listeners to the default close buttons, as well as the modal background.

```javascript
modal.init();
```

Use `options` object to override defaults, if desired.

```javascript
modal.init(options);
```

#### Options

The following tables represent key names for the `options` object:

##### `classNames`

|Property|Type|Default|Notes|
|:-|:-:|:-|:-|
|`dialogWindow`|string|`".dialog"`|Common class name for all modals.|
|`background`|string|`".dialog__background"`|Class name for modal background|
|`btnClose`|string|`".dialog__close"`|Common class name for all default close buttons (the `x` on the top right)|

##### `activeMod`

|Description|Type|Default|
|:-|:-:|:-|
|Class name modifier for active modals|string|`"-active"`|

---

### `open`

Activates target modal.

|Arguments|Type|Default|Notes|
|:-|:-:|:-:|:-|
|Selector|string|_N/A_|_Required_|
|Extra Classes|string|`""`|Comma separated list of classes to add to target modal|

```javascript
// Example 1
modal.open(".my-modal-selector");

// Example 2
modal.open(".my-modal-selector", "my-extra-class-1, my-other-extra-class");
```

---

### `close`

Deactivates target modal.

|Arguments|Type|Default|Notes|
|:-|:-:|:-:|:-|
|Selector|string|_N/A_|_Required_|
|Extra Classes|string|`""`|Comma separated list of classes to remove from target modal|

```javascript
// Example 1
modal.close(".my-modal-selector");

// Example 2
modal.close(".my-modal-selector", "my-extra-class-1, my-other-extra-class");
```

**NOTE:** To _always_ remove certain classes on close for a specific modal, add a comma separated list (with no spaces) to the dataset of the dialog element, `data-modal-reset-classes`.

```html
<div
    role="dialog"
    class="dialog drawn-card"
    aria-labelledby="drawn-card-title"
    data-modal-reset-classes="drawn-card--chance,drawn-card--community_chest"
>...</div>
```

---

I made this because I was bored.
