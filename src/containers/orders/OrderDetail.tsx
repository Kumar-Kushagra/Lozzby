
import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, FlatList, Text, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import {
  CustomButton,
  CustomHeader,
  CustomStatusBar,
  FullScreenLoader,
} from "../../components";
import { orderDetailManager, updateOrderManager } from "../../redux/cart";
import { goBack } from "../../services/Routerservices";
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

  const renderItem = ({ item, index }: any) => {
    return (
      <View style={{ flexDirection: 'row' ,marginHorizontal:getScreenHeight(1)}}>
        <Text style={{marginTop:getScreenHeight(0.5),...styles.title,color:theme.primary,fontSize:getScreenHeight(2.3)}}>{index + 1 + "."}</Text>
        <View style={{ padding: getScreenHeight(0.7), paddingHorizontal: getScreenHeight(1) }}>
          <Text style={styles.title}>Name: {item.productName}</Text>
          <Text style={styles.title}>Price ${item.productPrice.toFixed(2)}</Text>
          <Text style={styles.title}>Quantity: {item.quantity}</Text>
          <Text style={styles.title} >Subtotal: ${(parseFloat(item.productPrice) * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  if (!orderData) {
    return <FullScreenLoader />;
  }



  const acceptHandler = () => {
    Alert.alert(
      "Are you sure?",
      "You want to accept this order.", // <- this part is optional, you can pass an empty string
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            dispatch<any>(
              updateOrderManager({
                id: itemData.id,
                sellerID: itemData.sellerID,
                status: "ACCEPTED",
                _version: itemData._version,
              }),
              goBack()
            ),
        },
      ],
      { cancelable: false }
    );
  };

  const rejectHandler = () => {
    Alert.alert(
      "Are you sure?",
      "You want to reject this order.", // <- this part is optional, you can pass an empty string
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            dispatch<any>(
              updateOrderManager({
                id: itemData.id,
                sellerID: itemData.sellerID,
                status: "REJECTED",
                _version: itemData._version,
              }),
              goBack()
            ),
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader title={`Order Detail (${itemData?.status})`} />

        <FlatList
          ListHeaderComponent={() => {
            return (
              <View style={{ padding: getScreenHeight(2), flexDirection: "row", justifyContent: "space-between", backgroundColor: "lavender" }}>
                <Text
                  style={{ fontSize: getScreenHeight(2.5), color: theme.black }}
                >
                  Total Products
                </Text>
                <Text
                  style={{ fontSize: getScreenHeight(2), color: theme.primary, fontWeight: 'bold' }}
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
                <Text style={{ ...styles.title, fontWeight: 'bold', fontSize: getScreenHeight(2.5), color: theme.primary, textDecorationLine: 'underline' }}>Address</Text>
                <Text style={{ ...styles.title, marginTop: getScreenHeight(0.5), width: "80%" }}>{orderData[0].Address.streetAddress + ", " + orderData[0].Address.city + ', ' + orderData[0].Address.province + ', ' + orderData[0].Address.country + " - " + orderData[0].Address.pincode.toUpperCase()}</Text>
                <Text style={styles.title}>{orderData[0].Address.phoneNumber}</Text>
              </View>
            );
          }}
        />

       
        <View style={{ padding: getScreenHeight(2), paddingHorizontal: getScreenHeight(3), flexDirection: "row", justifyContent: "space-between", backgroundColor: "lavender" }}>
          <Text
            style={{
              color: theme.black,
              fontSize: getScreenHeight(2.5),
              fontWeight: "700"
            }}
          >
            Total Amount </Text>
          <Text
            style={{
              color: theme.black,
              fontSize: getScreenHeight(2.5),
            }}
          > ${totalAmount.toFixed(2)}
          </Text>
        </View>
        <View style={{ padding: getScreenHeight(1) }}>
          {itemData.status === "PENDING" && userData.id === itemData.sellerID ? (
            <View style={styles.row}>
              <TouchableOpacity style={{ borderRadius: getScreenHeight(5), width: "45%", backgroundColor: 'green', height: getScreenHeight(5), justifyContent: "center", alignItems: "center", alignSelf: 'center' }} onPress={acceptHandler}>
                <Text style={[styles.title, { color: theme.white, fontSize: getScreenHeight(2.5) }]}>Accept</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ borderRadius: getScreenHeight(5), width: "45%", backgroundColor: 'red', height: getScreenHeight(5), justifyContent: "center", alignItems: "center", alignSelf: 'center' }} onPress={rejectHandler}>
                <Text style={[styles.title, { color: theme.white, fontSize: getScreenHeight(2.5) }]}>
                  Decline
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

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
    title: {
      fontSize: getScreenHeight(2),
      color: "black",
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      height: getScreenHeight(5),
      marginTop: getScreenHeight(1),

    },
    row1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: getScreenHeight(1),
    },
  });

export default OrderDetail;
