
import { configureStore } from '@reduxjs/toolkit';
// import { langSlice } from './lang/langSlice';
import {  } from './app/appSlice';
import { appSlice } from './app/appSlice';
import { themeSlice } from './theme/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    app: appSlice.reducer,
    // lang: langSlice.reducer,
  }
})
