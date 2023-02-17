import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomBar from './BottomBar';
import EditUserProfile from '../containers/profile/EditUserProfile';
import AddProduct from '../containers/products/AddProduct';
import ProductDetail from '../containers/products/ProductDetail';
import ManageProducts from '../containers/products/ManageProducts';
import Cart from '../containers/cart';


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
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
