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
// const infoClient = {
//   clientName: "EthicsGlobal"



export const appSlice = createSlice({
  name: 'app',
  initialState: {
    "campaingName": "EthicsGlobal te escucha",
    "domain": "ethicsglobal.com",
    "channels": {
      "website": true,
      "phones": {
        "isActive": false,
        "listPhones": []
      },
      "email": {
        "email": null,
        "isActive": false
      },
      "whatsapp": {
        "phoneNumber": null,
        "isActive": false
      },
      "chat": {
        "text": null,
        "isActive": false
      },
      "app_mobile": {
        "text": null,
        "isActive": false
      },
      "phoneApp": false,
      "chatApp": {
        "text": null,
        "isActive": false
      }
    },
    "content": {
      "grievanceBtn": "Denunciar ahora",
      "trackBtn": "Seguimiento de la denuncia",
      "welcomeMsg": "Si eres testigo de alguna falta a nuestro Código de Ética, no dudes en denunciarlo a través de nuestros canales de denuncia:",
      "howFunction": {},
      "questions": [],
      "formTitle": "SEAMOS AGENTES DE CAMBIO",
      "formMsg": "Por medio de este sitio podrás denunciar aquellas conductas no éticas de manera sencilla, confidencial, segura y con la opción de hacerlo de forma anónima. El sistema es operado por un tercero independiente a EthicsGlobal, líder en el país y especialista en la gestión de denuncias y reportes (EthicsGlobal).",
      "trackingGrievanceTitle": "SEGUIMIENTO A TU DENUNCIA",
      "trackingGrievanceMsg": "En la Línea Ética, es posible mantenerte en contacto con las personas encargadas de atender tu caso y tener una conversación con ellas de forma anónima. Con tu folio de seguimiento mantente en contacto con tu organización e informado sobre la atención de tu reporte."
    },
    "colors": {
      "grievanceBtnColor": "#f5a623",
      "trackBtnColor": "#f5a623",
      "trackBtnHoverColor": "#f5a623",
      "primaryColor": "#009ed7",
      "secondaryColor": "#546e7a",
      "primaryTextColor": "#ffffff",
      "secondaryTextColor": "#ffffff"
    },
    "formType": "page", // "home" || "page" || "both"
    "innerWidth": 0,
    "innerHeight": 0,
    "size": "xs"
  },
  reducers: {
    setAppInfo: (state, { payload }) => {
      state.campaingName = payload.campaing_name;
      state.domain = payload.domain;
      state.channels = payload.channels;
      state.content = payload.content;
      state.colors = payload.colors;
    },
    setBrowserSize: (state, { payload }) => {
      state.innerWidth = payload.innerWidth;
      state.innerHeight = payload.innerHeight;
      state.size = payload.size;
    }
  }
});

export const { setAppInfo, setBrowserSize } = appSlice.actions;