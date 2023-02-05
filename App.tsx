import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Amplify} from 'aws-amplify';
import { LogBox, StatusBar } from 'react-native';
import {persistor, store} from './src/redux/Store';
import MainStack from './src/routes/MainStack';
import {NavigationRef} from './src/services/Routerservices';
import config from './src/aws-exports'
import Login from './src/containers/auth/Login';
import Signup from './src/containers/auth/Signup';

LogBox.ignoreAllLogs()

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle={"light-content"} backgroundColor="#6739A6"/>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={NavigationRef}>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
