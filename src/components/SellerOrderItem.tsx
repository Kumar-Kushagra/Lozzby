import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderManager } from "../redux/cart";
import { navigate } from "../services/Routerservices";
import { getScreenHeight } from "../utils/domUtils";

const SellerOrderItem = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

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
                id: props.item.id,
                sellerID: props.item.sellerID,
                status: "ACCEPTED",
                _version: props.item._version,
              })
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
                id: props.item.id,
                sellerID: props.item.sellerID,
                status: "REJECTED",
                _version: props.item._version,
              })
            ),
        },
      ],
      { cancelable: false }
    );
  };
{console.log(props.item.status)}
  return (
    <Pressable
      onPress={() => navigate("OrderDetail", { item: props.item })}
      style={{ ...styles.screen }}
    >
      <View style = {{flexDirection:"row",justifyContent:'space-between'}}>
      <Text style={styles.title}>
        Order ID 
      </Text>
      <Text style={{...styles.title,fontWeight:"normal"}}>#{(props.item.id.substring(0, 6)).toUpperCase()}</Text>
     
      </View>
      <View style = {{flexDirection:"row",justifyContent:'space-between'}}>
      <Text style={styles.title}>Total Amount </Text>
      <Text style={{...styles.title,fontWeight:"normal"}}>${props.item.total.toFixed(2)}</Text>
      </View>
      {props.item.status === "PENDING" ? (
        <View style={styles.row}>
          <TouchableOpacity style={{borderRadius:getScreenHeight(5),width:"35%",backgroundColor:'green',height:getScreenHeight(4),justifyContent:"center",alignItems:"center",alignSelf:'center'}} onPress={acceptHandler}>
            <Text style={[styles.title,{color:theme.white,fontSize:getScreenHeight(2)}]}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{borderRadius:getScreenHeight(5),width:"35%",backgroundColor:'#cc0000',height:getScreenHeight(4),justifyContent:"center",alignItems:"center",alignSelf:'center'}} onPress={rejectHandler}>
            <Text style={[styles.title, { color: theme.white ,fontSize:getScreenHeight(2)}]}>
              Decline
            </Text>
          </TouchableOpacity>
        </View>
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
      fontWeight:"700",

    },
    row: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      height:getScreenHeight(4),
      marginTop:getScreenHeight(1.5),
      marginBottom : getScreenHeight(0.5)
    },
  });

export default SellerOrderItem;
