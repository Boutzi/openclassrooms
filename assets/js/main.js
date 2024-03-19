// #region Project Class
class Project {
    constructor(id, repository, picture, technology, subtitle, success) {
      this.id = id;
      this.repository = repository;
      this.picture = picture;
      this.technology = technology;
      this.subtitle = subtitle;
      this.success = success;
    }
  
    createProject() {
      const mainContainer = document.querySelector(".main__container");
      const elementProject = document.createElement("a");
      elementProject.href = this.repository;
      const elementArticle = document.createElement("article");
      const elementPicture = document.createElement("div");
      const elementImg = document.createElement("img");
      elementImg.src = this.picture;
      const elementTechnologies = document.createElement("div");
      if (this.technology && this.technology.length > 0) {
        this.technology.forEach((tech) => {
          const techSVG = document.createElement("img");
          techSVG.src = `assets/images/${tech}.svg`;
          techSVG.alt = `Logo ${tech}`;
          elementTechnologies.appendChild(techSVG);
        });
      }
      const elementOverlay = document.createElement("div");
      const elementTxt = document.createElement("div");
      const elementTitle = document.createElement("h2");
      elementTitle.innerText = `Projet ${this.id}`;
      if (this.success == true) {
        const successMark = document.createElement("i");
        successMark.classList.add("fa-solid");
        successMark.classList.add("fa-square-check"); 
        elementTitle.appendChild(successMark);
      }
      const elementSubtitle = document.createElement("p");
      elementSubtitle.innerText = this.subtitle;
  
      elementProject.classList.add("project");
      elementArticle.classList.add("element");
      elementPicture.classList.add("element__picture");
      elementTechnologies.classList.add("technologies");
      elementOverlay.classList.add("overlay");
      elementTxt.classList.add("element__txt");
      elementTitle.classList.add("title");
      elementSubtitle.classList.add("subtitle");
  
      mainContainer.appendChild(elementProject);
      elementProject.appendChild(elementArticle);
      elementArticle.appendChild(elementPicture);
      elementPicture.appendChild(elementImg);
      elementPicture.appendChild(elementTechnologies);
      elementPicture.appendChild(elementOverlay);
      elementArticle.appendChild(elementTxt);
      elementTxt.appendChild(elementTitle);
      elementTxt.appendChild(elementSubtitle);
    }
  }
// #endregion

//#region json
const jsonPath =
  "https://gist.githubusercontent.com/Boutzi/95edd6c7fbd8f8c1125c4b992938ef7b/raw/dfd8fce194df315c06e04022534499f3cbff9765/oc-projects.json";

async function fetchProjects() {
    try {
        const response = await fetch(jsonPath);
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error("Error fetching projects: ", error);
    }
}

fetchProjects().then((projects) => {
    projects.forEach((element) => {
        const project = new Project(element.id, element.repository, element.picture, element.technology, element.subtitle, element.success);
        project.createProject();
    });
});
//#enregion

const emptyProjects = document.querySelectorAll(".project");

emptyProjects.forEach(element => {
    element.addEventListener("click", (event) => {
        if (element.getAttribute("href") === "#" || element.getAttribute("href") === "") {
            event.preventDefault();
            element.classList.add("project--empty");
        }
    });
});
