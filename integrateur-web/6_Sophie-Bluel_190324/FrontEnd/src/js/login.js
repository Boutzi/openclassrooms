import { api } from "./variables.js";
import { AuthService } from "./authService.js";

const authServiceInstance = new AuthService(api);

async function connect() {
  const loginQuery = document.querySelector(".login");
  loginQuery.addEventListener("submit", async (event) => {
    event.preventDefault();
    let email = event.target.querySelector("[type=email]").value;
    let password = event.target.querySelector("[type=password]").value;
    const response = await authServiceInstance.connect(email, password);
    if (response.status === 401) {
        const loginError = document.getElementById("login-error");
        loginError.style.visibility = "visible";
      } else {
        console.error("Erreur lors de la tentative de connexion:", response.status);
      }
  });
}
connect();