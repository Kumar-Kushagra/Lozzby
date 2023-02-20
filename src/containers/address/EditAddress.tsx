import {useFocusEffect} from '@react-navigation/native';
import React, {useMemo, useRef} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomHeader,
  CustomStatusBar,
  CustomInput,
  CustomButton,
} from '../../components';
import {updateAddressManager} from '../../redux/auth';
import {getScreenHeight} from '../../utils/domUtils';

const EditAddress = (props: any) => {
  const data = props.route.params.item;
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const provinceRef: any = useRef();
  const pincodeRef: any = useRef();
  const countryRef: any = useRef();
  const phoneNumberRef: any = useRef();

  useFocusEffect(
    React.useCallback(() => {
      provinceRef.current.setValue(data.province);
      pincodeRef.current.setValue(data.pincode);
      countryRef.current.setValue(data.country);
      phoneNumberRef.current.setValue(data.phoneNumber);
    }, [data.country, data.phoneNumber, data.pincode, data.province]),
  );

  const validate = () => {
    let mainData = {
      province: provinceRef.current.getValue(),
      pincode: pincodeRef.current.getValue(),
      country: countryRef.current.getValue(),
      phoneNumber: phoneNumberRef.current.getValue(),
      _version: data._version,
      id: data.id,
    };
    dispatch<any>(updateAddressManager(mainData));
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader title="Edit Address" />

        <ScrollView contentContainerStyle={styles.contanier}>
          <View style={styles.item}>
            <CustomInput ref={provinceRef} label={'Province'} />
          </View>

          <View style={styles.item}>
            <CustomInput ref={pincodeRef} label={'Pincode'} />
          </View>

          <View style={styles.item}>
            <CustomInput ref={countryRef} label={'Country'} />
          </View>

          <View style={styles.item}>
            <CustomInput ref={phoneNumberRef} label={'Phone Number'} />
          </View>
          <View style={styles.item}>
            <CustomButton action={validate} title="Update Address" />
          </View>
        </ScrollView>
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
    item: {
      marginTop: getScreenHeight(2),
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
    },
  });

export default EditAddress;
