"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("");

  const handleChangeTheme = () => {
    if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.add("light");
    }
  };

  // useEffect(() => {
  //   handleChange();
  // }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export function useTheme() {
  const context = useContext(ThemeContext);

  
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
