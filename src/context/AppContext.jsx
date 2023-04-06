import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProviderCst = ({ children }) => {

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