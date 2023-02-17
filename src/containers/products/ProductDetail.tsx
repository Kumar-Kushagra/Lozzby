import {Storage} from 'aws-amplify';
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomButton,
  CustomHeader,
  CustomStatusBar,
  FullScreenLoader,
} from '../../components';
import {createCartItemManager} from '../../redux/cart';
import {productDetailManager, setProductDetail} from '../../redux/home';

import {getScreenHeight, getScreenWidth, showToast} from '../../utils/domUtils';

const ProductDetail = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const data = useSelector((state: any) => state.home.productDetail);
  const userData = useSelector((state: any) => state.auth.userData);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const item = props.route.params.data;
  const dispatch = useDispatch();


  useEffect(() => {
    if (data?.image) {
      getImage(data.image);
    }
  }, [data]);

  useEffect(() => {
    if (item) {
      dispatch(setProductDetail(null));
      dispatch<any>(productDetailManager(item.id));
    }
  }, [dispatch, item]);

  const getImage = async (value: any) => {
    const mainLink: any = await Storage.get(value, {});
    setImage(mainLink);
  };

  if (!data) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <ScrollView style={styles.screen}>
        <CustomHeader title={data.name} />
        <FastImage
          style={styles.image}
          resizeMode="contain"
          source={{uri: image, priority: FastImage.priority.normal}}
        />
        <ScrollView contentContainerStyle={styles.contanier}>
          <Text style={styles.title}>${data.price}</Text>
          <Text style={styles.subtitle}>{data.description}</Text>
          <Text style={styles.title}>Available Quantity</Text>
          <Text style={styles.subtitle}>{data.quantity}</Text>

          {userData?.id === data?.userID ? 
            <Text style = {styles.title2}>This Product created by you.</Text>
          : (
            <>
              <View>
                <Text style={styles.title}>Quantity Selected</Text>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => {
                      if (quantity > 0) {
                        setQuantity(pre => pre - 1);
                      }
                      else{
                        showToast("You can not select product with no quantity!")
                      }
                    }}>
                    <Image
                      style={styles.inc}
                      source={require('../../assets/images/minus.png')}
                    />
                  </TouchableOpacity>
                  <Text style={{...styles.subtitle,fontSize : getScreenHeight(2.2),marginBottom : 0,marginLeft: getScreenWidth(3),marginRight:getScreenWidth(3)}}>{quantity}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (quantity < parseInt(data.quantity)) {
                        setQuantity(pre => pre + 1);
                      }
                      else{
                        showToast("You can't select product above maximum quantity!")
                      }
                    }}
                    >
                    <Image
                      style={styles.inc}
                      source={require('../../assets/images/plus.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{height: getScreenHeight(4)}} />
              <CustomButton
                action={() => {
                  if(quantity !== 0){
                  dispatch<any>(
                    createCartItemManager({
                      cartItemProductId: data.id,
                      quantity: quantity,
                      userID: data.userID,
                    }),
                  );}
                  else {
                    showToast("Please select a quantity!")
                  }
                }}
                title="Add To Cart"
              />
            </>
          )}
          <View style={{height: getScreenHeight(2)}} />
        </ScrollView>
      </ScrollView>
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
      marginTop: getScreenHeight(2),
    },
    contanier: {
      padding: getScreenHeight(2),
    },
    image: {
      height: getScreenHeight(60),
      width: '100%',
      backgroundColor: 'white',
    },
    subtitle: {
      fontSize: getScreenHeight(1.8),
      color: theme.black,
      marginBottom: getScreenHeight(1.5),
    },
    title: {
      fontSize: getScreenHeight(2.2),
      color: 'black',
      fontWeight: '700',
      color: theme.primary,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inc: {
      height: getScreenHeight(6),
      width: getScreenWidth(5),
      resizeMode: 'contain',
    },
    title2: {
      fontSize: getScreenHeight(2),
      color: 'black',
    },
  });

export default ProductDetail;
