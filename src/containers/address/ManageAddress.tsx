import {DataStore} from 'aws-amplify';
import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, FlatList, Text, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {
  CustomButton,
  CustomHeader,
  CustomStatusBar,
  FullScreenLoader,
} from '../../components';
import AddressItem from '../../components/AddressItem';
import {Address} from '../../models';
import {navigate} from '../../services/Routerservices';
import {getScreenHeight} from '../../utils/domUtils';

const ManageAddress = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const userData = useSelector((state: any) => state.auth.userData);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const sub = DataStore.observeQuery(Address, address =>
      address.userID.eq(userData.id),
    ).subscribe(({items}: any) => {
      setLoading(false);
      setData(items);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [userData?.id]);



  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <AddressItem item={item} />
      </View>
    );
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader title="Addresses" />

        <FlatList
          data={data}
          ListEmptyComponent={() => (
            <Text style={styles.title}>No Addresses Found!</Text>
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{padding: getScreenHeight(2)}}
        />
        <View style={{padding: getScreenHeight(2)}}>
        <CustomButton
          title="Add Address"
          action={() => navigate('AddAddress', {})}
        />
        </View>
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
      marginBottom: getScreenHeight(2),
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
    },
    title: {
      color: theme.black,
      fontSize: getScreenHeight(1.8),
    },
  });

export default ManageAddress;
