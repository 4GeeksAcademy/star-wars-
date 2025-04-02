import React, { createContext, useState, useEffect } from "react";

// URL base de la API de Star Wars
const BASE_URL = "https://swapi.dev/api/";

const getDataFromAPI = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error(`Error fetching ${endpoint}`);
        const data = await response.json();

        // Extrae el ID desde la URL (porque SWAPI no usa "uid")
        return data.results.map((item) => {
            const id = item.url.match(/\/(\d+)\/$/)[1]; // Extrae el número ID de la URL
            return { ...item, id };
        });
    } catch (error) {
        console.error("Error fetching data from API:", error);
        return [];
    }
};

// Función para agregar imágenes y descripciones predeterminadas
const addImageAndDescription = (type, items) => {
    return items.map((item, index) => {
        let imageUrl = "";

        if (type === "people") {
            imageUrl = `https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`; // Usa el índice en vez de `uid`
        } else if (type === "planets") {
            imageUrl = `https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`;
        } else if (type === "vehicles") {
            imageUrl = `https://starwars-visualguide.com/assets/img/vehicles/${index + 1}.jpg`;
        }

        return {
            ...item,
            imageUrl
        };
    });
};

// Crear el contexto
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [state, setState] = useState({
        people: [],
        planets: [],
        vehicles: [],
        favorites: [],
        isLoading: true, // Estado para verificar si los datos están cargando
    });

    // Cargar datos de la API y añadir imágenes/descripciones
    const loadData = async () => {
        const [people, planets, vehicles] = await Promise.all([
            getDataFromAPI("people/"),
            getDataFromAPI("planets/"),
            getDataFromAPI("vehicles/"),
        ]);

        setState({
            people: addImageAndDescription("people", people),
            planets: addImageAndDescription("planets", planets),
            vehicles: addImageAndDescription("vehicles", vehicles),
            favorites: [],
            isLoading: false, // Los datos han sido cargados
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    // Agregar a favoritos
    const addFavorite = (item) => {
        setState((prevState) => ({
            ...prevState,
            favorites: prevState.favorites.some((fav) => fav.id === item.id)
                ? prevState.favorites
                : [...prevState.favorites, item],
        }));
    };

    // Remover de favoritos
    const removeFavorite = (id) => {
        setState((prevState) => ({
            ...prevState,
            favorites: prevState.favorites.filter((fav) => fav.id !== id),
        }));
    };

    return (
        <StoreContext.Provider value={{ state, addFavorite, removeFavorite }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
