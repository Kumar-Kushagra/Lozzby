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
      style={{...styles.screen}}
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
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'center',
      backgroundColor: theme.primary,
    },
    title: {
      fontSize: getScreenHeight(2.5),
      color: theme.white,
      fontWeight : "bold"
    },
  });

export default CustomButton;
