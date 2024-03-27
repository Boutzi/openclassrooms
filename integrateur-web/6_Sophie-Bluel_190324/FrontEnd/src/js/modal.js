let modal = null;
const focusSelector = "button, a, input, textarea, select";
let focusables = [];
let previouslyFocused = null;

export const openModal = async function (e) {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    if (target.startsWith("#")) {
        modal = document.querySelector(target);
    } else {
        modal = await loadModal(target);
    }
    focusables = Array.from(modal.querySelectorAll(focusSelector));
    previouslyFocused = document.querySelector(":focus");
    focusables[0].focus();
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  }

const loadModal = async function (url) {
    const target = "#" + url.split("#")[1]
    const html = await fetch(url).then(response => response.text());
    const element = document.createRange().createContextualFragment(html).querySelector(target);
    if (element === null) {
        throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`;
    }
    document.body.append(element);
    return element;
}

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocused !== null) previouslyFocused.focus();
    e.preventDefault();
    modal.setAttribute('aria-hidden', "true");
    modal.removeAttribute("aria-modal");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal.style.display = "none";
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

const focusInModal = function (e) {
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
    if (e.shiftKey === true) {
        index--;
    } else {
        index++;
    }
    if (index >= focusables.length) {
        index = 0;
    }
    if (index < 0) {
        index = focusables.length -1;
    }
    focusables[index].focus();
 }

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e);
    }
})