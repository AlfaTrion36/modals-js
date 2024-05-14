import modalsJs from "modals-js";
modalsJs.init();

const modalTriggerEls = document.querySelectorAll(".example.ex-show-modal");

modalTriggerEls.forEach(($el) => {
    $el.addEventListener("click", () => {
        modalsJs.open();
    });
});
