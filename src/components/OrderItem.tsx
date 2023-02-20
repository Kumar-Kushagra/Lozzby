import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
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
      <Text style={styles.title}>
        Order ID #{(props.item.id.substring(0, 6)).toUpperCase()}
      </Text>
      <Text style={styles.title}>Total Amount ${props.item.total.toFixed(2)}</Text>
      <Text style={styles.title}>Status : {props.item.status}</Text>
      {props.item.status === "PENDING" ? (
        <TouchableOpacity onPress={handler}>
          <Text style={[styles.title, { color: theme.primary }]}>
            Cancel Order
          </Text>
        </TouchableOpacity>
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
      fontSize: getScreenHeight(1.8),
      fontWeight:"bold"
    },
  });

export default OrderItem;
