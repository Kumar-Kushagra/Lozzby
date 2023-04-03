import { DataStore, Predicates, SortDirection } from 'aws-amplify';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { CustomHeader, CustomStatusBar, FullScreenLoader } from '../components';
import CartCount from '../components/CartCount';
import ProductItem from '../components/ProductItem';
import { Product, Productcategories } from '../models';
import { cartDataManager, getWishlistItemsManager } from '../redux/cart';
import { navigate } from '../services/Routerservices';
import { getScreenHeight, getScreenWidth, showToast } from '../utils/domUtils';

const Home = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const userData = useSelector((state: any) => state.auth.userData);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter]: any = useState(null);
  const dispatch = useDispatch();
  const subRef: any = useRef();
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    if (userData?.id) {
      dispatch<any>(getWishlistItemsManager(userData.id));
    }
  }, [userData?.id]);

  const filterManager = useCallback((text: any) => {
    if (text?.sort) {
      setFilter(text);
    } else if (text?.categoryData || text?.priceData) {
      setFilter(text);
    }
  }, []);

  useEffect(() => {
    if (filter) {
      if (filter?.sort) {
        if (filter?.filterBy === 'price') {
          subRef.current = DataStore.observeQuery(Product, Predicates.ALL, {
            sort: s =>
              filter.value === 'desc'
                ? s.price(SortDirection.DESCENDING)
                : s.price(SortDirection.ASCENDING),
          }).subscribe(({ items }: any) => {
            setLoading(false);
            setData(items);
            showToast("Filter has been successfully applied!")
          });
        }
      } else {
        subRef.current = DataStore.observeQuery(Product, product =>
          product.and(item => {
            let arr = [];
            if (filter?.categoryData) {
              arr.push(
                item.category.eq(Productcategories[filter.categoryData]),
              );
            }
            if (filter?.priceData?.greaterThan) {
              arr.push(item.price.gt(filter?.priceData.greaterThan));
            }
            if (filter?.priceData?.lowerThan) {
              arr.push(item.price.lt(filter?.priceData.lowerThan));
            }
            showToast("Filter has been successfully applied!")
            return arr;
          }),
        ).subscribe(({ items }: any) => {
          setLoading(false);
          setData(items);
        });
      }
    } else {
      subRef.current = DataStore.observeQuery(Product).subscribe(
        ({ items }: any) => {
          setLoading(false);
          let a = []
          items.forEach((element) => {
            if (element?.userID !== userData.userID) {
              a.push(element)
            }
          });
          setData(a);
        },
      );
    }
    return () => {
      subRef.current.unsubscribe();
    };
  }, [filter, setData]);

  const renderItem = ({ item }: any) => {
    return (
      <Pressable
        onPress={() => navigate('ProductDetail', { data: item })}
        style={styles.item}>
        <ProductItem item={item} />
      </Pressable>
    );
  };
  useEffect(() => {
    if (userData) {
      dispatch<any>(cartDataManager());
    }
  }, [dispatch, userData]);

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader hide title="Home" cart={<CartCount />} />
        <View style={{ marginTop: getScreenHeight(1), flexDirection: "row", alignItems: "center", alignSelf: "center", justifyContent: "space-between" }}>
          <View
            style={{
              height: getScreenHeight(6),
              backgroundColor: 'lavender',
              marginTop: getScreenHeight(1),
              borderRadius: getScreenHeight(2),
              width: '82%',
              //alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',

            }}>
            <TextInput
              placeholder="Search"
              value={search}
              onChangeText={setSearch}
              style={{
                width: '85%',
                borderRadius: getScreenHeight(2),
                paddingLeft: getScreenHeight(3),
                fontWeight: 'bold',
                fontSize: getScreenWidth(4),
              }}
              placeholderTextColor={theme.light_grey}
            />
            <View
              style={{
                width: '15%',
                borderRadius: getScreenHeight(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FastImage
                resizeMode="contain"
                style={styles.image}
                source={require('../assets/images/search.png')}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => {
            navigate("Filters", { filterManager, value: filter , setFilter,filter});
          }} style={{ justifyContent: "center", alignItems: 'center', marginTop: getScreenHeight(0.7), marginLeft: getScreenHeight(1) }}>
            <FastImage
              resizeMode="contain"
              style={styles.image}
              source={require('../assets/images/filter.png')}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ alignSelf: "center", width: '97%' }}
          numColumns={2}
          data={data.filter(item => {
            return item?.name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase());
          })}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={{ marginTop: getScreenHeight(22) }}>
              <FastImage
                style={styles.image1}
                resizeMode={'contain'}
                source={require('../assets/images/empty-product.png')}
              />
              <Text
                style={{
                  marginTop: getScreenHeight(2),
                  ...styles.title,
                  textAlign: 'center',
                  fontSize: getScreenHeight(2.5),
                  color: theme.primary,
                  fontWeight: 'bold',
                }}>
                No Product Added Yet!
              </Text>
            </View>
          }
          contentContainerStyle={styles.flatlist}
        />
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
      alignSelf: "center"
    },
    title: {
      fontSize: getScreenHeight(2),
      color: theme.black,
    },
    header: {
      padding: getScreenHeight(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flatlist: {
      justifyContent: 'space-between',
      paddingTop: getScreenHeight(2),
      paddingLeft: getScreenHeight(1.5),
    },
    image: {
      height: getScreenHeight(5),
      width: getScreenWidth(6),
    },
    image1: {
      height: getScreenHeight(20),
      width: '100%',
    },
    clear: {
      justifyContent: 'center',
      alignItems: 'center',
      height: getScreenHeight(4),
      width: getScreenWidth(30),
      alignSelf: 'flex-end',
      backgroundColor: "red",
      marginRight: getScreenHeight(2),
      marginTop: getScreenHeight(1.5),
      borderRadius: getScreenHeight(1),
      backgroundColor: theme.primary,
    },
    clearText: {
      fontSize: getScreenHeight(2.5),
      fontWeight: "bold",
      color: theme.white,
    }
  });

export default Home;
