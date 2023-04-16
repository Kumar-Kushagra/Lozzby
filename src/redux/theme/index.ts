import {createSlice} from '@reduxjs/toolkit';

import {light_theme, dark_theme} from '../../theme';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light',
    theme: light_theme,
  },
  reducers: {
    setTheme(state, action) {
      if (action.payload === 'light') {
        state.mode = 'light';
        state.theme = light_theme;
      } else {
        state.mode = 'dark';
        state.theme = dark_theme;
      }
    },
  },
});

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;
