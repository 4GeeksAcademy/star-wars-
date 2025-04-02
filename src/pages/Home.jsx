import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../store";

const Home = () => {
    const { state, addFavorite, removeFavorite } = useContext(StoreContext);
    const { people, planets, vehicles, isLoading } = state; // Asegúrate de tener isLoading en tu estado

    // Mostrar mensaje de carga solo si los datos no están cargados
    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Star Wars</h1>

            <h2>People</h2>
            <ul>
                {people.map((person) => (
                    <li key={person.uid}> {/* Usamos `uid` como clave */}
                        <Link to={`/detail/${person.uid}`}>
                            <img src={person.imageUrl} alt={person.name} width="100" />
                            <h3>{person.name}</h3>
                        </Link>
                        <p>{person.description}</p>
                        <button onClick={() => addFavorite(person)}>Add to Favorites</button>
                    </li>
                ))}
            </ul>

            <h2>Planets</h2>
            <ul>
                {planets.map((planet) => (
                    <li key={planet.uid}> {/* Usamos `uid` como clave */}
                        <Link to={`/detail/${planet.uid}`}>
                            <img src={planet.imageUrl} alt={planet.name} width="100" />
                            <h3>{planet.name}</h3>
                        </Link>
                        <p>{planet.description}</p>
                        <button onClick={() => addFavorite(planet)}>Add to Favorites</button>
                    </li>
                ))}
            </ul>

            <h2>Vehicles</h2>
            <ul>
                {vehicles.map((vehicle) => (
                    <li key={vehicle.uid}> {/* Usamos `uid` como clave */}
                        <Link to={`/detail/${vehicle.uid}`}>
                            <img src={vehicle.imageUrl} alt={vehicle.name} width="100" />
                            <h3>{vehicle.name}</h3>
                        </Link>
                        <p>{vehicle.description}</p>
                        <button onClick={() => addFavorite(vehicle)}>Add to Favorites</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
