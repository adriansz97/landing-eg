import { createSlice } from '@reduxjs/toolkit';
import { english } from './english';
import { spanish } from './spanish';



export const langSlice = createSlice({
  name: 'lang',
  initialState: {
    lang: "MX",
    dictionary: spanish
  },
  reducers: {
    setLang: (state, { payload }) => {
      state.lang = payload;
      state.dictionary = payload === "MX" ? spanish : english
    }
  }
});

export const { setLang } = langSlice.actions;