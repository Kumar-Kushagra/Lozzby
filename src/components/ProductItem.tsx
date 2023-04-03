import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getScreenHeight, getScreenWidth} from '../utils/domUtils';
import FastImage from 'react-native-fast-image';
import {gallery} from '../constants/images';
import {Storage} from 'aws-amplify';
import {addToWishlistManager, removeToWishlistManager} from '../redux/cart';
import {useFocusEffect} from '@react-navigation/native';

const ProductItem = (props: any, ref: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [image, setImage] = useState(null);
  const [existed, setExisted] = useState(null);
  const wishlistLoading = useSelector(
    (state: any) => state.cart.wishlistLoading,
  );
  const wishlistItems = useSelector((state: any) => state.cart.wishlistItems);
  const dispatch = useDispatch();

  const checkWishlistStatus = useCallback(() => {
    if (wishlistItems?.length) {
      const index = wishlistItems.findIndex(
        (data: any) => data.Product.id === props.item.id,
      );
      if (index !== -1) {
        setExisted({
          _version: wishlistItems[index]._version,
          id: wishlistItems[index].id,
        });
      } else {
        setExisted(null);
      }
    } else {
      setExisted(null);
    }
  }, [props.item.id, wishlistItems]);

  useEffect(() => {
    if (props.item?.id) {
      checkWishlistStatus();
    }
  }, [props.item?.id, wishlistItems?.length]);

  useEffect(() => {
    if (props?.item?.image) {
      getImage(props.item.image);
    } else {
      setImage(null);
    }
  }, [props?.item?.image]);

  const getImage = async (value: any) => {
    const mainLink: any = await Storage.get(value, {});
    setImage(mainLink);
  };

  return (
    <View style={{...styles.screen}}>
      <View style={styles.imagecontanier}>
        {image ? (
          <FastImage
            style={styles.image}
            source={{
              uri: image,
              priority: FastImage.priority.high,
            }}
          />
        ) : (
          <FastImage
            style={styles.icon}
            resizeMode="contain"
            source={gallery}
          />
        )}
        {existed ? (
          <TouchableOpacity
            disabled={wishlistLoading}
            onPress={() => {
              dispatch<any>(removeToWishlistManager(existed));
            }}
            style={styles.likeButton}>
            <FastImage
              style={{
                height: 20,
                width: 20,
              }}
              resizeMode="contain"
              tintColor={'red'}
              source={require('../assets/images/heart.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={wishlistLoading}
            onPress={() => {
              dispatch<any>(addToWishlistManager(props.item.id));
            }}
            style={styles.likeButton}>
            <FastImage
              style={{
                height: 20,
                width: 20,
              }}
              resizeMode="contain"
              tintColor={theme.black}
              source={require('../assets/images/love.png')}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.contanier}>
        <Text style={styles.title}>{props.item.name}</Text>

        <View style={styles.row}>
          <Text style={styles.price}>${props.item.price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: 'lavender',
      borderRadius: getScreenHeight(2),
      width: getScreenWidth(45),
      marginRight: getScreenHeight(1),
      alignSelf: 'center',
    },
    icon: {
      height: getScreenHeight(6),
      width: getScreenHeight(6),
    },
    image: {
      height: getScreenHeight(25),
      width: '100%',
      borderTopRightRadius: getScreenHeight(2),
      borderTopLeftRadius: getScreenHeight(2),
      resizeMode: 'cover',
    },
    loading: {
      zIndex: 10,
      position: 'absolute',
    },
    imagecontanier: {
      height: getScreenHeight(25),
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    contanier: {
      padding: getScreenHeight(2),
    },
    title: {
      color: theme.black,
      fontSize: getScreenHeight(1.8),
      textTransform: 'capitalize',
      fontWeight: '700',
    },
    subtitle: {
      color: theme.black,
      fontSize: getScreenHeight(1.5),
      marginVertical: getScreenHeight(1),
    },
    price: {
      color: theme.black,
      fontSize: getScreenHeight(1.7),
      alignSelf: 'center',
      fontWeight: '600',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    likeButton: {
      height: 20,
      width: 20,
      position: 'absolute',
      top: 10,
      right: 10,
    },
  });

export default ProductItem;
