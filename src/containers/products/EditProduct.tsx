import {useFocusEffect} from '@react-navigation/native';
import React, {useMemo, useRef} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomHeader,
  CustomStatusBar,
  CustomInput,
  CustomAvatar,
  CustomButton,
} from '../../components';
import {updateProductManager} from '../../redux/auth';
import {getScreenHeight, showToast} from '../../utils/domUtils';

const EditProduct = (props: any) => {
  const data = props.route.params.data;
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const nameRef: any = useRef();
  const profileRef: any = useRef();
  const quantityRef: any = useRef();
  const descriptionRef: any = useRef();
  const priceRef: any = useRef();

  useFocusEffect(
    React.useCallback(() => {
      nameRef.current.setValue(data.name);
      profileRef.current.setValue(data.image);
      descriptionRef.current.setValue(data.description);
      quantityRef.current.setValue(data.quantity);
      priceRef.current.setValue(data.price.toString());
    }, [data.description, data.image, data.name, data.price, data.quantity]),
  );

  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function containsOnlyNumbers(str: any) {
    return /^\d+\.\d+$|^\d+$/.test(str);
  }

  const validate = () => {
    if (!profileRef.current.getValue()) {
      return showToast('Image is compulsry, Please add one');
    }
    if (!nameRef.current.getValue()) {
      return showToast('Name is compulsry, Please add one!');
    }
    if (!descriptionRef.current.getValue()) {
      return showToast('Description is compulsry, Please add one!');
    }
    if (!priceRef.current.getValue()) {
      return showToast('Price is compulsry, Please add one!');
    }
    if (!containsOnlyNumbers(priceRef.current.getValue())) {
      return showToast('Price can only be a number!');
    }
    if (!quantityRef.current.getValue()) {
      return showToast('Quantity is compulsry, Please add one!');
    }
    if (!containsOnlyNumbers(quantityRef.current.getValue())) {
      return showToast('Quantity can only be a number!');
    }

    let mainData = {
      name: nameRef.current.getValue(),
      image: profileRef.current.getValue(),
      description: descriptionRef.current.getValue(),
      quantity: quantityRef.current.getValue(),
      price: priceRef.current.getValue(),
      _version: data._version,
      id: data.id,
    };
    dispatch<any>(updateProductManager(mainData));
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader title="Edit Product" />

        <ScrollView contentContainerStyle={styles.contanier}>
          <View style={styles.item}>
            <CustomAvatar ref={profileRef} />
          </View>

          <View style={styles.item}>
            <CustomInput
              maxLength={20}
              multiline={true}
              ref={nameRef}
              label={'Name'}
            />
          </View>

          <View style={styles.item}>
            <CustomInput ref={descriptionRef} label={'Description'} />
          </View>

          <View style={styles.item}>
            <CustomInput ref={priceRef} label={'Price'} />
          </View>

          <View style={styles.item}>
            <CustomInput ref={quantityRef} label={'Available Quantity'} />
          </View>
          <View style={styles.item}>
            <CustomButton action={validate} title="Update Product" />
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

export default EditProduct;
