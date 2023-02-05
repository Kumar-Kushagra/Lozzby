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
  resendConfirmationCodeManager,
  verifyOtpManager,
} from '../../redux/auth';

const VerifyOtp = (props: any) => {
  const path = props?.route?.params?.path;
  const data = props?.route?.params?.data;
  const theme = useSelector((state: any) => state.theme.theme);
  const resendConfimation = useSelector(
    (state: any) => state.auth.resendConfimation,
  );
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  const otpValueRef: any = useRef(null);

  const otpActionHandler = useCallback(() => {
    let otp = otpValueRef.current.getValue();
    dispatch<any>(verifyOtpManager({otp, email: data}));
  }, [data, dispatch]);

  const resendActionHandler = useCallback(() => {
    dispatch<any>(resendConfirmationCodeManager({email: data}));
  }, [data, dispatch]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.screen}>
        <CustomHeader title="Verify OTP" />
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
          <View style={styles.subContainer}>
              <Text style={styles.loginText}>Verify OTP</Text>
            </View>
            <CustomInput
              autoCapitalize="none"
              maxLength={6}
              ref={otpValueRef}
              placeholder={'Enter Code'}
              keyboardType = "numeric"
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
                <Text style = {{fontWeight : "bold"}}>Resend Code</Text>
              )}
            </TouchableOpacity>
            <View style={styles.customButton}>
              <CustomButton action={otpActionHandler} title="Proceed" />
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
      paddingHorizontal: getScreenHeight(2),
      flex: 1,
      justifyContent: 'center',
    },
    customButton: {
      marginTop: getScreenHeight(3),
    },
    subtitle: {
      marginTop: getScreenHeight(2),
      color: theme.black,
    },
    loginText: {
      color: theme.black,
      fontSize: getScreenWidth(7),
      fontWeight: 'bold',
    },
    subContainer: {
      marginBottom: getScreenHeight(6),
    },
  });

export default VerifyOtp;
