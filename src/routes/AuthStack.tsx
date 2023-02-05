import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../containers/auth/Login';
import Signup from '../containers/auth/Signup';
import VerifyOtp from '../containers/auth/VerifyOtp';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
