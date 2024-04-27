import { api } from "./variables.js";
import { AuthService } from "./authService.js";
import { BackendService } from "./backendService.js";
import { Modal } from "./modal.js";

const backendServiceInstance = new BackendService(api);
const authServiceInstance = new AuthService(api);
const modalInstance = new Modal();

const works = await backendServiceInstance.getWorks();
const categories = await backendServiceInstance.getCategories();

export class Home {
  constructor() {}

  initializeApp(token) {
    this.checkToken(token);
    this.generateWorks(works);
    this.generateFilters(categories);
  }

  checkToken(token) {
    if (token) {
      this.createTopBar();
      this.hideFilters();
      this.createLinkOnH2();
      this.changeLogStatus();
      this.listenerToOpenModal();
    }
  }

  createTopBar() {
    const bodyChild = document.body.bodyChild;
    const header = document.querySelector(".header");
    header.classList.add("connected");
    const adminPanel = document.createElement("div");
    const adminIcon = document.createElement("img");
    adminIcon.setAttribute("src", "./src/assets/icons/edit-white.svg");
    const adminContent = document.createElement("p");
    adminContent.innerText = "Mode édition";
    adminPanel.classList.add("admin-panel");
    document.body.insertBefore(adminPanel, bodyChild);
    adminPanel.appendChild(adminIcon);
    adminPanel.appendChild(adminContent);
  }

  hideFilters() {
    const hideFilters = document.querySelector(".filters");
    hideFilters.classList.add("not-visible");
  }

  createLinkOnH2() {
    const worksH2 = document.querySelector(".works-title");
    const modify = document.createElement("a");
    modify.classList.add("modify-works");
    const modifyIcon = document.createElement("img");
    modifyIcon.classList.add("edit-icon");
    modifyIcon.setAttribute("src", "./src/assets/icons/edit.svg");
    modify.setAttribute("href", "./src/pages/modal.html#edit");
    modify.innerText = "Modifier";
    worksH2.appendChild(modifyIcon);
    worksH2.appendChild(modify);
  }

  changeLogStatus() {
    const logMode = document.getElementById("logMode");
    logMode.innerText = "logout";
    logMode.removeAttribute("href");
    logMode.addEventListener("click", () => {
      authServiceInstance.disconnect();
    });
  }

  listenerToOpenModal() {
    modalInstance.fetchModal("./src/pages/modal.html");
    document.querySelectorAll(".modify-works").forEach((a) => {
      a.addEventListener("click", async (e) => {
        e.preventDefault();
        modalInstance.openModal(works);
      });
    });
  }
  generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
      this.generateFigure(works[i]);
    }
  }

  generateFigure(figure) {
    const gallery = document.querySelector(".gallery");
    const galleryFigure = document.createElement("figure");
    const galleryImg = document.createElement("img");
    const galleryFigcaption = document.createElement("figcaption");
    galleryImg.setAttribute("src", figure.imageUrl);
    galleryImg.setAttribute("alt", figure.title);
    galleryFigcaption.innerText = figure.title;
    gallery.appendChild(galleryFigure);
    galleryFigure.appendChild(galleryImg);
    galleryFigure.appendChild(galleryFigcaption);
  }
  
  generateFilters(category) {
    this.createFilter(0, "Tous", true);
    for (let i = 0; i < category.length; i++) {
      this.createFilter(category[i].id, category[i].name);
    }
  }

  createFilter(id, name, isChecked = false) {
    const ul = document.querySelector(".filters");
    const li = document.createElement("li");
    li.classList.add("filters__item");
    li.classList.add(`cat${id}`);
    if (isChecked) {
      li.classList.add("filters--checked");
    }
    li.innerText = name;
    ul.appendChild(li);
    this.listenerFilters(li, id);
  }

  listenerFilters(filter, id) {
    filter.addEventListener("click", () => {
      this.filterOnClick(id);
    });
  }

  filterOnClick(id) {
    const worksFiltered = works.filter((data) => id === 0 || data.categoryId == id);
    document.querySelector(".gallery").innerHTML = "";
    this.generateWorks(worksFiltered);
    this.filterIsChecked(id);
  }

  filterIsChecked(id) {
    const filters = document.querySelectorAll(".filters__item");
    filters.forEach((element) => {
      if (element.classList.contains(`cat${id}`)) {
        element.classList.add("filters--checked");
      } else {
        element.classList.remove("filters--checked");
      }
    });
  }
}
