import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Keyboard, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

import {CustomButton, CustomHeader, CustomInput} from '../../components';
import {getScreenHeight, getScreenWidth, showToast} from '../../utils/domUtils';
import {loginManager} from '../../redux/auth';
import {navigate} from '../../services/Routerservices';

const Login = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  const emailRef: any = useRef(null);
  const emailValueRef: any = useRef(null);
  const passwordRef: any = useRef(null);
  const passwordValueRef: any = useRef(null);
  const [eye, setEye] = useState(true);

  const loginActionHandler = useCallback(() => {
    let email = emailValueRef.current.getValue();
    let password = passwordValueRef.current.getValue();
    Keyboard.dismiss();
    dispatch<any>(loginManager({email, password}));
  }, [dispatch]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomHeader title="Login" hide />
      <View style={styles.screen}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Text style={styles.loginText}>Login</Text>
              <Text style={styles.loginSubText}>
                Please sign in to continue!
              </Text>
            </View>
            <CustomInput
              autoCapitalize="none"
              ref={emailValueRef}
              placeholder={'Email'}
              inputRef={emailRef}
              type="next"
              onSubmit={() => {
                passwordRef.current.focus();
              }}
            />
            <CustomInput
              ref={passwordValueRef}
              placeholder={'Password'}
              inputRef={passwordRef}
              type="done"
              icon
              rightAction={() => {
                setEye(!eye);
              }}
              secure={eye}
              onSubmit={() => {
                Keyboard.dismiss();
              }}
            />
            <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
              <Text style={styles.subtitle}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.customButton}>
              <CustomButton action={loginActionHandler} title="Login" />
            </View>
            <TouchableOpacity onPress={() => navigate('Signup')}>
              <Text style={{...styles.subtitle, textAlign: 'center'}}>
                Don't have an account? <Text style={styles.signup}>Signup</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
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
    signup: {
      color: theme.productTitle,
      fontSize: getScreenWidth(4),
      fontWeight: 'bold',
    },
  });

export default Login;
