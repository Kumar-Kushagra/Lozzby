import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getScreenHeight} from '../utils/domUtils';
import FastImage from 'react-native-fast-image';
import {gallery} from '../constants/images';
import {Storage} from 'aws-amplify';
import {deleteCartManager} from '../redux/cart';

const CartItem = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  console.log(props.item._deleted);
  useEffect(() => {
    if (props?.item?.Product?.image) {
      getImage(props?.item?.Product?.image);
    } else {
      setImage(null);
    }
  }, [props?.item?.Product?.image]);

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
      </View>
      <View style={styles.contanier}>
        <Text style={styles.title}>{props?.item?.Product.name}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>Price {props?.item?.Product.price}</Text>
          <Text style={styles.price}>Quantity {props.item.quantity}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            dispatch<any>(
              deleteCartManager({
                _version: props.item._version,
                id: props.item.id,
              }),
            );
          }}>
          <Text style={[styles.title, {color: theme.primary}]}>
            Remove From Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: '#E8E8E8',
      borderRadius: getScreenHeight(2),
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
    },
    subtitle: {
      color: theme.black,
      fontSize: getScreenHeight(1.5),
      marginVertical: getScreenHeight(1),
    },
    price: {
      color: theme.black,
      fontSize: getScreenHeight(2),
      alignSelf: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default CartItem;
