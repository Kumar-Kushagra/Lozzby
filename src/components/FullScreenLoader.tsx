// import React from 'react';
// import {ActivityIndicator, StatusBar, View} from 'react-native';
// import {useSelector} from 'react-redux';
// import {BarIndicator} from 'react-native-indicators';

// const FullScreenLoader = (props: any) => {
//   const theme = useSelector((state: any) => state.theme.theme);

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: theme.background}}>
//       <BarIndicator size={30} count={5} color={theme.productTitle} />
//     </View>
//   );
// };

// export default FullScreenLoader;


import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import { useSelector } from 'react-redux';

const FullScreenLoader = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      >
      <View style={styles.modalScreen}>
        <BarIndicator size={30} count={5} color={theme.white} />
      </View>
    </Modal>
  );
};

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

export default FullScreenLoader;
