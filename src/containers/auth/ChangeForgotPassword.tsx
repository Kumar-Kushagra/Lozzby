import React, {useCallback, useMemo, useRef} from 'react';
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
import {
  resendForgotConfirmationManager,
  verifyFrogotOtpManager,
} from '../../redux/auth';

const ChangeForgotPassword = (props: any) => {
  const data = props.route.params.data;
  const theme = useSelector((state: any) => state.theme.theme);
  const resendConfimation = useSelector(
    (state: any) => state.auth.resendConfimation,
  );
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  const otpValueRef: any = useRef(null);
  const passwordValueRef: any = useRef(null);

  const otpActionHandler = useCallback(() => {
    let otp = otpValueRef.current.getValue();
    let password = passwordValueRef.current.getValue();
    dispatch<any>(verifyFrogotOtpManager({otp, email: data, password}));
  }, [data, dispatch]);

  const resendActionHandler = useCallback(() => {
    dispatch<any>(resendForgotConfirmationManager({email: data}));
  }, [data, dispatch]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.screen}>
        <CustomHeader title="Reset Password" />
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.container}>
              <View style={styles.subContainer}>
                <Text style={styles.loginText}>Reset Password</Text>
                <Text style={styles.loginSubText}>
                  Please enter the verification code and new password to reset
                  your password!
                </Text>
              </View>
              <CustomInput
                autoCapitalize="none"
                maxLength={6}
                ref={otpValueRef}
                placeholder={'OTP'}
                type="done"
                onSubmit={() => {
                  Keyboard.dismiss();
                }}
              />

              <CustomInput
                ref={passwordValueRef}
                placeholder={'Password'}
                type="done"
                onSubmit={() => {
                  Keyboard.dismiss();
                }}
              />
              <TouchableOpacity
                onPress={resendActionHandler}
                style={{marginTop: getScreenHeight(2)}}>
                {resendConfimation ? (
                  <ActivityIndicator />
                ) : (
                  <Text>Resend Code</Text>
                )}
              </TouchableOpacity>
              <View style={styles.customButton}>
                <CustomButton
                  action={otpActionHandler}
                  title="Reset Password"
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
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
    container: {
      paddingHorizontal: getScreenHeight(1),
      justifyContent: 'center',
      flex: 1,
    },
    customButton: {
      marginTop: getScreenHeight(3),
    },
    subtitle: {
      marginTop: getScreenHeight(2),
      color: theme.black,
    },
    subContainer: {
      marginBottom: getScreenHeight(6),
    },
    loginText: {
      color: theme.black,
      fontSize: getScreenWidth(7),
      fontWeight: 'bold',
    },
    loginSubText: {
      color: theme.gray,
      fontSize: getScreenWidth(4),
      fontWeight: 'bold',
    },
  });

export default ChangeForgotPassword;
