import React, {useMemo} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAddressManager} from '../redux/home';
import {navigate} from '../services/Routerservices';
import {getScreenHeight} from '../utils/domUtils';

const AddressItem = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  const handler = (id: any, version: any) => {
    Alert.alert(
      'Are you sure?',
      'You wanted to delete this address?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => dispatch<any>(deleteAddressManager(id, version)),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={{...styles.screen, backgroundColor: props.backgroundColor}}>
        <Text style={{ ...styles.title,marginTop:getScreenHeight(1),width:"70%" }}>{ props.item?.streetAddress +", "  + props.item?.city +', '  + props.item?.province+', ' + props.item?.country+ " - " + props.item?.pincode.toUpperCase()}</Text>
      {/* <View style={[styles.row, {marginTop: getScreenHeight(1)}]}>
        <Text style={{...styles.title}}>{props.item?.streetAddress}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>
          {props.item?.city +
            ',' +
            props.item.province +
            ',' +
            props.item?.country}
        </Text>
      </View> */}

      {/* <View style={styles.row}>
        <Text style={styles.title}>{props.item.pincode.toUpperCase()}</Text>
      </View> */}

      <View style={styles.row}>
        <Text style={styles.title}>{props.item.phoneNumber}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handler(props.item.id, props.item._version)}
        style={{
          position: 'absolute',
          zIndex: 1000,
          right: 5,
          top: getScreenHeight(1),
        }}>
        <FastImage
          tintColor={theme.primary}
          source={require('../assets/images/delete.png')}
          resizeMode="contain"
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate('EditAddress', {item: props.item})}
        style={{
          position: 'absolute',
          zIndex: 1000,
          right: 30,
          top: getScreenHeight(1),
        }}>
        <FastImage
          tintColor={theme.primary}
          source={require('../assets/images/edit.png')}
          resizeMode="contain"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
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
      fontWeight: '500',
    },
    icon: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
    },
  });

export default AddressItem;
