import {DataStore} from 'aws-amplify';
import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, FlatList, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {
  CustomButton,
  CustomHeader,
  CustomStatusBar,
  FullScreenLoader,
} from '../../components';
import MyProductItem from '../../components/MyProductItem';
import {Product} from '../../models';
import {navigate} from '../../services/Routerservices';
import {getScreenHeight} from '../../utils/domUtils';

const ManageProducts = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const userData = useSelector((state: any) => state.auth.userData);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const sub = DataStore.observeQuery(Product, product =>
      product.userID.eq(userData.id),
    ).subscribe(({items}: any) => {
      setLoading(false);
      setData(items);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [userData?.id]);

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <MyProductItem item={item} />
      </View>
    );
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader title="My Products" />
        <FlatList
          data={data}
          ListEmptyComponent={() => (
            <View style={{marginTop: getScreenHeight(25)}}>
              <FastImage
                style={styles.image}
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
                No Product Added Yet!
              </Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{padding: getScreenHeight(2)}}
        />

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 10,
          }}>
          <CustomButton
            title="Add Product"
            action={() => navigate('AddProduct')}
          />
        </View>
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

export default ManageProducts;
