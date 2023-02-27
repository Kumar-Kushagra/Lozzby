import {useFocusEffect} from '@react-navigation/native';
import {DataStore} from 'aws-amplify';
import React, {useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {
  CustomHeader,
  CustomStatusBar,
  FullScreenLoader,
} from '../../components';
import SellerOrderItem from '../../components/SellerOrderItem';
import {Order} from '../../models';
import {getScreenHeight} from '../../utils/domUtils';

const SellerOrders = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const loading = useSelector((state: any) => state.common.loading);
  const userData = useSelector((state: any) => state.auth.userData);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [orderData, setOrderData] = useState([]);
  const [orderStatus, setOrderStatus] = useState('PENDING');

  useFocusEffect(
    React.useCallback(() => {
      const res = DataStore.observeQuery(Order, c =>
        c.and(order => [
          order.sellerID.eq(userData.id),
          order.status.eq(orderStatus),
        ]),
      ).subscribe(({items}: any) => {
        setOrderData(items);
      });
      return () => res.unsubscribe();
    }, [userData?.id, orderStatus]),
  );

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <SellerOrderItem item={item} />
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
        <CustomHeader title="Manage Orders" />
        <View
          style={{
            padding: getScreenHeight(0.1),
            paddingTop: getScreenHeight(2.5),
          }}>
          <ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal>
            <TouchableOpacity
                  activeOpacity={1}
              onPress={() => {
                setOrderStatus('PENDING');
              }}
              style={{
                marginRight: getScreenHeight(1),
                marginLeft: getScreenHeight(1),
                backgroundColor:  orderStatus === 'PENDING' ? theme.primary : "lavender",
                padding: getScreenHeight(1),
                borderRadius: 16,
                paddingHorizontal: getScreenHeight(3),
              }}>
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      orderStatus === 'PENDING' ? theme.white : theme.black,
                  },
                ]}>
                Pending
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
                  activeOpacity={1}
              onPress={() => {
                setOrderStatus('ACCEPTED');
              }}
              style={{
                marginRight: getScreenHeight(1),
                marginLeft: getScreenHeight(1),
                backgroundColor: orderStatus === 'ACCEPTED' ? theme.primary : "lavender",
                padding: getScreenHeight(1),
                borderRadius: 16,
                paddingHorizontal: getScreenHeight(3),
              }}>
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      orderStatus === 'ACCEPTED' ? theme.white : theme.black,
                  },
                ]}>
                Accepted
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
                  activeOpacity={1}
              onPress={() => {
                setOrderStatus('REJECTED');
              }}
              style={{
                marginRight: getScreenHeight(1),
                marginLeft: getScreenHeight(1),
                backgroundColor: orderStatus === 'REJECTED' ? theme.primary : "lavender",
                padding: getScreenHeight(1),
                borderRadius: 16,
                paddingHorizontal: getScreenHeight(3),
              }}>
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      orderStatus === 'REJECTED' ? theme.white : theme.black,
                  },
                ]}>
                Rejected
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                  activeOpacity={1}
              onPress={() => {
                setOrderStatus('DELIVERED');
              }}
              style={{
                marginRight: getScreenHeight(1),
                marginLeft: getScreenHeight(1),
                backgroundColor: orderStatus === 'DELIVERED' ? theme.primary : "lavender",
                padding: getScreenHeight(1),
                borderRadius: 16,
                paddingHorizontal: getScreenHeight(3),
              }}>
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      orderStatus === 'DELIVERED' ? theme.white : theme.black,
                  },
                ]}>
                Delivered
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
                  activeOpacity={1}
              onPress={() => {
                setOrderStatus('COMPLETED');
              }}
              style={{
                marginRight: getScreenHeight(1),
                marginLeft: getScreenHeight(1),
                backgroundColor: orderStatus === 'COMPLETED' ? theme.primary : "lavender",
                padding: getScreenHeight(1),
                borderRadius: 16,
                paddingHorizontal: getScreenHeight(3),
              }}>
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      orderStatus === 'COMPLETED' ? theme.white : theme.black,
                  },
                ]}>
                Completed
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
                  activeOpacity={1}
              onPress={() => {
                setOrderStatus('CANCELLED');
              }}
              style={{
                marginRight: getScreenHeight(1),
                marginLeft: getScreenHeight(1),
                backgroundColor: orderStatus === 'CANCELLED' ? theme.primary : "lavender",
                padding: getScreenHeight(1),
                borderRadius: 16,
                paddingHorizontal: getScreenHeight(3),
              }}>
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      orderStatus === 'CANCELLED' ? theme.white : theme.black,
                  },
                ]}>
                Cancelled
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <FlatList
          contentContainerStyle={{padding: getScreenHeight(2)}}
          data={orderData}
          ListEmptyComponent={() => (
            <View style={{marginTop: getScreenHeight(22)}}>
              <FastImage
                style={styles.image}
                resizeMode={'contain'}
                source={require('../../assets/images/empty-orders.png')}
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
                No {orderStatus.toLocaleLowerCase()} orders yet!
              </Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
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
    title: {
      fontSize: getScreenHeight(1.8),
      color: theme.black,
      fontWeight: '700',
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
    image: {
      height: getScreenHeight(20),
      width: '100%',
    },
  });

export default SellerOrders;
