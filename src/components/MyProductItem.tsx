import React, {useMemo} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProductManager} from '../redux/home';
import {navigate} from '../services/Routerservices';
import {getScreenHeight} from '../utils/domUtils';

const MyProductItem = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={[styles.row, {marginTop: getScreenHeight(1)}]}>
        <Text style={styles.title}>Name</Text>
        <Text style={styles.title}>{props.item.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Price</Text>
        <Text style={styles.title}>{props.item.price}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Available Quantity</Text>
        <Text style={styles.title}>{props.item.quantity}</Text>
      </View>

      {/* <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            navigate('EditProduct', {data: props.item});
          }}>
          <Text style={[styles.title, {color: theme.primary}]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            dispatch<any>(
              deleteProductManager(props.item.id, props.item._version),
            )
          }>
          <Text style={[styles.title, {color: theme.primary}]}>Delete</Text>
        </TouchableOpacity>
      </View> */}
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
      fontWeight : "700"
    },
  });

export default MyProductItem;
