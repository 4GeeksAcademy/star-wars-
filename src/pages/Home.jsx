import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [peopleWithImages, setPeopleWithImages] = useState([]);
  const [planetsWithImages, setPlanetsWithImages] = useState([]);
  const [vehiclesWithImages, setVehiclesWithImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar los datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch personajes
        const peopleResponse = await fetch("https://www.swapi.tech/api/people");
        const peopleData = await peopleResponse.json();
        const people = peopleData.results;

        const peopleWithImage = people.map((person) => {
          const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`;
          return { ...person, imageUrl };
        });
        setPeopleWithImages(peopleWithImage);

        // Fetch planetas
        const planetsResponse = await fetch("https://www.swapi.tech/api/planets");
        const planetsData = await planetsResponse.json();
        const planets = planetsData.results;

        const planetsWithImage = planets.map((planet) => {
          const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`;
          return { ...planet, imageUrl };
        });
        setPlanetsWithImages(planetsWithImage);

        // Fetch vehículos
        const vehiclesResponse = await fetch("https://www.swapi.tech/api/vehicles");
        const vehiclesData = await vehiclesResponse.json();
        const vehicles = vehiclesData.results;

        const vehiclesWithImage = vehicles.map((vehicle) => {
          const imageUrl = `https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`;
          return { ...vehicle, imageUrl };
        });
        setVehiclesWithImages(vehiclesWithImage);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Star Wars Universe</h1>

      <h2>People</h2>
      <ul>
        {peopleWithImages.map((person) => (
          <li key={person.uid}>
            <Link to={`/detail/people/${person.uid}`}>
              <img src={person.imageUrl} alt={person.name} width="100" />
              <h3>{person.name}</h3>
            </Link>
            <p>{person.description || "A person from the Star Wars universe."}</p>
          </li>
        ))}
      </ul>

      <h2>Planets</h2>
      <ul>
        {planetsWithImages.map((planet) => (
          <li key={planet.uid}>
            <Link to={`/detail/planet/${planet.uid}`}>
              <img src={planet.imageUrl} alt={planet.name} width="100" />
              <h3>{planet.name}</h3>
            </Link>
            <p>{planet.description || "A planet from the Star Wars universe."}</p>
          </li>
        ))}
      </ul>

      <h2>Vehicles</h2>
      <ul>
        {vehiclesWithImages.map((vehicle) => (
          <li key={vehicle.uid}>
            <Link to={`/detail/vehicle/${vehicle.uid}`}>
              <img src={vehicle.imageUrl} alt={vehicle.name} width="100" />
              <h3>{vehicle.name}</h3>
            </Link>
            <p>{vehicle.description || "A vehicle from the Star Wars universe."}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
