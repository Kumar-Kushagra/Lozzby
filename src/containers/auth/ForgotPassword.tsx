import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

import {CustomButton, CustomHeader, CustomInput} from '../../components';
import {getScreenHeight, getScreenWidth} from '../../utils/domUtils';
import {forgotPasswordManager} from '../../redux/auth';

const ForgotPassword = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  const emailValueRef: any = useRef(null);

  const otpActionHandler = useCallback(() => {
    let email = emailValueRef.current.getValue();
    dispatch<any>(forgotPasswordManager({email}));
  }, [dispatch]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomHeader title="Forgot Password" />
      <View style={styles.screen}>
        <View style={styles.container}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={styles.subContainer}>
                <Text style={styles.loginText}>Forgot Password</Text>
                <Text style={styles.loginSubText}>
                  Please enter your email address to continue!
                </Text>
              </View>
              <CustomInput
                autoCapitalize="none"
                ref={emailValueRef}
                placeholder={'Email'}
                type="done"
                onSubmit={() => {
                  Keyboard.dismiss();
                }}
              />

              <View style={styles.customButton}>
                <CustomButton action={otpActionHandler} title="Continue" />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
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
    container: {
      flex: 1,
      paddingHorizontal: getScreenHeight(2),
      justifyContent: 'center',
    },
    subContainer: {
      marginBottom: getScreenHeight(6),
    },
    customButton: {
      marginTop: getScreenHeight(3),
    },
    subtitle: {
      marginTop: getScreenHeight(2),
      color: theme.productSubTitle,
      textAlign: 'right',
    },
    loginText: {
      color: theme.textcolor,
      fontSize: getScreenWidth(7),
      fontWeight: 'bold',
    },
    loginSubText: {
      color: theme.productSubTitle,
      fontSize: getScreenWidth(4),
      fontWeight: 'bold',
    },
  });

export default ForgotPassword;
