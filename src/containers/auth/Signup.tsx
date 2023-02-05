import React, {useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Keyboard, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../services/Routerservices';

import {
  CustomButton,
  CustomHeader,
  CustomInput,
  CustomAvatar,
} from '../../components';
import {getScreenHeight, getScreenWidth} from '../../utils/domUtils';
import {loginManager, signupManager} from '../../redux/auth';

const Signup = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  const emailRef: any = useRef(null);
  const emailValueRef: any = useRef(null);
  const passwordRef: any = useRef(null);
  const passwordValueRef: any = useRef(null);
  const nameRef: any = useRef(null);
  const nameValueRef: any = useRef(null);
  const phoneRef: any = useRef(null);
  const phoneValueRef: any = useRef(null);
  const imageValueRef: any = useRef(null);

  const signupActionHandler = () => {
    let email = emailValueRef.current.getValue();
    let password = passwordValueRef.current.getValue();
    let name = nameValueRef.current.getValue();
    let phone = phoneValueRef.current.getValue();
    let image = imageValueRef.current.getValue();
    dispatch<any>(signupManager({email, password, name, phone, image}));
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomHeader title = "Signup"/>
      <View style={styles.screen}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
          <View style={styles.subContainer}>
              <Text style={styles.loginText}>SignUp</Text>
              <Text style={styles.loginSubText}>
                Please sign up to start!
              </Text>
            </View>
            <View style={styles.avtar}>
              <CustomAvatar ref={imageValueRef} />
            </View>
            <CustomInput
              ref={nameValueRef}
              placeholder={'Full Name'}
              inputRef={nameRef}
              type="next"
              onSubmit={() => {
                phoneRef.current.focus();
              }}
            />

            <CustomInput
              ref={phoneValueRef}
              placeholder={'Phone Number'}
              maxLength={10}
              keyboardType = "numeric"
              inputRef={phoneRef}
              type="next"
              onSubmit={() => {
                emailRef.current.focus();
              }}
            />

            <CustomInput
              ref={emailValueRef}
              placeholder={'Email'}
              autoCapitalize="none"
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
              type="next"
              onSubmit={() => {
                Keyboard.dismiss();
              }}
            />
            <View style={styles.customButton}>
              <CustomButton action={signupActionHandler} title="Signup" />
            </View>

            <TouchableOpacity onPress={() => navigate('Login')}>
              <Text style={{...styles.subtitle, textAlign: 'center'}}>
                Already have an account? <Text style={styles.signup}>Login</Text>
              </Text>
            </TouchableOpacity>
            <View style = {{height:20}}></View>
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
      flex: 1,
      paddingHorizontal: getScreenHeight(2),
      justifyContent: 'center',
    },
    customButton: {
      marginTop: getScreenHeight(3),
    },
    avtar: {
      marginTop: getScreenHeight(3),
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
    subContainer: {
      marginBottom: getScreenHeight(6),
    },
    subtitle: {
      marginTop: getScreenHeight(2),
      color: theme.black,
      textAlign: 'right',
    },
    signup: {
      color: theme.primary,
      fontSize: getScreenWidth(4),
      fontWeight: 'bold',
    },
  });

export default Signup;
