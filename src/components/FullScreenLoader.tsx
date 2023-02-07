import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {useSelector} from 'react-redux';

const FullScreenLoader = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  );
};

export default FullScreenLoader;
