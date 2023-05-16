import React from 'react';
import {
  Modal,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import {useSelector} from 'react-redux';

// const FullScreenLoader = (props: any) => {
//   const theme = useSelector((state: any) => state.theme.theme);

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: theme.background}}>
//       <BarIndicator size={30} count={5} color={theme.productTitle} />
//     </View>
//   );
// };

const FullScreenLoader = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  return (
    <View style={styles.modalScreen}>
      <ActivityIndicator size={30} count={5} color={theme.white} />
    </View>
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
  modalScreen: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginVertical: 10,
  },
});
