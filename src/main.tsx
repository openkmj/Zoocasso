import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);

Modal.setAppElement("#root");
