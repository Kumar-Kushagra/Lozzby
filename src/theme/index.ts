export const dark_theme = {
  background: '#000000',
  textcolor: '#ffffff',
  primary: '#6739A6',
  primary_light: '#FB4040',
  accent: '#343434',
  light_accent: '#606060',
  inputbackground: '#344955',
  textinput: '#9A9A9A',
  errorcolor: '#FF5252',
  green: '#1BE090',
  successcolor: '#00C853',
  infocolor: '#63c0df',
  white: '#ffffff',
  titlecolor: '#000000',
  black: '#000000',
  light_green: '#6CD872',
  subtitle: '#A9A8A8',
  accenttextcolor: '#F1F8FE',
  yellow: '#F4C343',
  backgroundcolor: '#333333',
  buttonbackground: '#6739A6',
  lightGrey: '#f2f5f5',
  light_grey: '#F0F0F0',
  productTitle : "#ffffff",
  productSubTitle : "grey"
};

export const light_theme = {
  background: '#FFFFFF',
  textcolor: '#000000',
  primary: '#6739A6',
  primary_light: '#FB4040',
  accent: '#343434',
  light_accent: '#606060',
  inputbackground: '#344955',
  textinput: '#9A9A9A',
  errorcolor: '#FF5252',
  green: '#228B22',
  successcolor: '#00C853',
  infocolor: '#63c0df',
  white: '#ffffff',
  titlecolor: 'lavender',
  black: '#000000',
  light_green: '#6CD872',
  subtitle: '#A9A8A8',
  accenttextcolor: '#F1F8FE',
  yellow: '#F4C343',
  backgroundcolor: '#333333',
  buttonbackground: '#6739A6',
  productTitle : "#6739A6",
  productSubTitle : "#000000"
};

const themeStore = {
  theme: dark_theme,
  currentTheme: 'dark',
  userTheme: false,
};

export default themeStore;
