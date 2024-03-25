export class Routes {
    constructor(route) {
        this.route = route;
    }

    getRoute() {
        switch (this.route) {
            case "login":
                return "http://localhost:5678/api/users/login";
            case "categories":
                return "http://localhost:5678/api/categories"
            case "works":
                return "http://localhost:5678/api/works"
            default:
                return "";
        }
    }
}