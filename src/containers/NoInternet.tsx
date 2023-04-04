import React, {useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {CustomStatusBar} from '../components';
import {getScreenHeight} from '../utils/domUtils';

const NoInternet = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <View style={{marginTop: getScreenHeight(35)}}>
          <FastImage
            style={styles.image}
            resizeMode={'contain'}
            source={require('../assets/images/no-signal.png')}
          />
          <Text
            style={{
              marginTop: getScreenHeight(2),
              ...styles.title,
              textAlign: 'center',
              fontSize: getScreenHeight(2.5),
              color: theme.productTitle,
              fontWeight: 'bold',
            }}>
            No Internet Connection!
          </Text>
        </View>
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
    title: {
      color: theme.productTitle,
      fontSize: getScreenHeight(1.8),
    },
    image: {
      height: getScreenHeight(20),
      width: '100%',
      alignSelf:"center",
    },
  });

export default NoInternet;
