import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../store";

export const Single = () => {
  const { state } = useContext(StoreContext);
  const { theId } = useParams();
  
  // Convertimos `theId` a número para hacer la comparación correcta con `id`
  const singleCharacter = state.people.find(character => character.id === theId);

  if (!singleCharacter) {
    return <div className="container text-center"><h2>Personaje no encontrado.</h2></div>;
  }

  const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, imageUrl } = singleCharacter;

  return (
    <div className="container text-center mt-4">
      <h1 className="display-4 text-warning">{name}</h1>

      {/* Imagen del personaje con manejo de error */}
      <img 
        src={imageUrl} 
        alt={name} 
        style={{ width: '300px', height: 'auto', borderRadius: '8px', boxShadow: "0px 0px 10px rgba(255,255,255,0.5)" }}
        onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"} 
      />

      <div className="mt-3 text-light">
        <h3>Detalles</h3>
        <p><strong>Altura:</strong> {height}</p>
        <p><strong>Masa:</strong> {mass}</p>
        <p><strong>Color de cabello:</strong> {hair_color}</p>
        <p><strong>Color de piel:</strong> {skin_color}</p>
        <p><strong>Color de ojos:</strong> {eye_color}</p>
        <p><strong>Año de nacimiento:</strong> {birth_year}</p>
        <p><strong>Género:</strong> {gender}</p>
      </div>

      <Link to="/">
        <span className="btn btn-warning btn-lg mt-3">Volver al inicio</span>
      </Link>
    </div>
  );
};
