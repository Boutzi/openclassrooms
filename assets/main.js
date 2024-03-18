const emptyProjects = document.querySelectorAll(".project");

emptyProjects.forEach(project => {
    project.addEventListener("click", (event) => {
        if (project.getAttribute("href") === "#" || project.getAttribute("href") === "") {
            event.preventDefault();
            project.classList.add("project--empty");
        }
    });
});