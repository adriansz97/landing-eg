import { createContext, useState } from "react";

export const AppContext = createContext();
export const ThemeContext = createContext();

const preInfoClient = {
  clientName: `Larrabezua Grupo Empresarial`,
  phone: `8000438422`,
  carousel: {
    downText: `Te damos la bienvenida a la Línea Ética de Larrabezua Grupo Empresarial, la cual puede ser utilizada por colaboradores y proveedores relacionados. Si sabes de algún acto o conducta que viole nuestro Código de Ética, Política Anticorrupción, cualquier otra política, la moral o la ley, puedes denunciar a través de estos medios.`
  },
  beAgent: {
    description: `Las denuncias serán recibidas por un tercero, quien recibirá los informes e iniciará su investigación.\nRecuerda que tu denuncia puede ser anónima, pero debe de estar basada en la buena fe. El uso adecuado de esta plataforma o de la línea telefónica es responsabilidad personal de cada uno de los denunciantes, el uso indebido de la misma o proporcionar información falsa constituye una falta grave y existirán consecuencias para quien sea sorprendido en alguno de estos actos.`
  }
}

const prePrimaryColor = "#1E419A";
const preSecondaryColor = "#FFFFFF";
const prePrimaryColorText = "#FFFFFF";
const preSecondaryColorText = "#000000";

export const AppProvider = ({ children }) => {

  // const preInfoClient = {
  //   clientName: "Surtidora Departamental"
  // }

  const [infoClient, setInfoClient] = useState(preInfoClient);

  return (
    <AppContext.Provider value={
      {
        infoClient
      }
    }>
      { children }
    </AppContext.Provider>
  )
}

export const ThemeProvider = ({ children }) => {

  // Surtidora
  // const prePrimaryColor = "#00bbb4";
  // const preSecondaryColor = "#383a35";
  // const prePrimaryColorText = "#ffffff";
  // const preSecondaryColorText = "#000000";

  const [primaryColor, setPrimaryColorState] = useState(prePrimaryColor);
  const [secondaryColor, setSecondaryColorState] = useState(preSecondaryColor);
  const [primaryColorText, setPrimaryColorTextState] = useState(prePrimaryColorText);
  const [secondaryColorText, setSecondaryColorTextState] = useState(preSecondaryColorText);

  const setPrimaryColor = (color) => setPrimaryColorState(color);
  const setSecondaryColor = (color) => setSecondaryColorState(color);
  const setPrimaryColorText = (color) => setPrimaryColorTextState(color);
  const setSecondaryColorText = (color) => setSecondaryColorTextState(color);
  
  return (
    <ThemeContext.Provider value={
      {
        primaryColor,
        secondaryColor,
        primaryColorText,
        secondaryColorText,
        setPrimaryColor,
        setSecondaryColor,
        setPrimaryColorText,
        setSecondaryColorText,
      }
    }>
      { children }
    </ThemeContext.Provider>
  )
}