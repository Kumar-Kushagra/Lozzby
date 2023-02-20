import {useFocusEffect} from '@react-navigation/native';
import {DataStore, Predicates, SortDirection} from 'aws-amplify';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {CustomHeader, CustomStatusBar, FullScreenLoader} from '../components';
import CartCount from '../components/CartCount';
import SettingItem from '../components/SettingItem';
import {becomeSellerManager, logoutManager} from '../redux/auth';
import {navigate} from '../services/Routerservices';
import {getScreenHeight, getScreenWidth} from '../utils/domUtils';

const Setting = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const userData = useSelector((state: any) => state.auth.userData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader hide title="Setting" cart={<CartCount />} />
        <SettingItem
          title={
            userData.type === 'seller' ? 'Manage Product' : 'Become Seller'
          }
          onPress={() => {
            if (userData.type === 'seller') {
              navigate('ManageProducts', {});
            } else {
              dispatch<any>(becomeSellerManager());
            }
          }}
        />

        <SettingItem title="Manage Addresses" onPress= {() => {  navigate('ManageAddress', {})}}/>

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
