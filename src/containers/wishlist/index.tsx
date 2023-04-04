import React, {useMemo, useState} from 'react';
import {View, StyleSheet, FlatList, Text, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {CustomHeader, CustomStatusBar} from '../../components';
import ProductItem from '../../components/ProductItem';
import {navigate} from '../../services/Routerservices';
import {getScreenHeight} from '../../utils/domUtils';

const Wishlist = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const wishlistItems = useSelector((state: any) => state.cart.wishlistItems);

  const renderItem = ({item}: any) => {
    return (
      <Pressable
        onPress={() => navigate('ProductDetail', {data: item.Product})}
        style={styles.item}>
        <ProductItem item={item.Product} />
      </Pressable>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader hide title="Wishlist" />
        <FlatList
          numColumns={2}
          data={wishlistItems}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          ListEmptyComponent={
            <View style={{ marginTop: getScreenHeight(22) }}>
              <FastImage
                style={styles.image1}
                resizeMode={'contain'}
                source={require('../../assets/images/empty-product.png')}
              />
              <Text
                style={{
                  marginTop: getScreenHeight(2),
                  ...styles.title,
                  textAlign: 'center',
                  fontSize: getScreenHeight(2.5),
                  color: theme.primary,
                  fontWeight: 'bold',
                }}>
                No Product Added To Wishlist Yet!
              </Text>
            </View>
          }
          contentContainerStyle={{padding: getScreenHeight(2)}}
        />
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.background,
      flex: 1,
    },
    safe: {
      backgroundColor: theme.primary,
      flex: 1,
    },
    item: {
      width: '48%',
      marginBottom: getScreenHeight(2),
    },
    title: {
      fontSize: getScreenHeight(2),
      color: theme.black,
    },
    header: {
      padding: getScreenHeight(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    image1: {
      height: getScreenHeight(20),
      width: '100%',
    },
  });

export default Wishlist;
