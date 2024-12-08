import React, { createContext, useState, useContext } from "react";

// Create RefreshContext
export const RefreshContext = createContext();

// Provide RefreshContext to manage refresh state
export const RefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  // Function to trigger refresh
  const triggerRefresh = () => setRefresh((prev) => !prev);

  return (
    <RefreshContext.Provider value={{ refresh, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};


