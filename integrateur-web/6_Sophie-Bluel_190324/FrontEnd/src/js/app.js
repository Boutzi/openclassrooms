import { Home } from "./home.js";

const token = window.localStorage.getItem("token");

const homeInstance = new Home();

homeInstance.initializeApp(token);