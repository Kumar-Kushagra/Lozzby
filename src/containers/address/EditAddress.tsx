import {useFocusEffect} from '@react-navigation/native';
import React, {useMemo, useRef, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  CustomHeader,
  CustomStatusBar,
  CustomInput,
  CustomButton,
} from '../../components';
import {updateAddressManager} from '../../redux/auth';
import {getScreenHeight, showToast} from '../../utils/domUtils';

const EditAddress = (props: any) => {
  const data = props.route.params.item;
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const pincodeRef: any = useRef();
  const countryRef: any = useRef('');
  const phoneNumberRef: any = useRef();
  const cityRef: any = useRef('');
  const streetAddressRef: any = useRef('');
  const [selectedProvince, setSelectedProvince] = useState("");
  const provinces = [
    {key: '1', value: 'Alberta', abbreviation: 'AB'},
    {key: '2', value: 'British Columbia', abbreviation: 'BC'},
    {key: '3', value: 'Manitoba', abbreviation: 'MB'},
    {key: '4', value: 'New Brunswick', abbreviation: 'NB'},
    {key: '5', value: 'Newfoundland and Labrador', abbreviation: 'NL'},
    {key: '6', value: 'Northwest Territories', abbreviation: 'NT'},
    {key: '7', value: 'Nova Scotia', abbreviation: 'NS'},
    {key: '8', value: 'Nunavut', abbreviation: 'NU'},
    {key: '9', value: 'Ontario', abbreviation: 'ON'},
    {key: '10', value: 'Prince Edward Island', abbreviation: 'PE'},
    {key: '11', value: 'Quebec', abbreviation: 'QC'},
    {key: '12', value: 'Saskatchewan', abbreviation: 'SK'},
    {key: '13', value: 'Yukon Territory', abbreviation: 'YT'},
  ];

  let selected = {};
  function getDefault() {
    provinces.forEach(element => {
      if (element?.value === data?.province) {
        selected = element;
      }
    });
  }
  getDefault()

  function testCanadianPostalCode(postalCode: any) {
    const postalCodeRegex = new RegExp(
      /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i,
    );
    return postalCodeRegex.test(postalCode);
  }

  function testPhoneNumberValidation(phoneNumber: any) {
    const phoneNumberRegex = new RegExp(
      /^(1-?)?(([2-9]\d{2})|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/i,
    );
    return phoneNumberRegex.test(phoneNumber);
  }

  useFocusEffect(
    React.useCallback(() => {
      cityRef.current.setValue(data?.city);
      streetAddressRef.current.setValue(data?.streetAddress);
      pincodeRef.current.setValue(data?.pincode);
      countryRef.current.setValue(data?.country);
      phoneNumberRef.current.setValue(data?.phoneNumber.substring(2, 12));
    }, [
      data.country,
      data.phoneNumber,
      data.pincode,
      data.province,
      data.city,
      data.streetAddress,
    ]),
  );

  const validate = () => {
    // if (selectedProvince?.length <= 0) {
    //   showToast("Province can't be empty!");
    //   return false;
    // }
    if (cityRef.current.getValue()?.length <= 0) {
      showToast("City can't be empty!");
      return false;
    }
    if (streetAddressRef.current.getValue()?.length <= 0) {
      showToast("Street Address can't be empty!");
      return false;
    }
    if (pincodeRef.current.getValue().length <= 0) {
      showToast("Postal code can't be empty!");
      return false;
    }
    if (!testCanadianPostalCode(pincodeRef.current.getValue())) {
      showToast('Please enter a valid postal code!');
      return false;
    }
    if (phoneNumberRef.current.getValue().length <= 0) {
      showToast("Phone number can't be empty!");
      return false;
    }
    if (!testPhoneNumberValidation(phoneNumberRef.current.getValue())) {
      showToast('Please enter a valid phone number!');
      return false;
    }
    let mainData = {
      country: 'Canada',
      province: selectedProvince ? selectedProvince : selected.value,
      city: cityRef.current.getValue(),
      streetAddress: streetAddressRef.current.getValue(),
      pincode: pincodeRef.current.getValue(),
      phoneNumber: '+1' + phoneNumberRef.current.getValue(),
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

        <ScrollView bounces = {false} contentContainerStyle={styles.contanier}>
          <View style={styles.item}>
            <CustomInput
              placeholder={'Canada'}
              placeholderColor={theme.black}
              ref={countryRef}
              editable={false}
              label={'Country'}
            />
          </View>
          <View style={styles.item}>
            <Text
              style={{
                fontSize: getScreenHeight(1.8),
                color: theme.black,
                fontWeight: 'bold',
                marginBottom: getScreenHeight(1.5),
              }}>
              Province
            </Text>
            <SelectList
             // defaultOption={selected}
              setSelected={val => {
                setSelectedProvince(val)
              }}
              data={provinces}
              save="value"
              placeholder={selected?.value}
              inputStyles={{color: theme.black, right: getScreenHeight(2)}}
            />
          </View>

          <View style={styles.item}>
            <CustomInput ref={cityRef} label={'City'} />
          </View>
          <View style={styles.item}>
            <CustomInput ref={streetAddressRef} label={'Street Address'} />
          </View>
          <View style={styles.item}>
            <CustomInput maxLength={7} ref={pincodeRef} label={'Pincode'} />
          </View>
          <View style={styles.item}>
            <CustomInput
              maxLength={10}
              keyboardType="numeric"
              ref={phoneNumberRef}
              label={'Phone Number'}
            />
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
