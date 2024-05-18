// User may override these on init()
const defaultOptions = {
    classNames: {
        dialogWindow: '.modalsJS',
        // background: '.modalsJS__background',
        btnClose: '.modalsJS__close',
    },
};

// Used to restore any previous overflow related styles on the body tag.
const store = {
    body: {},
};

let $body; // BODY element (see `store` object)
let options; // options object (see defaultOptions)
const closeButtons = []; // array of close button elements
// let $dialogBG; // background element for modals

export const ModalsJS = {
    init: function (userOptions = defaultOptions) {
        options = {
            ...defaultOptions,
            ...userOptions,
        };

        const { dialogWindow: dialogWindowClass, btnClose: btnCloseClass } =
            options.classNames;
        $body = document.querySelector('body');
        store.body.overflow = $body.style.overflow;
        closeButtons.push(...document.querySelectorAll(btnCloseClass));
        // $dialogBG = document.querySelector(options.classNames.background);

        // Close Button handler
        for (const $el of closeButtons) {
            $el.addEventListener('click', (e) => {
                toggle(e.target.closest(dialogWindowClass), '', 'remove');
            });
        }

        // Background click handler for ALL modals
        // $dialogBG.addEventListener('click', () => {
        //     for (const $el of closeButtons) {
        //         if (
        //             $el
        //                 .closest(dialogWindowClass)
        //                 .classList.contains(options.classNames.active)
        //         ) {
        //             toggle($el.closest(dialogWindowClass), '', 'remove');
        //         }
        //     }
        // });
    },

    open: (targetModal, extraClasses = '') => toggle(targetModal, extraClasses),

    // Gives the user the option to close a modal with other controls.
    close: (targetModal, extraClasses = '') =>
        toggle(targetModal, extraClasses, 'remove'),
};

/**
 * @private
 * @param {string | HTMLElement} targetModal - either the query selector or the
 *   element itself. Defaults to `options.classNames.dialogWindow`.
 * @param {string} extraClasses - comma separated list of additional classes to
 *   add or remove
 * @param {string} addOrRemove - "add" or "remove" to open or close the modal
 */
function toggle(
    targetModal = options.classNames.dialogWindow,
    extraClasses = '',
    addOrRemove = 'add'
) {
    const classes = [];
    const method = {
        add: 'showModal',
        remove: 'close',
    };
    const overflow = {
        // Prevent background scrolling
        add: () => ($body.style.overflow = 'hidden'),
        // Restore prev overflow styles
        remove: () => ($body.style.overflow = store.body.overflow),
    };
    const $modalEl =
        typeof targetModal !== 'string'
            ? targetModal
            : document.querySelector(targetModal);

    if (extraClasses !== '') {
        classes.push(extraClasses);
    }
    if (
        addOrRemove === 'remove' &&
        Object.keys($modalEl.dataset).includes('modalResetClasses')
    ) {
        // TODO: I hate this, make this better for the user than using dataset
        classes.push(...$modalEl.dataset.modalResetClasses.split(','));
    }

    // Toggle overflow, modal, and extra classes
    // $dialogBG.classList[addOrRemove](options.classNames.active);
    overflow[addOrRemove]();
    $modalEl.classList[addOrRemove](...classes);
    $modalEl[method[addOrRemove]]();
}
