import { api } from "./index.js";

async function connect() {
  const loginQuery = document.querySelector(".login");
  loginQuery.addEventListener("submit", async (event) => {
    event.preventDefault();
    //create schema
    const userInfos = {
      email: event.target.querySelector("[name=email]").value,
      password: event.target.querySelector("[name=password]").value,
    };
    //transform object to json
    const payload = JSON.stringify(userInfos);
    //create POST request with data
    try {
      const response = await fetch(
        api + "/users/login",
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
      } else if (response.status === 401) {
        const loginError = document.getElementById("login-error");
        loginError.style.visibility = "visible";
      } else {
        console.error("Erreur lors de la tentative de connexion:", response.status);
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  });
}
connect();