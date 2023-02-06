import { useFocusEffect } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomHeader,
  CustomStatusBar,
  CustomInput,
  CustomAvatar,
  CustomButton,
} from '../../components';
import { logoutManager } from '../../redux/auth';
import { navigate } from '../../services/Routerservices';
import { getScreenHeight } from '../../utils/domUtils';

const UserProfile = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const userData = useSelector((state: any) => state.auth.userData);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const emailRef: any = useRef();
  const nameRef: any = useRef();
  const phoneRef: any = useRef();
  const profileRef: any = useRef();


  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader hide title="Profile" />
      </View>
        <CustomButton
          action={() => {
            dispatch<any>(logoutManager());
          }}
          title="Logout"
        />
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.white,
      flex: 1
    },
    safe: {
      backgroundColor: theme.primary,
      flex: 1
    },
    item: {
      marginTop: getScreenHeight(2),
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
    },
  });

export default UserProfile;
