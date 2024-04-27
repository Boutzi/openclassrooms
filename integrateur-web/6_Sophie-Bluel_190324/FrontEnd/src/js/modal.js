import { api } from "./variables.js";
import { BackendService } from "./backendService.js";

const backendServiceInstance = new BackendService(api);

const works = await backendServiceInstance.getWorks();

export class Modal {
  constructor() {
    this.modal = null;
    this.focusSelector = "button, a, input, textarea, select";
    this.focusables = [];
    this.previouslyFocused = null;
    this.closeModal = this.closeModal.bind(this);
    this.handleKeyDown();
  }

  displayModal(html) {
    document.body.insertAdjacentHTML("beforeend", html);
    this.modal = document.getElementById("modal");
    this.modal.style.display = "none";
    modal.addEventListener("click", this.closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", this.stopPropagation);
    this.modal.querySelector(".js-modal-close").addEventListener("click", this.closeModal);
  }

  fetchModal(url) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Une erreur est survenue lors du chargement de la fenêtre modale.");
        }
        return response.text();
      })
      .then((html) => this.displayModal(html));
  }

  openModal(works) {
    this.modal = document.getElementById("modal");
    if (this.modal) {
      this.modal.style.display = null;
      this.generateEdition(works);
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.style.display = "none";
      this.clearModalContent();
    }
  }

  clearModalContent() {
    const gallery = document.querySelector(".modal-wrapper__content");
    gallery.innerHTML = "";
    const headDiv = document.querySelector(".modal-wrapper__head");
    headDiv.innerHTML = "";
    const footerDiv = document.querySelector(".modal-wrapper__footer");
    footerDiv.innerHTML = "";
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  handleKeyDown() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        this.closeModal(e);
      }
    });
  }

  generateEdition(works) {
    for (let i = 0; i < works.length; i++) {
      this.createFigure(works[i]);
    }
    this.createTitleAndButton();
  }

  createFigure(works) {
    const gallery = document.querySelector(".modal-wrapper__content");
    const figure = works;
    const galleryFigure = document.createElement("figure");
    const galleryImg = document.createElement("img");
    const deleteButton = document.createElement("img");
    deleteButton.setAttribute("src", "./src/assets/icons/bin.svg");
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      backendServiceInstance.deletePhoto(works.id);
    });
    galleryImg.setAttribute("src", figure.imageUrl);
    galleryImg.setAttribute("alt", figure.title);
    gallery.appendChild(galleryFigure);
    galleryFigure.appendChild(galleryImg);
    galleryFigure.appendChild(deleteButton);
  }

  createTitleAndButton() {
    const headDiv = document.querySelector(".modal-wrapper__head");
    const addPhotoTitle = document.createElement("h2");
    addPhotoTitle.setAttribute("id", "modal-title");
    addPhotoTitle.innerText = "Galerie Photo";
    const footerDiv = document.querySelector(".modal-wrapper__footer");
    const addPhotoButton = document.createElement("button");
    addPhotoButton.classList.add("add-photo");
    addPhotoButton.innerText = "Ajouter une photo";
    addPhotoButton.addEventListener("click", () => {
      this.addPhotoMode();
    });
    headDiv.appendChild(addPhotoTitle);
    footerDiv.appendChild(addPhotoButton);
  }

  async loadEdition(target) {
    target.innerHTML = "";
    const html = await fetch("./src/pages/edit.html").then((response) => response.text());
    target.innerHTML = html;
    this.modal.querySelector(".js-modal-close").addEventListener("click", this.closeModal);
  }

  goBack() {
    const arrow = document.querySelector(".arrow-go-back");
    if (arrow) {
      arrow.addEventListener("click", () => {
        this.clearModalContent();
        const gallery = document.querySelector(".modal-wrapper__content");
        gallery.classList.remove("edit");
        gallery.classList.add("view");
        this.generateEdition(works);
        arrow.style.display = "none";
      });
    }
  }

  async addPhotoMode() {
    let filePath = "";
    const modalWrapper = document.querySelector(".modal-wrapper");
    await this.loadEdition(modalWrapper);
    this.getCategories();
    this.goBack();
    const getFileInput = document.getElementById("getFile");
    const validateButton = document.querySelector(".add-photo");
    validateButton.style.background = "#A7A7A7";
    getFileInput.addEventListener("change", function (e) {
      e.preventDefault();
      const uploadArea = document.querySelector(".upload-area");
      uploadArea.innerText = "";
      const imageUpload = document.createElement("img");
      imageUpload.setAttribute("src", getFileInput.value);
      imageUpload.classList.add("imageUpload");
      filePath = e.target.files[0];
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        imageUpload.setAttribute("src", event.target.result);
        uploadArea.appendChild(imageUpload);
      };
      if (file) {
        reader.readAsDataURL(file);
        validateButton.style.background = "#1D6154";
      }
    });
    const userFrom = document.getElementById("uploadNewWork");
    userFrom.addEventListener("submit", (e) => {
      try {
        e.preventDefault();
        const selectedIndex = e.target.querySelector("[name=categories]").selectedIndex + 1;
        const categoryId = selectedIndex.toString();
        const newPhotoSchema = {
          title: e.target.querySelector("[name=title]").value,
          file: filePath,
          categoryId: parseInt(categoryId),
        };
        backendServiceInstance.postPhoto(
          newPhotoSchema.file,
          newPhotoSchema.title,
          newPhotoSchema.categoryId
        );
      } catch (error) {
        throw new Error(error);
      }
    });
  }

  async getCategories() {
    const select = document.getElementById("categories");
    const categories = await fetch(`${api}/categories`).then((response) => response.json());
    categories.forEach((element) => {
      const option = document.createElement("option");
      option.innerText = element.name;
      select.appendChild(option);
    });
  }
}
