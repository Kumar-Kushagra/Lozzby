import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomHeader,
  CustomStatusBar,
  CustomInput,
  CustomAvatar,
  CustomButton,
} from '../../components';
import {Productcategories} from '../../models';
import {createProductManager} from '../../redux/home';
import {getScreenHeight, showToast} from '../../utils/domUtils';

const AddProduct = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const nameRef: any = useRef();
  const profileRef: any = useRef();
  const descriptionRef: any = useRef();
  const priceRef: any = useRef();
  const availableQuantityRef: any = useRef();
  const [category, setCategory] = useState('');
  const userData = useSelector((state: any) => state.auth.userData);

  useEffect(() => {
    if (!userData?.phoneNumber) {
      showToast('You cannot add products before completing your profile!');

    }
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const validate = () => {
    if (!profileRef.current.getValue()) {
      return showToast('Image is compulsry, Please add one');
    }
    if (!nameRef.current.getValue()) {
      return showToast('Name is compulsry, Please add one');
    }
    if (!descriptionRef.current.getValue()) {
      return showToast('Description is compulsry, Please add one');
    }
    if (!priceRef.current.getValue()) {
      return showToast('Price is compulsry, Please add one');
    }
    if (!availableQuantityRef.current.getValue()) {
      return showToast('Quantity is compulsry, Please add one');
    }
    if (category.length === 0) {
      return showToast('Please select Category');
    }
    let data = {
      name: nameRef.current.getValue(),
      image: profileRef.current.getValue(),
      price: parseFloat(priceRef.current.getValue()),
      description: descriptionRef.current.getValue(),
      quantity: parseFloat(availableQuantityRef.current.getValue()),
      category: Productcategories[category],
    };
    dispatch<any>(createProductManager(data));
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader title="Add Product" />
        <ScrollView contentContainerStyle={styles.contanier}>
          <View style={styles.item}>
            <CustomAvatar ref={profileRef} />
          </View>
          <View style={styles.item}>
            <CustomInput ref={nameRef} label={'Name'} />
          </View>
          <View style={styles.item}>
            <CustomInput ref={descriptionRef} multiline={true} label={'Description'} />
          </View>
          <View style={styles.item}>
            <CustomInput
              keyboardType={'numeric'}
              ref={priceRef}
              label={'Price'}
            />
          </View>
          <View style={styles.item}>
            <CustomInput
              keyboardType={'numeric'}
              ref={availableQuantityRef}
              label={'Available Quantity'}
            />
          </View>
          <View style={{height: getScreenHeight(2)}} />
          <Text style={styles.title}>
            Select Category{' '}
            <Text style={styles.subtitle}>(once selected can't change)</Text>
          </Text>
          {Object.keys(Productcategories).map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => setCategory(item)}
                key={index}
                style={styles.row}>
                <Text style={styles.subtitle}>
                  {capitalizeFirstLetter(item.toLocaleLowerCase())}
                </Text>

                <View style={styles.outerCircle}>
                  {category === item ? (
                    <View style={styles.innerCircle} />
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}

          <View style={styles.item}>
            <CustomButton
              disabled={userData?.phoneNumber?.length > 0 ? false : true}
              action={validate}
              title="Add Product"
            />
          </View>
          <View style={{height: getScreenHeight(2)}}></View>
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
      fontWeight: 'bold',
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: getScreenHeight(2),
    },
    title: {
      fontSize: getScreenHeight(2),
      color: theme.black,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: getScreenHeight(1.8),
      color: theme.black,
      fontWeight: 'bold',
    },
    outerCircle: {
      borderWidth: getScreenHeight(0.1),
      borderColor: theme.black,
      width: getScreenHeight(2),
      height: getScreenHeight(2),
      borderRadius: getScreenHeight(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerCircle: {
      backgroundColor: theme.black,
      width: getScreenHeight(1),
      height: getScreenHeight(1),
      borderRadius: getScreenHeight(2),
    },
  });

export default AddProduct;
