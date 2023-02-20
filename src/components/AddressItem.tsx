import React, {useMemo} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAddressManager} from '../redux/home';
import {navigate} from '../services/Routerservices';
import {getScreenHeight} from '../utils/domUtils';

const AddressItem = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  return (
    <View style={{...styles.screen, backgroundColor : props.backgroundColor}}>
      <View style={[styles.row, {marginTop: getScreenHeight(1)}]}>
        <Text style={styles.title}>Country</Text>
        <Text style={styles.title}>{props.item.country}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Province</Text>
        <Text style={styles.title}>{props.item.province}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Pincode</Text>
        <Text style={styles.title}>{props.item.pincode}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Phone Number</Text>
        <Text style={styles.title}>{props.item.phoneNumber}</Text>
      </View>

      {/* <TouchableOpacity
        onPress={() => navigate('EditAddress', {item: props.item})}>
        <Text style={[styles.title, {color: theme.primary}]}>
          {'Edit Address'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          dispatch<any>(
            deleteAddressManager(props.item.id, props.item._version),
          )
        }
        style={{marginBottom: getScreenHeight(1)}}>
        <Text style={[styles.title, {color: theme.primary}]}>
          {'Delete Address'}
        </Text>
      </TouchableOpacity> */}
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
      fontSize: getScreenHeight(1.5),
      color: theme.black,
    },
  });

export default AddressItem;
