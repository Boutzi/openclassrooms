import { fetchModal, openModal } from "./modal.js";
import { api } from "./variables.js";
import { AuthService } from "./authService.js";
import { BackendService } from "./backendService.js";

const authServiceInstance = new AuthService(api);
const backendServiceInstance = new BackendService(api);

const works = await backendServiceInstance.getWorks();
const categories = await backendServiceInstance.getCategories();

let modal = null;

const token = window.localStorage.getItem("token");
if (token) {
  // create top edition bar
    const bodyChild = document.body.bodyChild;
    const header = document.querySelector(".header");
    header.classList.add("connected");
    const adminPanel = document.createElement("div");
    const adminContent = document.createElement("p")
    adminContent.innerText = "Mode édition";
    adminPanel.classList.add("admin-panel");
    document.body.insertBefore(adminPanel, bodyChild);
    adminPanel.appendChild(adminContent);
    // hide filters
    const hideFilters = document.querySelector(".filters");
    hideFilters.classList.add("not-visible");
    // create "edit" link on H2
    const worksH2 = document.querySelector(".works-title");
    const modify = document.createElement("a");
    modify.classList.add("modify-works");
    modify.setAttribute("href", "./src/pages/modal.html#edit");
    modify.innerText = "Modifier"
    worksH2.appendChild(modify);
    // change login for logout
    const logMode = document.getElementById("logMode");
    logMode.innerText = "logout";
    logMode.removeAttribute("href");
    logMode.addEventListener("click", () => {
      authServiceInstance.disconnect();
    });
    // listener openModal
    fetchModal("./src/pages/modal.html")
    document.querySelectorAll(".modify-works").forEach(a => {
        a.addEventListener("click", async (e) => {
          openModal();
          console.log("toto");
        });
      });
}

function generateWorks(works) {
  for (let i = 0; i < works.length; i++) {
    generateFigure(works[i])
  }
}

function generateFigure(figure) {
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

function generateFilters(category) {
  createFilter(0, "Tous", true);
  for (let i = 0; i < category.length; i++) {
    createFilter(category[i].id, category[i].name);
  }
}

function createFilter(id, name, isChecked = false) {
  const ul = document.querySelector(".filters");
  const li = document.createElement("li");
  li.classList.add("filters__item");
  li.classList.add(`cat${id}`);
  if (isChecked) {
    li.classList.add("filters--checked");
  }
  li.innerText = name;
  ul.appendChild(li);
  listenerFilters(li, id);
}

function listenerFilters(filter, id) {
  filter.addEventListener("click", () => {
    filterOnClick(id);
    filterIsChecked();
  });
}

function filterOnClick(id) {
  const worksFiltered = works.filter((data) => id === 0 || data.categoryId == id);
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(worksFiltered);
}

function filterIsChecked() {
  const filters = document.querySelectorAll(".filter__item");
  filters.forEach((element) => {
    if (element.classList.contains(`cat${element.id}`)) {
      console.log(element.name);
      element.classList.add("filters--checked");
    } else {
      element.classList.remove("filters--checked");
    }
  });
}
generateWorks(works);
generateFilters(categories);

