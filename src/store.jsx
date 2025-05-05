import React, { createContext, useState, useEffect } from "react";

const BASE_URL = "https://www.swapi.tech/api";

const getDataFromAPI = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) throw new Error(`Error fetching ${endpoint}`);
        const data = await response.json();

        const items = data.results;

        const detailedItems = await Promise.all(
            items.map(async (item) => {
                const detailResp = await fetch(item.url);
                const detailData = await detailResp.json();

                return {
                    ...detailData.result,
                    uid: item.uid,
                    name: item.name
                };
            })
        );

        return detailedItems;
    } catch (error) {
        console.error("Error fetching data from API:", error);
        return [];
    }
};



const addImageAndDescription = (type, items) => {
    return items.map((item) => {
        let imageUrl = "";

        if (type === "people") {
            imageUrl = `https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`;
        } else if (type === "planets") {
            imageUrl = `https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`;
        } else if (type === "vehicles") {
            imageUrl = `https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`;
        }
        console.log("Image URL:", imageUrl);
        return {
            ...item,
            imageUrl,
            type
        };
    });
};

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [state, setState] = useState({
        people: [],
        planets: [],
        vehicles: [],
        favorites: [],
        isLoading: true,
    });

    const loadData = async () => {
        const [people, planets, vehicles] = await Promise.all([
            getDataFromAPI("people"),
            getDataFromAPI("planets"),
            getDataFromAPI("vehicles"),
        ]);

        setState({
            people: addImageAndDescription("people", people),
            planets: addImageAndDescription("planets", planets),
            vehicles: addImageAndDescription("vehicles", vehicles),
            favorites: [],
            isLoading: false,
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    const addFavorite = (item) => {
        setState((prevState) => ({
            ...prevState,
            favorites: prevState.favorites.some((fav) => fav.uid === item.uid)
                ? prevState.favorites
                : [...prevState.favorites, item],
        }));
    };

    const removeFavorite = (uid) => {
        setState((prevState) => ({
            ...prevState,
            favorites: prevState.favorites.filter((fav) => fav.uid !== uid),
        }));
    };

    return (
        <StoreContext.Provider value={{ state, addFavorite, removeFavorite }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
