export class FetchData {
    constructor(path) {
        this.path = path;
    }

    async fetchDataFromJSON() {
        try {
            const getData = await fetch(this.path).then(getData => getData.json());
            return getData;
        } catch (error) {
            console.error(`Error fetching ${this.path}: `, error);
        }
    }
}