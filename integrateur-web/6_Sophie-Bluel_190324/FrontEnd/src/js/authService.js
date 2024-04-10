export class AuthService {
    constructor(url) {
        this.url = url;
    }

    async connect(email, password) {
        const userInfos = {
            email: email,
            password: password,
          };
        const payload = JSON.stringify(userInfos);
        try {
            const response = await fetch(
                this.url + "/users/login",
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: payload,
                }
            );
            if (response.ok) {
                const user = await response.json();
                window.localStorage.setItem("token", user.token);
                window.localStorage.setItem("userId", user.userId);
                window.location.href = "../../";
            }
            return response;
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        }
    }

    disconnect() {
        window.localStorage.removeItem("token");
        window.location.href = "./";
    }
}