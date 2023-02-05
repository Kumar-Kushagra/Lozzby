import React from 'react';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';

const CustomStatusBar = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);

  return (
    <StatusBar
      backgroundColor={props.color ? props.color : theme.primary_light}
      barStyle={props.light ? 'light-content' : 'dark-content'}
    />
  );
};

export default CustomStatusBar;
