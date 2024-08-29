"use client";
import React, { createContext, useState, useContext } from "react";
import themes from "./themes";

// Define context
export const GlobalContext = createContext();
export const GlobalContextUpdate = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];

  return (
    <GlobalContext.Provider value={{ theme }}>
      {/* Use Provider correctly for context update */}
      <GlobalContextUpdate.Provider value={setSelectedTheme}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

// Custom hooks to use context values
export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalContextUpdate);
