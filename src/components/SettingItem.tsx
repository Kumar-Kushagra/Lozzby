import React, { useState, useMemo, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { getScreenHeight } from '../utils/domUtils';

const SettingItem = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.5}
      style={{
        alignItems: 'center',
        height: getScreenHeight(5),
        marginTop: getScreenHeight(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: getScreenHeight(2),
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
      }}>
      <Text
        style={{
          color: theme.textcolor,
          fontSize: getScreenHeight(2),
          fontWeight: '500',
        }}>
        {props.title}
      </Text>
      <FastImage
      tintColor={theme.textcolor}
        source={require('../assets/images/back.png')}
        style={{
          height: getScreenHeight(2),
          width: getScreenHeight(2),
          transform: [{ rotate: '180deg' }],
        }}
      />
    </TouchableOpacity>
  )
}
export default SettingItem