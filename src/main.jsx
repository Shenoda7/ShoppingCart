import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import ShoppingCartProvider from "./Context/index.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <ShoppingCartProvider>
      <App />
    </ShoppingCartProvider>
  </HashRouter>
);
