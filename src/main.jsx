import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes"; // Importa las rutas
import { StoreProvider } from "./store.jsx"; // Importa el StoreProvider
import "./index.css"; // Importa los estilos globales

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);
