import { createSlice } from '@reduxjs/toolkit';

// LARRABEZUA
// const primaryColor = "#1E419A";
// const secondaryColor = "#FFFFFF";
// const primaryColorText = "#FFFFFF";
// const secondaryColorText = "#000000";
// SURTIDORA
// const primaryColor = "#00bbb4";
// const secondaryColor = "#383a35";
// const primaryColorText = "#FFFFFF";
// const secondaryColorText = "#FFFFFF";
// SURTIDORA
const primaryColor = "#009ED7";
const secondaryColor = "#546E7A";
const primaryColorText = "#FFFFFF";
const secondaryColorText = "#FFFFFF";

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    gTheme: 'light',
    primaryColor,
    secondaryColor,
    primaryColorText,
    secondaryColorText,
  },
  reducers: {
    // setTheme: (state, { payload }) => {
    //   state.gTheme = payload;
    // },
    // setThemeLS: (state, { payload }) => {
    //   state.gTheme = payload;
    // },
  }
});

// export const { setTheme, setThemeLS } = themeSlice.actions;