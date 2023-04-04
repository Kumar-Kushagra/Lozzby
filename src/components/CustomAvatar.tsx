import React, {forwardRef, useImperativeHandle, useMemo, useState} from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {getScreenHeight} from '../utils/domUtils';
import {launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import {gallery} from '../constants/images';
import {Storage} from 'aws-amplify';

const CustomAvatar = forwardRef((props: any, ref: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    getValue() {
      return image;
    },
    setValue(value: any) {
      if (value) {
        setLoading(true);
        getImage(value);
      }
    },
  }));

  const action = async () => {
    try {
      const result: any = await launchImageLibrary({mediaType: 'photo'});
      setImage(result.assets[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getImage = async (value: any) => {
    const mainLink = await Storage.get(value, {});
    setLoading(false);
    setImage({uri: mainLink});
  };

  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={{...styles.screen}}
      onPress={action}>
      {loading ? <ActivityIndicator style={styles.loading} /> : null}
      {image.uri ? (
        <FastImage
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false);
          }}
          style={styles.image}
          source={{uri: image.uri, priority: FastImage.priority.normal}}
        />
      ) : (
        <FastImage style={styles.icon} tintColor={theme.textcolor} resizeMode="contain" source={gallery} />
      )}
    </TouchableOpacity>
  );
});

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      height: getScreenHeight(12),
      borderRadius: getScreenHeight(12),
      width: getScreenHeight(12),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.productTitle,
      borderWidth: getScreenHeight(0.2),
      alignSelf: 'center',
    },
    icon: {
      height: getScreenHeight(4),
      width: getScreenHeight(4),
    },
    image: {
      height: getScreenHeight(12),
      borderRadius: getScreenHeight(12),
      width: getScreenHeight(12),
    },
    loading: {
      zIndex: 10,
      position: 'absolute',
    },
  });

export default CustomAvatar;
