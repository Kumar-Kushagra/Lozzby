import {useFocusEffect} from '@react-navigation/native';
import {DataStore, Predicates, SortDirection} from 'aws-amplify';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {CustomHeader, CustomStatusBar, FullScreenLoader} from '../components';
import ProductItem from '../components/ProductItem';
import {Product, Productcategories} from '../models';
import {navigate} from '../services/Routerservices';
import {getScreenHeight, getScreenWidth} from '../utils/domUtils';

const Home = () => {
  
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter]: any = useState(null);
  const dispatch = useDispatch();
  const subRef: any = useRef();
  const [search,setSearch] = useState("")

  const filterManager = (text: any) => {
    if (text?.sort) {
      setFilter(text);
    } else if (text?.categoryData || text?.priceData) {
      setFilter(text);
    }
  };

  useEffect(() => {
    if (filter) {
      if (filter?.sort) {
        if (filter?.filterBy === 'price') {
          subRef.current = DataStore.observeQuery(Product, Predicates.ALL, {
            sort: s =>
              filter.value === 'desc'
                ? s.price(SortDirection.DESCENDING)
                : s.price(SortDirection.ASCENDING),
          }).subscribe(({items}: any) => {
            setLoading(false);
            setData(items);
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
            return arr;
          }),
        ).subscribe(({items}: any) => {
          setLoading(false);
          setData(items);
        });
      }
    } else {
      subRef.current = DataStore.observeQuery(Product).subscribe(
        ({items}: any) => {
          setLoading(false);
          setData(items);
        },
      );
    }

    return () => {
      subRef.current.unsubscribe();
    };
  }, [filter, setData]);

  const renderItem = ({item}: any) => {
    return (
      <Pressable
        onPress={() => navigate('ProductDetail', {data: item})}
        style={styles.item}>
        <ProductItem item={item} />
      </Pressable>
    );
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader hide title="Home" />
        <View
          style={{
            height: getScreenHeight(6),
            backgroundColor: 'lavender',
            marginTop: getScreenHeight(1),
            borderRadius: getScreenHeight(2),
            width: '92%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder="Search"
            value = {search}
            onChangeText = {setSearch}
            style={{
              width: '85%',
              borderRadius: getScreenHeight(2),
              paddingLeft : getScreenHeight(3),
              fontWeight : "bold",
              fontSize : getScreenWidth(4)
            }}
            placeholderTextColor = {theme.light_grey}
          />
          <View
            activeOpacity={0.5}
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
        <FlatList
          numColumns={2}
          data={data.filter(item => {
            return item.name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase());
        })}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No Data Found</Text>}
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
      height: getScreenHeight(6),
      width: getScreenWidth(7),
    },
  });

export default Home;
