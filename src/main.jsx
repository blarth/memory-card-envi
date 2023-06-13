import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./index";

let root = document.getElementById("root");
root = createRoot(root);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
