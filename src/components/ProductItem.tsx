import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {getScreenHeight} from '../utils/domUtils';
import FastImage from 'react-native-fast-image';
import {gallery} from '../constants/images';
import {Storage} from 'aws-amplify';

const ProductItem = (props: any, ref: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [image, setImage] = useState(null);

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
      </View>
      <View style={styles.contanier}>
        <Text style={styles.title}>{props.item.name}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>${props.item.price.toFixed(2)}</Text>
          {/* <Text style={styles.price}>
            Rating {props.item.rating ? props.item.rating : 'NA'}
          </Text> */}
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: "lavender",
      borderRadius: getScreenHeight(2),
      width : 180,
      marginLeft : getScreenHeight(1) 
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
      resizeMode : "cover"
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
      fontWeight : "700"
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
      fontWeight : "600"
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default ProductItem;
