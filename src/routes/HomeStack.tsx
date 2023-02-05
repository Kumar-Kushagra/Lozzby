import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../containers/Home';
import BottomBar from './BottomBar';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="BottomBar"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomBar" component={BottomBar} />
        
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
