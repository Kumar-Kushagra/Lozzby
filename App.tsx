import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Amplify} from 'aws-amplify';
import Toast from 'react-native-toast-message';
import {persistor, store} from './src/redux/Store';
import MainStack from './src/routes/MainStack';
import {NavigationRef} from './src/services/Routerservices';
import config from './src/aws-exports';
import NetInfo from "@react-native-community/netinfo";
const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

// Unsubscribe
unsubscribe();
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});



const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={NavigationRef}>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
      <Toast/>
    </Provider>
  );
};

export default App;
