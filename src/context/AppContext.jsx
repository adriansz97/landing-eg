import { createContext, useState } from "react";

export const AppContext = createContext();
export const ThemeContext = createContext();

export const AppProvider = ({ children }) => {

  const [clientName, setClientName] = useState("Surtidora Departamental");

  return (
    <AppContext.Provider value={
      {
        clientName
      }
    }>
      { children }
    </AppContext.Provider>
  )
}

export const ThemeProvider = ({ children }) => {

  const [primaryColor, setPrimaryColorState] = useState("#00bbb4");
  const [secondaryColor, setSecondaryColorState] = useState("#383a35");

  const setPrimaryColor = (color) => {
    setPrimaryColorState(color);
  }
  const setSecondaryColor = (color) => {
    setSecondaryColorState(color);
  }

  return (
    <ThemeContext.Provider value={
      {
        primaryColor,
        secondaryColor,
        setPrimaryColor,
        setSecondaryColor
      }
    }>
      { children }
    </ThemeContext.Provider>
  )
}