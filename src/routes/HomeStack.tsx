import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomBar from './BottomBar';
import EditUserProfile from '../containers/profile/EditUserProfile';
import AddProduct from '../containers/products/AddProduct';
import ProductDetail from '../containers/products/ProductDetail';
import ManageProducts from '../containers/products/ManageProducts';
import Cart from '../containers/cart';
import AddAddress from '../containers/address/AddAddress';
import ManageAddress from '../containers/address/ManageAddress';
import EditAddress from '../containers/address/EditAddress';
import ChooseAddress from '../containers/cart/ChooseAddress';
import OrderDetail from '../containers/orders/OrderDetail';


const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="BottomBar"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomBar" component={BottomBar} />
        <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="ManageProducts" component={ManageProducts} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="ManageAddress" component={ManageAddress} />
        <Stack.Screen name="EditAddress" component={EditAddress} />
        <Stack.Screen name="ChooseAddress" component={ChooseAddress} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
