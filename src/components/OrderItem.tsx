import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderManager } from "../redux/cart";
import { navigate } from "../services/Routerservices";
import { getScreenHeight } from "../utils/domUtils";

const OrderItem = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  const handler = () => {
    Alert.alert(
      "Are you sure?",
      "you wanted to Cancel the order?",
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
                id: props.item.id,
                sellerID: props.item.sellerID,
                status: "CANCELLED",
                _version: props.item._version,
              })
            ),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Pressable
      onPress={() => navigate("OrderDetail", { item: props.item })}
      style={{ ...styles.screen }}
    >
      <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
        <Text style={styles.title}>
          Order ID
        </Text>
        <Text style={{ ...styles.title, fontWeight: "normal" }}>#{(props.item.id.substring(0, 6)).toUpperCase()}</Text>

      </View>
      <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
        <Text style={styles.title}>Total Amount </Text>
        <Text style={{ ...styles.title, fontWeight: "normal" }}>${props.item.total.toFixed(2)}</Text>
      </View>
      {props.item.status === "PENDING" ? (
        <TouchableOpacity style={{ borderRadius: getScreenHeight(5), marginTop: getScreenHeight(1), width: "40%", backgroundColor: '#cc0000', height: getScreenHeight(4.5), justifyContent: "center", alignItems: "center", alignSelf: 'center' }} onPress={handler}>
          <Text style={[styles.title, { color: theme.white }]}>
            Cancel Order
          </Text>
        </TouchableOpacity>
      ) : null}
      {props.item.status === "ACCEPTED" ? (
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={styles.title}>
            Status
          </Text>
          <Text style={[styles.title, { color: "green" }]}>Accepted</Text>
        </View>
      ) : null}
      {props.item.status === "REJECTED" ? (
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={styles.title}>
            Status
          </Text>
          <Text style={[styles.title, { color: "darkred" }]}>Rejected</Text>
        </View>

      ) : null}
      {props.item.status === "CANCELLED" ? (
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={styles.title}>
            Status
          </Text>
          <Text style={[styles.title, { color: "darkred" }]}>Cancelled</Text>
        </View>

      ) : null}

      {props.item.status === "DELIVERED" ? (
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={styles.title}>
            Status
          </Text>
          <Text style={[styles.title, { color: "green" }]}>Delivered</Text>
        </View>
      ) : null}

      {props.item.status === "COMPLETED" ? (
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={styles.title}>
            Status
          </Text>
          <Text style={[styles.title, { color: "green" }]}>Completed</Text>
        </View>
      ) : null}
    </Pressable>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: "lavender",
      borderRadius: getScreenHeight(1),
      padding: getScreenHeight(1),
    },

    title: {
      color: theme.black,
      fontSize: getScreenHeight(2.1),
      fontWeight: "bold"
    },
  });

export default OrderItem;
