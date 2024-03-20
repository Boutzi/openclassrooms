export class Data {
     constructor(path) {
        this.path = path;
    }

    async fetchData() {
        try {
            const response = await fetch(this.path);
            const getData = await response.json();
            return getData;
        } catch (error) {
            console.error("Error fetching projects: ", error);
        }
    }
}