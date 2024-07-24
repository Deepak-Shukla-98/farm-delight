"use client";
import { createContext, useContext, useReducer } from "react";
export const SharedContext = createContext();
export const useSharedContext = () => useContext(SharedContext);
const arr =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart"))
    : false;

const initialState = {
  user: {},
  products_in_cart: !!arr ? arr : [],
  isAuthenticated: false,
};
const SharedReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_AUTH_STATE":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "UPDATE_CART":
      return {
        ...state,
        products_in_cart: action.payload,
      };
  }
};
export const SharedContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SharedReducer, initialState);
  return (
    <SharedContext.Provider value={{ state, dispatch }}>
      {children}
    </SharedContext.Provider>
  );
};
