import { createSlice } from '@reduxjs/toolkit';

// LARRABEZUA
// const infoClient = {
//   clientName: `Larrabezua Grupo Empresarial`,
//   phone: `8000438422`,
//   carousel: {
//     downText: `Te damos la bienvenida a la Línea Ética de Larrabezua Grupo Empresarial, la cual puede ser utilizada por colaboradores y proveedores relacionados. Si sabes de algún acto o conducta que viole nuestro Código de Ética, Política Anticorrupción, cualquier otra política, la moral o la ley, puedes denunciar a través de estos medios.`
//   },
//   beAgent: {
//     description: `Las denuncias serán recibidas por un tercero, quien recibirá los informes e iniciará su investigación.\nRecuerda que tu denuncia puede ser anónima, pero debe de estar basada en la buena fe. El uso adecuado de esta plataforma o de la línea telefónica es responsabilidad personal de cada uno de los denunciantes, el uso indebido de la misma o proporcionar información falsa constituye una falta grave y existirán consecuencias para quien sea sorprendido en alguno de estos actos.`
//   }
// }
// SURTIDORA
// const infoClient = {
//   clientName: "Surtidora Departamental"
// }
// ETHICS GLOBAL
const infoClient = {
  clientName: "EthicsGlobal"
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    infoClient,
    formType: "page", // "home" || "page" || "both"
  },
  reducers: {
    setTheme: (state, { payload }) => {
      state.gTheme = payload;
    },
    setThemeLS: (state, { payload }) => {
      state.gTheme = payload;
    },
  }
});

export const { setTheme, setThemeLS } = appSlice.actions;