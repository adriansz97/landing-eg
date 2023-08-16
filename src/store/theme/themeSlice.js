import { createSlice } from '@reduxjs/toolkit';

const colors = {
  ethicsBlue: "#009ED7",
  blueGray: "#BDCAD0",
  oxfordBlue: "#152235",
  white: "#FFFFFF",
  blueGray50: "#f3f7fa",
  blueGray100: "#e6ebef",
  blueGray200: "#d3dbe1",
  blueGray500: "#b5c0c8",
  blueGray600: "#909ca4",
  blueGray700: "#5c666e",
  blueGray800: "#262f38",
  raisinBlack: "#0D0C11",
  dark: "#141319",
  dark700: "#2C2C3A",
  dark800: "#242836",
  dark900: "#1a1d27",
  charcoalGrey: "#383941",
  charcoalGrey600: "#32384D",
  blue: "#3181ff",
  green: "#44cb67",
  yellow: "#ffaf00",
  red: "#de463d",
  teal: "#007b6f",
  purple: "#7c4dff",
  pink: "#d81b60",
  lime: "#cddc39",
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    gTheme: 'light',
    colors
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

export const { setTheme, setThemeLS } = themeSlice.actions;