import { api } from "./variables.js";
import { BackendService } from "./backendService.js";

const backendServiceInstance = new BackendService(api);

const works = await backendServiceInstance.getWorks();

let modal = null;
let isOpen = false;
const focusSelector = "button, a, input, textarea, select";
let focusables = [];
let previouslyFocused = null;

// export async function openModalThenGenerateWorks(e, state) {
//     e.preventDefault;
//     if (state == null) {
//         await openModal(e);
//         generateEdition(works);
//     }
//     return modal;
// }

// export const openModal = async function (e) {
//     if (modal == null) {
//         e.preventDefault();
//         const target = e.target.getAttribute("href");
//         // if (target.startsWith("#")) {
//         //     modal = document.querySelector(target);
//         // } else {
//         // }
//         modal = await loadModal(target);
//         focusables = Array.from(modal.querySelectorAll(focusSelector));
//         previouslyFocused = document.querySelector(":focus");
//         focusables[0].focus();
//         modal.removeAttribute('aria-hidden');
//         modal.setAttribute("aria-modal", "true");
//         modal.addEventListener("click", closeModal);
//         modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
//         modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
//     }
//     modal.style.display = null;
//   }

// const loadModal = async function (url) {
//     const target = "#" + url.split("#")[1]
//     const html = await fetch(url).then(response => response.text());
//     const element = document.createRange().createContextualFragment(html).querySelector(target);
//     if (element === null) {
//         throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`;
//     }
//     document.body.append(element);
//     return element;
// }

// const closeModal = function (e) {
//     // if (modal === null) return
//     // if (previouslyFocused !== null) previouslyFocused.focus();
//     e.preventDefault();
//     // modal.setAttribute('aria-hidden', "true");
//     // modal.removeAttribute("aria-modal");
//     // modal.removeEventListener("click", closeModal);
//     // modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
//     // modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
//     modal.style.display = "none";
// }

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

const gallery = document.querySelector(".modal-wrapper__content");

function generateEdition(edit) {
    const gallery = document.querySelector(".modal-wrapper__content");
    for (let i = 0; i < edit.length; i++) {
      const figure = edit[i];
      const galleryFigure = document.createElement("figure");
      const galleryImg = document.createElement("img");
      const deleteButton = document.createElement("img")
      deleteButton.setAttribute("src", "./src/assets/icons/bin.svg")
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        backendServiceInstance.deletePhoto(edit[i].id);
        });
      galleryImg.setAttribute("src", figure.imageUrl);
      galleryImg.setAttribute("alt", figure.title);
      gallery.appendChild(galleryFigure);
      galleryFigure.appendChild(galleryImg);
      galleryFigure.appendChild(deleteButton);
    }
    const headDiv = document.querySelector(".modal-wrapper__head");
    const addPhotoTitle = document.createElement("h2");
    addPhotoTitle.setAttribute("id", "modal-title");
    addPhotoTitle.innerText = "Galerie Photo";
    const footerDiv = document.querySelector(".modal-wrapper__footer");
    const addPhotoButton = document.createElement("button");
    addPhotoButton.classList.add("add-photo");
    addPhotoButton.innerText = "Ajouter une photo";
    addPhotoButton.addEventListener("click", () => {
        addPhotoMode();
    });
    headDiv.appendChild(addPhotoTitle);
    footerDiv.appendChild(addPhotoButton);
  }



async function addPhotoMode() {
    let filePath = "";
    const modalWrapper = document.querySelector(".modal-wrapper");
    await loadEdition(modalWrapper);
    getCategories();
        const getFileInput = document.getElementById("getFile");
        getFileInput.addEventListener("change", function(e) {
            e.preventDefault();
            const uploadArea = document.querySelector(".upload-area");
            uploadArea.innerText = "";
            const imageUpload = document.createElement("img");
            imageUpload.setAttribute("src", getFileInput.value)
            filePath = e.target.files[0];
            // // START GPT Solution
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                imageUpload.setAttribute("src", event.target.result);
                uploadArea.appendChild(imageUpload);
            };

            if (file) {
                reader.readAsDataURL(file);
            }
            // END GPT Solution
        });
    const userFrom = document.getElementById("uploadNewWork");
    userFrom.addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedIndex = e.target.querySelector("[name=categories]").selectedIndex + 1;
        const categoryId = selectedIndex.toString();
        const newPhotoSchema = {
            title: e.target.querySelector("[name=title]").value,
            file: filePath,
            categoryId: parseInt(categoryId)
        }
        // const payload = JSON.stringify(newPhotoSchema);
        // console.log(payload);
        backendServiceInstance.postPhoto(newPhotoSchema.file, newPhotoSchema.title, newPhotoSchema.categoryId);
    });
}


async function loadEdition(target) {
    target.innerHTML = "";
    const html = await fetch("./src/pages/edit.html").then(response => response.text());
    target.innerHTML = html;
}



async function getCategories() {
    const select = document.getElementById("categories");
    const categories = await fetch(`${api}/categories`).then(response => response.json());
    categories.forEach(element => {
        const option = document.createElement("option");
        option.innerText = element.name;
        select.appendChild(option);
    });
}

// -------------------------------------------

function displayModal(html) {
    document.body.insertAdjacentHTML("beforeend", html);
    modal = document.getElementById("modal");
    modal.style.display = "none";
    function closeModal() {
        modal.style.display = "none";
    }
    // modal.addEventListener("click", closeModal);
    // modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
}

export function fetchModal(url) {
    console.log("toto2");
    fetch(url).then(response => {
        if (!response.ok) {
            throw new Error("Une erreur est survenue lors du chargement de la fenêtre modale.");
        }
        return response.text()
    })
    .then(html => displayModal(html));
}

export function openModal() {
    modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "flex";
    }
}