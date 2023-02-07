import {Storage} from 'aws-amplify';
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
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
import {productDetailManager, setProductDetail} from '../../redux/home';

import {getScreenHeight} from '../../utils/domUtils';

const ProductDetail = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const data = useSelector((state: any) => state.home.productDetail);
  const userData = useSelector((state: any) => state.auth.userData);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
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
      <View style={styles.screen}>
        <CustomHeader title={data.name} />
        <FastImage
            style={styles.image}
            resizeMode = "cover"
            source={{uri: image, priority: FastImage.priority.normal}}
          />
          
        <ScrollView contentContainerStyle={styles.contanier}>
           <Text style={styles.title}>${data.price}</Text>
          <Text style={styles.subtitle}>{data.description}</Text>
          <Text style={styles.title}>Available Quantity</Text>
          <Text style={styles.subtitle}>{data.quantity}</Text>
          <View style={{height: getScreenHeight(2)}} />
        </ScrollView>
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
      marginTop: getScreenHeight(2),
    },
    contanier: {
      padding: getScreenHeight(2),
    },
    image: {
      height: getScreenHeight(25),
      width: '100%',
    },
    subtitle: {
      fontSize: getScreenHeight(1.8),
      color: theme.black,
      marginBottom : getScreenHeight(1.5)
      
    },
    title: {
      fontSize: getScreenHeight(2.2),
      color: 'black',
      fontWeight : "700",
      color : theme.primary,
      
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  });

export default ProductDetail;
