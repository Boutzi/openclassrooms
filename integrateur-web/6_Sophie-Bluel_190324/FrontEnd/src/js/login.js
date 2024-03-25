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
    const user = await fetch("https://sophie-bluel-api-aa2d8b8c980b.herokuapp.com/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    })
    .then(response => response.json());
    window.localStorage.setItem("token", user.token);
    window.location.href = "../../"
  });
}
connect();