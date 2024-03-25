export class Categories {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.initializeFilter();
    }

    initializeFilter() {
        const ul = document.querySelector(".filters");
        const li = document.createElement("li");
        li.classList.add("filters__item");
        li.classList.add(`cat${this.id}`);
        li.innerText = this.name;
        if (this.id == 0) {
            li.classList.add("filters--checked");
        }
        ul.appendChild(li);
        this.listener(li);
    }

    listener(item) {
        item.addEventListener("click", () => {
            this.filterIsChecked();
            this.filterClick();
        })
    }

    filterClick() {
        fetch("http://localhost:5678/api/works")
        .then(response => {
            return response.json()})
        .then((getData) => {
            const result = getData.filter(data => data.category.id == this.id);
            console.log(result);
        })
    }

    filterIsChecked() {
        const categoryList = document.querySelectorAll(".filters__item");
        categoryList.forEach(element => {
            if (element.classList.contains(`cat${this.id}`)) {
                console.log(this.name);
                element.classList.add("filters--checked");
            }
            else {
                element.classList.remove("filters--checked");
            }
        });
    }
}