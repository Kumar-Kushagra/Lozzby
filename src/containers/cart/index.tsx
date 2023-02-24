import React, {useEffect, useMemo} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomButton,
  CustomHeader,
  CustomStatusBar,
  FullScreenLoader,
} from '../../components';
import CartItem from '../../components/CartItem';
import {cartDataManager} from '../../redux/cart';

import {navigate} from '../../services/Routerservices';
import {getScreenHeight} from '../../utils/domUtils';

const Cart = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const cartProducts = useSelector((state: any) => state.cart.cartProducts);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(cartDataManager());
  }, [dispatch]);

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <CartItem item={item} />
      </View>
    );
  };

  if (!cartProducts) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader title="Cart" />

        <FlatList
          data={cartProducts}
          ListEmptyComponent={() => (
            <View style={{marginTop: getScreenHeight(28)}}>
              <FastImage
                style={styles.image}
                resizeMode={'contain'}
                source={require('../../assets/images/empty-cart.png')}
              />
              <Text
                style={{
                  marginTop: getScreenHeight(2),
                  ...styles.title,
                  fontSize: getScreenHeight(2.5),
                  color: theme.primary,
                  fontWeight: 'bold',
                  textAlign : "center"
                }}>
                No Product Added to Cart Yet!
              </Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{padding: getScreenHeight(2)}}
        />

        {cartProducts.length > 0 && 
        <View style={{padding: getScreenHeight(2)}}>
          <CustomButton
            action={() => {
              navigate('ChooseAddress', {});
            }}
            title="Place Order"
          />
        </View>}
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.white,
      flex: 1,
    },
    safe: {
      backgroundColor: theme.primary,
      flex: 1,
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
    },
    title: {
      color: theme.black,
      fontSize: getScreenHeight(1.8),
    },
    image: {
      height: getScreenHeight(20),
      width: '100%',
    },
  });

export default Cart;
