import React, {useMemo} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProductManager} from '../redux/home';
import {navigate} from '../services/Routerservices';
import {getScreenHeight} from '../utils/domUtils';
import FullScreenLoader from './FullScreenLoader';

const MyProductItem = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  const handler = (id: any, version: any) => {
    Alert.alert(
      'Are you sure?',
      'You wanted to delete this product.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => dispatch<any>(deleteProductManager(id, version)),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.row, {marginTop: getScreenHeight(1)}]}>
        <Text style={styles.title}>Name</Text>
        <Text style={styles.title}>{props.item.name.trim()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Price</Text>
        <Text style={styles.title}>{props.item.price}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Available Quantity</Text>
        <Text style={styles.title}>{props.item.quantity}</Text>
      </View>

      <View
        style={{
          ...styles.row,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: getScreenHeight(1),
          marginTop: getScreenHeight(1),
        }}>
       
        <TouchableOpacity
          onPress={() => handler(props.item.id, props.item._version)}>
          <FastImage
            tintColor={theme.primary}
            source={require('../assets/images/delete.png')}
            resizeMode="contain"
            style={{left: 4, ...styles.icon}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: 'lavender',
      borderRadius: getScreenHeight(1),
      paddingHorizontal: getScreenHeight(2),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: getScreenHeight(1),
    },
    title: {
      fontSize: getScreenHeight(1.8),
      color: theme.black,
      fontWeight: '700',
    },
    icon: {
      height: getScreenHeight(3),
      width: getScreenHeight(3),
    },
  });

export default MyProductItem;
