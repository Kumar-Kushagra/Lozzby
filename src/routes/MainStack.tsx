import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {useDispatch, useSelector} from 'react-redux';
import {CustomStatusBar, FullScreenLoader} from '../components';
import {retrieveCurrentSessionManager} from '../redux/auth';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const userData = useSelector((state: any) => state.auth.userData);
  const theme = useSelector((state: any) => state.theme.theme);
  const refetch = useSelector((state: any) => state.auth.refetch);
  const mainLoading = useSelector((state: any) => state.auth.mainLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(retrieveCurrentSessionManager());
  }, [dispatch, refetch]);

  if (mainLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <CustomStatusBar light color={theme.primary} />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{headerShown: false}}>
        {userData ? (
          <Stack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
