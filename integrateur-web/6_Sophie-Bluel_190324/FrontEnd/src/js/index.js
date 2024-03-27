import { openModalThenGenerateWorks } from "./modal.js";

export const works = await fetch("https://sophie-bluel-api-aa2d8b8c980b.herokuapp.com/api/works").then((response) => response.json());

const categories = await fetch("https://sophie-bluel-api-aa2d8b8c980b.herokuapp.com/api/categories").then((response) =>
  response.json()
);

const token = window.localStorage.getItem("token");
if (token) {
    const bodyChild = document.body.bodyChild;
    const header = document.querySelector(".header");
    header.classList.add("connected");
    const adminPanel = document.createElement("div");
    const adminContent = document.createElement("p")
    adminContent.innerText = "Mode édition";
    adminPanel.classList.add("admin-panel");
    document.body.insertBefore(adminPanel, bodyChild);
    adminPanel.appendChild(adminContent);
    const hideFilters = document.querySelector(".filters");
    hideFilters.classList.add("not-visible");
    const worksH2 = document.querySelector(".works-title");
    const modify = document.createElement("a");
    modify.classList.add("modify-works");
    modify.setAttribute("href", "./src/pages/modal.html#edit");
    modify.innerText = "Modifier"
    worksH2.appendChild(modify);
    const logMode = document.getElementById("logMode");
    logMode.innerText = "logout";
    logMode.removeAttribute("href");
    logMode.addEventListener("click", () => {
        window.localStorage.removeItem("token");
        window.location.href = "./";
    });
    document.querySelectorAll(".modify-works").forEach(a => {
        a.addEventListener("click", openModalThenGenerateWorks);
      });
}

function generateWorks(work) {
  const gallery = document.querySelector(".gallery");
  for (let i = 0; i < work.length; i++) {
    const figure = work[i];
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
}

function generateFilters(category) {
  const ul = document.querySelector(".filters");
  const liAll = document.createElement("li");
  liAll.classList.add("filters__item");
  liAll.classList.add(`cat0`);
  liAll.classList.add("filters--checked");
  liAll.innerText = "Tous";
  ul.appendChild(liAll);
  for (let i = 0; i < category.length; i++) {
    const filter = category[i];
    const li = document.createElement("li");
    li.classList.add("filters__item");
    li.classList.add(`cat${filter.id}`);
    li.innerText = filter.name;
    ul.appendChild(li);
    listenerFilters(li, filter.id);
  }
  listenerFilters(liAll, 0);
}

function listenerFilters(filter, id) {
  filter.addEventListener("click", () => {
    filterOnClick(id);
    filterIsChecked();
  });
}

function filterOnClick(id) {
  // const worksFiltered = await fetchAPI("works");
  // console.log(worksFiltered);
  // worksFiltered.filter(data =>
  //     id === 0 || data.categoryId == id
  // );
  // document.querySelector(".gallery").innerHTML = "";
  // generateWorks(worksFiltered);

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

