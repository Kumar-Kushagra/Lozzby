import React, {useMemo} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getScreenHeight} from '../utils/domUtils';

const CustomButton = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const loading = useSelector((state: any) => state.common.loading);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      disabled={props.disabled || loading}
      style={{...styles.screen, backgroundColor : props.disabled ? "grey" : theme.primary}}
      onPress={props.action}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.title}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      height: getScreenHeight(6),
      borderRadius: getScreenHeight(1),
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.primary,
    },
    title: {
      fontSize: getScreenHeight(2),
      color: theme.white,
      fontWeight:"500"
    },
  });

export default CustomButton;
