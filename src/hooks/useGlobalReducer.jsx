// src/hooks/useGlobalReducer.jsx

import { useContext, useReducer, createContext } from 'react';

const StoreContext = createContext(); 
const useGlobalReducer = () => {

};

const initialStore = {
  people: [],
  planets: [],
  vehicles: [],
  favorites: [],
};

export default { useGlobalReducer, initialStore };  
