import React, {useMemo} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getScreenHeight} from '../utils/domUtils';

const CustomLoader = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: getScreenHeight(2),
      color: theme.white,
    },
  });

export default CustomLoader;
