import React, {useState, useMemo, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAddressManager} from '../redux/home';
import {navigate} from '../services/Routerservices';
import {getScreenHeight} from '../utils/domUtils';

const CartCount = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  let [count, setCount] = useState(0);

  const cartProducts = useSelector((state: any) => state?.cart?.cartProducts);
  const cartLoading = useSelector((state: any) => state?.cart?.cartLoading);

  useEffect(() => {
    let a = 0
    cartProducts?.forEach(elem => {
      a = a + elem.quantity
    });
    setCount(a)
  },[])
  
  return (
    <TouchableOpacity
      disabled={cartLoading}
      onPress={() => {
        navigate('Cart', {});
      }}>
      {cartLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FastImage
            tintColor={'white'}
            source={require('../assets/images/cart.png')}
            resizeMode="contain"
            style={styles.icon}
          />
          {cartProducts?.length ? (
            <View style={styles.textContanier}>
              <Text style={styles.count}>{count}</Text>
            </View>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    title: {
      fontSize: getScreenHeight(2),
      color: theme.black,
    },
    icon: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
    },
    textContanier: {
      position: 'absolute',
      zIndex: 100,
      top: -getScreenHeight(1),
      right: -getScreenHeight(1),
      backgroundColor: theme.black,
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
      // padding: getScreenHeight(0.5),
      borderRadius: getScreenHeight(100),
      justifyContent: 'center',
      alignItems: 'center',
    },
    count: {
      color: theme.white,
      fontSize: getScreenHeight(1.3),
      fontWeight: 'bold',alignSelf:'center'
    },
  });

export default CartCount;
