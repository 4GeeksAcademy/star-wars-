import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home"; // Asegúrate de que Home se importe correctamente.
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

// Definimos las rutas y cómo se deben renderizar
export const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
          {/* Aquí las rutas anidadas */}
          <Route index element={<Home />} />  {/* Uso de index para la ruta raíz */}
          <Route path="/single/:theId" element={<Single />} />  {/* Ruta dinámica para items individuales */}
          <Route path="/demo" element={<Demo />} />  {/* Ruta Demo */}
      </Route>
  )
);
