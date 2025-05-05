import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = () => {
  const { type, uid } = useParams();
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
        const data = await response.json();
        setItemDetails(data.result);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchItemDetails();
  }, [type, uid]);

  if (!itemDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{itemDetails.name}</h1>
      {type === "people" && (
        <>
          <p>Gender: {itemDetails.gender}</p>
          <p>Birth Year: {itemDetails.birth_year}</p>
          <p>Height: {itemDetails.height} cm</p>
          <p>Mass: {itemDetails.mass} kg</p>
        </>
      )}

      {type === "planets" && (
        <>
          <p>Climate: {itemDetails.climate}</p>
          <p>Terrain: {itemDetails.terrain}</p>
          <p>Population: {itemDetails.population}</p>
        </>
      )}

      {type === "vehicles" && (
        <>
          <p>Model: {itemDetails.model}</p>
          <p>Manufacturer: {itemDetails.manufacturer}</p>
          <p>Speed: {itemDetails.max_atmosphering_speed} km/h</p>
        </>
      )}

      <img src={`https://starwars-visualguide.com/assets/img/${type}s/${uid}.jpg`} alt={itemDetails.name} width="300" />
    </div>
  );
};

export default Detail;
