import React, {useMemo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {back} from '../constants/images';
import {goBack} from '../services/Routerservices';
import {getScreenHeight} from '../utils/domUtils';
import CartCount from './CartCount';

const CustomHeader = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={{...styles.screen}}>
      {props.hide ? (
        <View style={styles.imageContanier} />
      ) : (
        <TouchableOpacity onPress={goBack} style={styles.imageContanier}>
          <FastImage
            tintColor={theme.white}
            source={back}
            style={styles.image}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{props.title}</Text>
      {/* {props.cart ? (
        <View style={styles.imageContanier} />
      ) : (
        <TouchableOpacity onPress={props.onCartPress} style={styles.imageContanier}>
          <FastImage
            tintColor={theme.white}
            source={require("../assets/images/cart.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      )} */}

      {props.cart ? props.cart : <View style={styles.imageContanier} />}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      height: getScreenHeight(6),
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.primary,
      flexDirection: 'row',
      paddingHorizontal: getScreenHeight(2),
    },
    title: {
      fontSize: getScreenHeight(2.3),
      color: theme.white,
      fontWeight: '500',
    },
    imageContanier: {
      width: getScreenHeight(4),
      height: getScreenHeight(4),
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: getScreenHeight(2),
      width: getScreenHeight(2),
    },
  });

export default CustomHeader;
