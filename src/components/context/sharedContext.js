"use client";
import { createContext, useContext, useReducer } from "react";
export const SharedContext = createContext();
export const useSharedContext = () => useContext(SharedContext);

const initialState = {
  user: {},
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
