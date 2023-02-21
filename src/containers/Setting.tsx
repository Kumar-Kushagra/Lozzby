import { useFocusEffect } from '@react-navigation/native';
import { DataStore, Predicates, SortDirection } from 'aws-amplify';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { CustomHeader, CustomStatusBar, FullScreenLoader } from '../components';
import CartCount from '../components/CartCount';
import SettingItem from '../components/SettingItem';
import { becomeSellerManager, logoutManager } from '../redux/auth';
import { navigate } from '../services/Routerservices';

const Setting = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const userData = useSelector((state: any) => state.auth.userData);
  const dispatch = useDispatch();

  const becomeSeller = () => {
    Alert.alert(
      'Are you sure?',
      'You wanted to become seller.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => dispatch<any>(becomeSellerManager()),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader hide title="Settings" cart={<CartCount />} />
        <SettingItem
          title={
            userData.type === 'seller' ? 'Manage Products' : 'Become Seller'
          }
          onPress={() => {
            if (userData.type === 'seller') {
              navigate('ManageProducts', {});
            } else {
              becomeSeller();
            }
          }}
        />
        {userData.type === 'seller' && <SettingItem
          title={"Manage Orders"}
          onPress={() => {
            navigate('SellerOrders', {});
          }}
        />}
        <SettingItem
          title="Manage Addresses"
          onPress={() => {
            navigate('ManageAddress', {});
          }}
        />
        <SettingItem
          title="Logout"
          onPress={() => {
            dispatch<any>(logoutManager());
          }}
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
  });

export default Setting;
