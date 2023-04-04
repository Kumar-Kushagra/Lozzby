import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Alert, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { CustomHeader, CustomStatusBar } from '../components';
import CartCount from '../components/CartCount';
import SettingItem from '../components/SettingItem';
import { becomeSellerManager, logoutManager } from '../redux/auth';
import { navigate } from '../services/Routerservices';
import { getScreenHeight } from '../utils/domUtils';
import {useColorScheme } from 'react-native';
import { setTheme } from '../redux/theme';

const Setting = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const userData = useSelector((state: any) => state.auth.userData);
  const [mode, setMode] = useState("")
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const color = useColorScheme();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
          title="My Addresses"
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
      backgroundColor: theme.background,
      flex: 1,
    },
    safe: {
      backgroundColor: theme.primary,
      flex: 1,
    },
  });

export default Setting;
