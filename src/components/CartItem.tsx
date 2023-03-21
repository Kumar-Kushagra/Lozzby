import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getScreenHeight, getScreenWidth } from '../utils/domUtils';
import FastImage from 'react-native-fast-image';
import { gallery } from '../constants/images';
import { Storage } from 'aws-amplify';
import { deleteCartManager, updateCartItemQuantityManager } from '../redux/cart';

const CartItem = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (props?.item?.Product?.image) {
      getImage(props?.item?.Product?.image);
    } else {
      setImage(null);
    }
  }, [props?.item?.Product?.image]);


  useEffect(() => {
    setQuantity(parseInt(props?.item?.quantity));
  }, [props?.item?.quantity]);

  const getImage = async (value: any) => {
    const mainLink: any = await Storage.get(value, {});
    setImage(mainLink);
  };

  const handler = () => {
    Alert.alert(
      "Are you sure?",
      "you wanted to remove this item from cart?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            dispatch<any>(
              deleteCartManager({
                _version: props.item._version,
                id: props.item.id,
              })
            ),
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={{ ...styles.screen }}>
      <View style={styles.imagecontanier}>
        {image ? (
          <FastImage
            style={styles.image}
            resizeMode="cover"
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
      </View>
      <View style={styles.contanier}>
        <Text style={styles.title}>{props?.item?.Product?.name}</Text>
        <Text
          style={{ ...styles.price, color: theme.primary, fontWeight: '900' }}>
          Price{' '}
          <Text style={{ fontWeight: '500', ...styles.price }}>
            {'$' + props.item?.Product?.price}
          </Text>
        </Text>
        <View style={styles.row}>
          <Text
            style={{ ...styles.price, color: theme.primary, fontWeight: '900' }}>
            Quantity</Text>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', width: getScreenWidth(15), marginRight: getScreenHeight(0.1) }}>
            <TouchableOpacity
              onPress={() => {
                if (quantity === 1) {
                  handler();
                } else {
                  dispatch<any>(
                    updateCartItemQuantityManager({
                      quantity: quantity - 1,
                      id: props.item.id,
                      _version: props.item._version,
                    }),
                  );
                }
              }}>
              <Image
                style={styles.inc}
                source={require('../assets/images/minus.png')}
              />
            </TouchableOpacity>
            <Text style={{ fontWeight: '500', ...styles.title2 }}>
              {props?.item?.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch<any>(
                  updateCartItemQuantityManager({
                    quantity: quantity + 1,
                    id: props.item.id,
                    _version: props.item._version,
                  }),
                );
              }}>
              <Image
                style={styles.inc}
                source={require('../assets/images/plus.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.iconContanier} onPress={handler}>
          <FastImage
            tintColor={theme.primary}
            resizeMode="contain"
            source={require('../assets/images/delete.png')}
            style={styles.smallIcon}
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
      borderRadius: getScreenHeight(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    icon: {
      height: getScreenHeight(6),
      width: getScreenHeight(6),
    },
    image: {
      height: getScreenHeight(20),
      width: '100%',
      borderBottomLeftRadius: getScreenHeight(2),
      borderTopLeftRadius: getScreenHeight(2),
    },
    loading: {
      zIndex: 10,
      position: 'absolute',
    },
    imagecontanier: {
      height: getScreenHeight(20),
      justifyContent: 'center',
      alignItems: 'center',
      width: '45%',
    },
    contanier: {
      padding: getScreenHeight(2),
      width: '55%',
    },
    title: {
      color: theme.black,
      fontSize: getScreenHeight(2.5),
      textTransform: 'capitalize',
      fontWeight: 'bold',
    },
    subtitle: {
      color: theme.black,
      fontSize: getScreenHeight(1.5),
      marginVertical: getScreenHeight(1),
    },
    price: {
      color: theme.black,
      fontSize: getScreenHeight(2),
      marginTop: getScreenHeight(0.5),
      // alignSelf: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    smallIcon: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
    },
    iconContanier: {
      position: "absolute",
      zIndex: 100,
      right: getScreenHeight(1),
      top: getScreenHeight(1),
    },
    action: {
      fontSize: getScreenHeight(2.5),
      color: theme.black,
    },
    inc: {
      height: getScreenHeight(5),
      width: getScreenWidth(5),
      resizeMode: 'contain',
    },
    title2: {
      fontSize: getScreenHeight(2),
      color: theme.black,
      marginTop : getScreenHeight(1)
    },
  });

export default CartItem;
