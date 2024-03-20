import { Project } from "/assets/js/project.js";
import { Data } from "/assets/js/data.js";

const jsonPath = "assets/js/data/projects.json";
const dataProjects = new Data(jsonPath);

dataProjects.fetchData().then((getData) => {
  getData.forEach((element) => {
      const project = new Project(element.id, element.repository, element.picture, element.technology, element.subtitle, element.success);
      project.createProject();
  });
});

console.log("Pourquoi tu regardes la console ?");
console.log("Tu cherches une erreur ?");
console.log("Désolé, il n'y en a pas ! ;)");