import { setTheme } from "./themeSlice";

export const startSetTheme = () => (dispatch, getState) => {
  const { gTheme } = getState().theme;
  const newTheme = gTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  dispatch( setTheme(newTheme) );
}