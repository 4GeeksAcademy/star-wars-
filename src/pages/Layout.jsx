// src/pages/Layout.jsx
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        {/* El contenido de las rutas hijas se renderizará aquí */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
