export class BackendService {
    constructor(url) {
        this.url = url;
    }

    async getWorks() {
        try {
            const response = await fetch(this.url + "/works");
            if (response.ok) {
                return response.json();
            } else {
                console.log("Cannot find works");
                return null;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCategories() {
        try {
            const response = await fetch(this.url + "/categories");
            if (response.ok) {
                return response.json();
            } else {
                console.log("Cannot find categories");
                return null;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async postPhoto(file, title, category) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("category", category);
        await fetch(`${this.url}/works`, {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${window.localStorage.getItem("token")}` 
            },
            body: formData,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }    

    async deletePhoto(index) {
        await fetch(`${this.url}/works/${index}`, {
            method: "DELETE",
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}` 
            }
        })
    }
}