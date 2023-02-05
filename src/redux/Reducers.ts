import {combineReducers} from 'redux';

import AuthReducer from './auth';
import ThemeReducer from './theme';
import HomeReducer from './home';
import combineReducer from './common';

export default combineReducers({
  auth: AuthReducer,
  theme: ThemeReducer,
  home: HomeReducer,
  common: combineReducer,
});
