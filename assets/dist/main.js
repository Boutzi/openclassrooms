import { Project } from "./project.js";
import { Technology } from "./technology.js";
import { Data } from "./data.js";

const jsonPath = [
  "./assets/dist/data/projects.json",
  "./assets/dist/data/technologies.json"
];
const dataProjects = new Data(jsonPath[0]);
const dataTechnologies = new Data(jsonPath[1]);

dataProjects.fetchData().then((getData) => {
  getData.forEach((element) => {
      const project = new Project(element.id, element.repository, element.picture, element.technology, element.subtitle, element.success);
      project.createProject();
  });
});

dataTechnologies.fetchData().then((getData) => {
  getData.forEach((element) => {
    const techno = new Technology(element.name, element.about);
    techno.initializeTitle();
  });
});

console.log("Pourquoi tu regardes la console ?");
console.log("Tu cherches une erreur ?");
console.log("Désolé, il n'y en a pas ! ;)");