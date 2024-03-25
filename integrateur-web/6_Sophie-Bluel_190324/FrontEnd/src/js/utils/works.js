export class Works {
    constructor(title, imageUrl, categoryId, userId, category) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.categoryId = categoryId;
        this.userId = userId;
        this.category = category;
    }
    createWork() {
        const gallery = document.querySelector(".gallery");
        const galleryFigure = document.createElement("figure");
        const galleryImg = document.createElement("img");
        const galleryFigcaption = document.createElement("figcaption");
        galleryImg.setAttribute("src", this.imageUrl);
        galleryImg.setAttribute("alt", this.title);
        galleryFigcaption.innerText = this.title;
        gallery.appendChild(galleryFigure);
        galleryFigure.appendChild(galleryImg);
        galleryFigure.appendChild(galleryFigcaption);
    }
}