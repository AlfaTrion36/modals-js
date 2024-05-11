// TODO: a11y Add focus trap
// TODO: a11y Prevent background scrolling
// TODO: a11y Give focus back to modal launching target
// TODO: Check if I missed other a11y TODOs...
// TODO: Unit tests
// TODO: TS version
// TODO: extra export for modal template generator(s)

// User may override these on init()
const defaultOptions = {
    classNames: {
        dialogWindow: '.dialog',
        background: '.dialog__background',
        btnClose: '.dialog__close',
        active: '-active',
    },
};

let options; // options object (see defaultOptions)
let $dialogBG; // background element for modals
let closeButtons = []; // array of close button elements

export default {
    init: function (userOptions = defaultOptions) {
        options = {
            ...defaultOptions,
            ...userOptions,
        };

        const { dialogWindow: dialogWindowClass } = options.classNames;
        $dialogBG = document.querySelector(options.classNames.background);
        closeButtons = document.querySelectorAll(options.classNames.btnClose);

        for (const $el of closeButtons) {
            $el.addEventListener('click', (e) => {
                toggle(e.target.closest(dialogWindowClass), '', 'remove');
            });
        }

        // Background click handler for ALL modals
        $dialogBG.addEventListener('click', () => {
            for (const $el of closeButtons) {
                if (
                    $el
                        .closest(dialogWindowClass)
                        .classList.contains(options.classNames.active)
                ) {
                    toggle($el.closest(dialogWindowClass), '', 'remove');
                }
            }
        });
    },

    open: (targetModal, extraClasses = '') => toggle(targetModal, extraClasses),

    // Gives the user the option to close a modal with other controls.
    close: (targetModal, extraClasses = '') =>
        toggle(targetModal, extraClasses, 'remove'),
};

/**
 * @private
 * @param {string | HTMLElement} targetModal - either the query selector or the
 *   element itself
 * @param {string} extraClasses - comma separated list of additional classes to
 *   add or remove
 * @param {string} addOrRemove - "add" or "remove" to open or close the modal
 */
function toggle(targetModal, extraClasses = '', addOrRemove = 'add') {
    const classes = [options.classNames.active];
    const $el =
        typeof targetModal !== 'string'
            ? targetModal
            : document.querySelector(targetModal);

    if (extraClasses !== '') {
        classes.push(extraClasses);
    }
    if (
        addOrRemove === 'remove' &&
        Object.keys($el.dataset).includes('modalResetClasses')
    ) {
        // TODO: I hate this, make this better for the user than using dataset
        classes.push(...$el.dataset.modalResetClasses.split(','));
    }

    // Toggle background and modal
    $dialogBG.classList[addOrRemove](options.classNames.active);
    $el.classList[addOrRemove](...classes);
}
