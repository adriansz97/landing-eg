
import { configureStore } from '@reduxjs/toolkit';
import { langSlice } from './lang/langSlice';
import { themeSlice } from './theme/themeSlice';
import { appSlice } from './app/appSlice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    theme: themeSlice.reducer,
    lang: langSlice.reducer,
  }
})
