import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomHeader,
  CustomStatusBar,
  CustomInput,
  CustomAvatar,
  CustomButton,
} from '../../components';
import CartCount from '../../components/CartCount';
import {updateProfileManager} from '../../redux/auth';
import {getScreenHeight, showToast} from '../../utils/domUtils';

const EditUserProfile = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const userData = useSelector((state: any) => state.auth.userData);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const nameRef: any = useRef();
  const profileRef: any = useRef();
  const phoneNumberRef: any = useRef();

  useFocusEffect(
    React.useCallback(() => {
      nameRef.current.setValue(userData.name);
      profileRef.current.setValue(userData.profile);
      phoneNumberRef.current.setValue(userData.phoneNumber ? userData.phoneNumber?.substring(2,12): userData.phoneNumber);
    }, [userData.name, userData.phoneNumber, userData.profile]),
  );

  function testPhoneNumberValidation(phoneNumber: any) {
    const phoneNumberRegex = new RegExp(
      /^(1-?)?(([2-9]\d{2})|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/i,
    );
    return phoneNumberRegex.test(phoneNumber);
  }

  const validate = () => {
    let data = {
      name: nameRef.current.getValue(),
      image: profileRef.current.getValue(),
      phoneNumber: "+1" + phoneNumberRef.current.getValue(),
    };
    if(!nameRef.current.getValue()){
      return showToast('Name Number is required!');
    }
    if(!phoneNumberRef.current.getValue()){
      return showToast('Phone Number is required!');
    }
    if (!testPhoneNumberValidation(phoneNumberRef.current.getValue())) {
      showToast('Please enter a valid phone number!');
      return false;
    }
    dispatch<any>(updateProfileManager(data));
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader title="Edit Profile" cart={<CartCount/>}/>
        <ScrollView bounces = {false} contentContainerStyle={styles.contanier}>
          <View style={styles.item}>
            <CustomAvatar ref={profileRef} />
          </View>
          <View style={styles.item}>
            <CustomInput max={30} ref={nameRef} label={'Name'} />
          </View>
          <View style={styles.item}>
            <CustomInput
              maxLength={10}
              keyboardType = "numeric"
              ref={phoneNumberRef}
              label={'Phone Number'}
            />
          </View>
          <View style={styles.item}>
            <CustomButton action={validate} title="Save Profile" />
          </View>
        </ScrollView>
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
    item: {
      marginTop: getScreenHeight(2),
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
    },
  });

export default EditUserProfile;