import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import Footer from "./components/Footer";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Home />
    <Footer />
  </React.StrictMode>
);
