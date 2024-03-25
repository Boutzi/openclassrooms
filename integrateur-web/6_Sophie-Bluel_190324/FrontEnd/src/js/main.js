import { Routes } from "./utils/routes.js";
import { FetchData } from "./utils/fetchData.js";
import { Works } from "./utils/works.js";
import { Categories } from "./utils/categories.js";

// GET WORKS
const works = new Routes("works");
const fetchWorks = new FetchData(works.getRoute());

fetchWorks.fetchDataFromJSON()
.then((getData) => {
    getData.forEach((element) => {
        const work = new Works(element.title, element.imageUrl, element.categoryId, element.userId, element.category);
        work.createWork();
    } )
})

// GET CATEGORIES
const categories = new Routes("categories");
const fetchCategories = new FetchData(categories.getRoute());

fetchCategories.fetchDataFromJSON()
.then((getData) => {
    new Categories(0, "Tous");
    getData.forEach((element) => {
        new Categories(element.id, element.name);
    });
});

