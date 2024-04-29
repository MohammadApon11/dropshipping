import React, { createContext, useContext, useState } from "react";
import useGlobal from "../Hooks/useGlobal";

const globalContext = createContext();

export function GlobalProvider({ children }) {
  const gbValue = useGlobal(); // Get global data
  const [cartUpdateFlag, setCartUpdateFlag] = useState(false); // Initialize the state
  const updateCart = () => {
    setCartUpdateFlag((prev) => !prev);
  };
  const [totalPrice, setTotalPrice] = useState(""); // Initialize the state
  return (
    <globalContext.Provider
      value={{
        ...gbValue,
        cartUpdateFlag,
        setCartUpdateFlag,
        updateCart,
        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

// Custom hook to use the global context
export function useGlobalCtx() {
  return useContext(globalContext);
}
