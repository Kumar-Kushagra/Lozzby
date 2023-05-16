import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {useDispatch, useSelector} from 'react-redux';
import {CustomStatusBar, FullScreenLoader} from '../components';
import {retrieveCurrentSessionManager} from '../redux/auth';
import NoInternet from '../containers/NoInternet';
import {setInternet} from '../redux/common';
import {useColorScheme} from 'react-native';
import {setTheme} from '../redux/theme';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  const userData = useSelector((state: any) => state.auth.userData);
  const theme = useSelector((state: any) => state.theme.theme);
  const refetch = useSelector((state: any) => state.auth.refetch);
  const mainLoading = useSelector((state: any) => state.auth.mainLoading);
  const dispatch = useDispatch();
  const [connected, setConnected] = useState(true);
  const color = useColorScheme();

  useEffect(() => {
    dispatch(setTheme(color));
  }, [color]);

  useEffect(() => {
    dispatch<any>(retrieveCurrentSessionManager());
  }, [dispatch, refetch]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setConnected(state.isConnected);
        dispatch(setInternet(state.isConnected));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (mainLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <CustomStatusBar light color={theme.primary} />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{headerShown: false}}>
        {connected ? (
          userData ? (
            <Stack.Screen name="HomeStack" component={HomeStack} />
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          )
        ) : (
          <Stack.Screen name="NoInternet" component={NoInternet} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
