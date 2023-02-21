import { useFocusEffect } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { CustomHeader, CustomStatusBar } from "../../components";
import OrderItem from "../../components/OrderItem";
import { Order } from "../../models";
import { getScreenHeight } from "../../utils/domUtils";

const UserOrders = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const userData = useSelector((state: any) => state.auth.userData);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [orderData, setOrderData] = useState([]);
  const [orderStatus, setOrderStatus] = useState("PENDING");

  useFocusEffect(
    React.useCallback(() => {
      const res = DataStore.observeQuery(Order, (c) =>
        c.and((order) => [
          order.userID.eq(userData.id),
          order.status.eq(orderStatus),
        ])
      ).subscribe(({ items }: any) => {
        setOrderData(items);
      });
      return () => res.unsubscribe();
    }, [userData?.id, orderStatus])
  );
  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.item}>
        <OrderItem item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <CustomStatusBar light color={theme.primary} />
      <View style={styles.screen}>
        <CustomHeader hide title="Orders" />
        <View style={{ padding: getScreenHeight(0.1),paddingTop:getScreenHeight(2.5) }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
          >
            <TouchableOpacity
              onPress={() => {
                setOrderStatus("PENDING");
              }}
              style={{  marginRight: getScreenHeight(1),marginLeft:getScreenHeight(1),  backgroundColor:"lavender",padding:getScreenHeight(1),borderRadius:16,paddingHorizontal:getScreenHeight(3) }}
            >
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      orderStatus === "PENDING" ? theme.primary : theme.black,
                  },
                ]}
              >
                Pending
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setOrderStatus("ACCEPTED");
              }}
              style={{ marginRight: getScreenHeight(1),marginLeft:getScreenHeight(1),  backgroundColor:"lavender",padding:getScreenHeight(1),borderRadius:16,paddingHorizontal:getScreenHeight(3) }}
            >
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      orderStatus === "ACCEPTED" ? theme.primary : theme.black,
                  },
                ]}
              >
                Accepted
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setOrderStatus("REJECTED");
              }}
              style={{  marginRight: getScreenHeight(1),marginLeft:getScreenHeight(1),  backgroundColor:"lavender",padding:getScreenHeight(1),borderRadius:16,paddingHorizontal:getScreenHeight(3) }}
            >
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      orderStatus === "REJECTED" ? theme.primary : theme.black,
                  },
                ]}
              >
                Rejected
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setOrderStatus("DELIVERED");
              }}
              style={{  marginRight: getScreenHeight(1),marginLeft:getScreenHeight(1),  backgroundColor:"lavender",padding:getScreenHeight(1),borderRadius:16,paddingHorizontal:getScreenHeight(3) }}
            >
               <Text
                style={[
                  styles.title,
                  {
                    color:
                      orderStatus === "DELIVERED" ? theme.primary : theme.black,
                  },
                ]}
              >
                Delivered
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setOrderStatus("COMPLETED");
              }}
              style={{  marginRight: getScreenHeight(1),marginLeft:getScreenHeight(1),  backgroundColor:"lavender",padding:getScreenHeight(1),borderRadius:16,paddingHorizontal:getScreenHeight(3) }}
            >
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      orderStatus === "COMPLETED" ? theme.primary : theme.black,
                  },
                ]}
              >
                Completed
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setOrderStatus("CANCELLED");
              }}
              style={{ marginRight: getScreenHeight(1),marginLeft:getScreenHeight(1), backgroundColor:"lavender",padding:getScreenHeight(1),borderRadius:16,paddingHorizontal:getScreenHeight(3) }}
            >
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      orderStatus === "CANCELLED" ? theme.primary : theme.black,
                  },
                ]}
              >
                Cancelled
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <FlatList
          contentContainerStyle={{ padding: getScreenHeight(2) }}
          data={orderData}
          ListEmptyComponent={() => (
            <Text style={styles.title}>No orders yet!</Text>
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
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
    title: {
      fontSize: getScreenHeight(1.8),
      color: theme.black,
      fontWeight:"700"
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
  });

export default UserOrders;
