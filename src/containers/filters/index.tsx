import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { CustomButton, CustomHeader, CustomStatusBar } from '../../components';
import { Productcategories } from '../../models';
import { goBack } from '../../services/Routerservices';
import { getScreenHeight, getScreenWidth, showToast } from '../../utils/domUtils';

const priceRangeData: any = [
  { title: '$10 - $500', value: { greaterThan: 10, lowerThan: 500 } },
  { title: '$500 - $1000', value: { greaterThan: 500, lowerThan: 1000 } },
  { title: '$1000+', value: { greaterThan: 1000 } },
];

const Filters = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const filterManager = props.route.params.filterManager;
  const filter = props.route.params.filter;
  const setFilter = props.route.params.setFilter;
  const value = props.route.params.value;
  const [priceData, setPriceData]: any = useState(null);
  const [cat, setCat]: any = useState(null);
  const [priceRange, setPriceRange] = useState(null);

  const handler = () => {
    Alert.alert(
      "Are you sure?",
      "You want to remove all the filter applied?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setFilter(null)
            showToast("Filter has been removed successfully!")
            goBack()
          }
        },
      ],
      { cancelable: false }
    );
  };
  
  useEffect(() => {
    if (value) {
      if (value.sort) {
        setPriceRange(value.value);
      } else {
        let index = priceRangeData.findIndex((item: any) => {
          if (item.value.greaterThan === value?.priceData?.greaterThan) {
            return true;
          }
        });
        if (value) {
          setCat(value?.categoryData);
          setPriceData(index);
        }
      }
    }
  }, [value]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader title="Filters" />
        <ScrollView>
          <View style={styles.contanier}>
            <Text style={styles.title}>Filter By Price</Text>
            {priceRangeData.map((item: any, index: any) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setPriceData(index);
                  }}
                  key={index}
                  style={styles.row}>
                  <Text style={styles.subtitle}>{item.title}</Text>

                  <View style={styles.outerCircle}>
                    {priceData === index ? (
                      <View style={styles.innerCircle} />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
            <View style={{ height: getScreenHeight(2) }} />

            <Text style={styles.title}>Filter By Categories</Text>
            {Object.keys(Productcategories).map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setCat(item);
                  }}
                  key={index}
                  style={styles.row}>
                  <Text style={styles.subtitle}>{item}</Text>

                  <View style={styles.outerCircle}>
                    {cat === item ? <View style={styles.innerCircle} /> : null}
                  </View>
                </TouchableOpacity>
              );
            })}
            <View style={{ height: getScreenHeight(2) }} />

            <CustomButton
              action={() => {
                filterManager({
                  priceData: priceRangeData[priceData]?.value,
                  categoryData: cat,
                });
                goBack();
              }}
              title="Apply"
            />
          </View>
          <View style={{ height: getScreenHeight(4) }}></View>
          <Text style={styles.title}>Sort By Price</Text>

          <TouchableOpacity
            onPress={() => {
              filterManager({ sort: true, value: 'desc', filterBy: 'price' });
              goBack();
            }}
            style={styles.row}>
            <Text style={styles.subtitle}>{'High to Low'}</Text>
            <View style={styles.outerCircle}>
              {priceRange === 'desc' ? (
                <View style={styles.innerCircle} />
              ) : null}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              filterManager({ sort: true, value: 'asc', filterBy: 'price' });
              goBack();
            }}
            style={styles.row}>
            <Text style={styles.subtitle}>{'Low to High'}</Text>
            <View style={styles.outerCircle}>
              {priceRange === 'asc' ? (
                <View style={styles.innerCircle} />
              ) : null}
            </View>
          </TouchableOpacity>

        </ScrollView>
        {filter && <TouchableOpacity style={{ ...styles.clear }} onPress={() => {
          handler()
        }}>
          <Text style={styles.clearText}>Reset Filter</Text>
        </TouchableOpacity>
        }
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
    item: {
      marginTop: getScreenHeight(2),
    },
    contanier: {
      padding: getScreenHeight(2),
    },
    title: {
      color: theme.textcolor,
      fontSize: getScreenHeight(2.5),
      alignSelf: 'center',
      fontWeight: "bold"
    },
    subtitle: {
      color: theme.textcolor,
      fontSize: getScreenHeight(2),

    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: getScreenHeight(2),
      paddingVertical: getScreenHeight(1.5)
    },
    outerCircle: {
      borderWidth: getScreenHeight(0.1),
      borderColor: theme.textcolor,
      width: getScreenHeight(2),
      height: getScreenHeight(2),
      borderRadius: getScreenHeight(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerCircle: {
      backgroundColor: theme.black,
      width: getScreenHeight(1),
      height: getScreenHeight(1),
      borderRadius: getScreenHeight(2),
    },
    clear: {
      justifyContent: 'center',
      alignItems: 'center',
      height: getScreenHeight(6),
      width: "90%",
      borderRadius: getScreenHeight(1),
      backgroundColor: theme.primary,
      position: "absolute",
      bottom: getScreenHeight(5),
      alignSelf: "center"
    },
    clearText: {
      fontSize: getScreenHeight(2.2),
      fontWeight: "bold",
      color: theme.white
    }
  });

export default Filters;
