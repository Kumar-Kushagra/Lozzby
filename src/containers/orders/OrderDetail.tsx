import { useFocusEffect } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import {
  CustomButton,
  CustomHeader,
  CustomStatusBar,
  FullScreenLoader,
} from "../../components";
import { orderDetailManager, updateOrderManager } from "../../redux/cart";
import { getScreenHeight } from "../../utils/domUtils";

const OrderDetail = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const orderData = useSelector((state: any) => state.cart.orderData);
  const userData = useSelector((state: any) => state.auth.userData);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const itemData = props.route.params.item;
  const id = itemData.id;
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch<any>(orderDetailManager(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    let total = 0;
    if (orderData) {
      if (orderData[0]?.OrderItems?.items) {
        orderData[0]?.OrderItems?.items.map((item: any) => {
          total = total + parseFloat(item.productPrice) * item.quantity;
        });
        setTotalAmount(total);
      }
    }
  }, [orderData]);

  const renderItem = ({ item }: any) => {
    return (
      <View style={{ padding: getScreenHeight(2) }}>
        <Text style={styles.title}>Name: {item.productName}</Text>
        <Text style={styles.title}>Price ${item.productPrice.toFixed(2)}</Text>
        <Text style={styles.title}>Quantity: {item.quantity}</Text>
        <Text>subtotal: ${(parseFloat(item.productPrice) * item.quantity).toFixed(2)}</Text>
      </View>
    );
  };

  if (!orderData) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader title={`Order Detail (${itemData?.status})`} />
        <FlatList
          ListHeaderComponent={() => {
            return (
              <View style={{ padding: getScreenHeight(2),flexDirection:"row",justifyContent:"space-between" }}>
                <Text
                  style={{ fontSize: getScreenHeight(2.5), color: theme.black }}
                >
                  Total Products 
                </Text>
                <Text
                  style={{ fontSize: getScreenHeight(2), color: theme.primary,fontWeight:'bold' }}
                >
                  {orderData[0]?.OrderItems?.items.length}
                </Text>
              </View>
            );
          }}
         
          data={orderData[0]?.OrderItems?.items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <Text style={styles.title}>No data found!</Text>
          )}
          ListFooterComponent={() => {
            return (
              <View style={{ padding: getScreenHeight(2) }}>
                <Text style={styles.title}>Shipping Address</Text>
                <Text style={styles.title}>
                  country: {orderData[0].Address.country}
                </Text>
                <Text style={styles.title}>
                  Province: {orderData[0].Address.province}
                </Text>
                <Text style={styles.title}>
                  Pincode: {orderData[0].Address.pincode}
                </Text>
                <Text style={styles.title}>
                  PhoneNumber: {orderData[0].Address.phoneNumber}
                </Text>

                <Text
                  style={{
                    color: theme.black,
                    marginVertical: getScreenHeight(5),
                    fontSize: getScreenHeight(2.5),
                  }}
                >
                  Total Amount ${totalAmount.toFixed(2)}
                </Text>
                
              </View>
            );
          }}
        />
        {itemData.status === "ACCEPTED" && userData.id === itemData.sellerID ? (
          <CustomButton
            title="Mark as completed"
            action={() => {
              dispatch<any>(
                updateOrderManager({
                  id: itemData.id,
                  sellerID: itemData.sellerID,
                  status: "COMPLETED",
                  _version: itemData._version,
                })
              );
            }}
          />
        ) : null}
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
    title: {
      fontSize: getScreenHeight(1.8),
      color: theme.black,
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
  });

export default OrderDetail;
