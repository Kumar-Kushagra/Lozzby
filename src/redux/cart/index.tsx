import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {API, DataStore, graphqlOperation} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import {setLoading} from '../common';
import {getCart, getOrderDetail} from '../../queries';
import {goBack, navigate} from '../../services/Routerservices';
import {createCartManager} from '../auth';
import { showToast } from '../../utils/domUtils';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartData: null,
    cartProducts: null,
    cartLoading: false,
    orderData: null,
  },
  reducers: {
    setOrderData(state, action) {
      state.orderData = action.payload;
    },
    setCartLoading(state, action) {
      state.cartLoading = action.payload;
    },
    setCartData(state, action) {
      state.cartData = action.payload;
    },

    setCartProducts(state, action) {
      state.cartProducts = action.payload;
    },
  },
});

export const cartDataManager = () => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      dispatch(setCartLoading(true));
      const data: any = await API.graphql(
        graphqlOperation(getCart, {
          id: userData.id,
        }),
      );
      let cart = data.data.listCarts.items.filter(
        (item: any) => !item._deleted,
      );
      let products = cart[0]?.CartItems.items.filter(
        (item: any) => !item._deleted && !item?.Product?._deleted,
      );
      if (cart?.length) {
        dispatch(setCartData(cart[0]));
        dispatch(setCartProducts(products));
      }
    } catch (error) {
      console.log(error);
      dispatch(setCartLoading(false));
      //showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setCartLoading(false));
    }
  };
};

export const orderDetailManager = (orderId: any) => {
  return async (dispatch: any) => {
    dispatch(setOrderData(null));
    dispatch(setCartLoading(true));
    try {
      const data: any = await API.graphql(
        graphqlOperation(getOrderDetail, {
          id: orderId,
        }),
      );
      dispatch(setOrderData(data.data.listOrders.items));
    } catch (error) {
      console.log(error);
      showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setCartLoading(false));
    }
  };
};

export const deleteCartManager = (data: any) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      await API.graphql({
        query: mutations.deleteCartItem,
        variables: {input: data},
      });
      dispatch(cartDataManager());
      showToast('Item has been removed');
    } catch (error) {
      showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const createOrderManager = (addressID: any, total: any) => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    const cartProducts = getState().cart.cartProducts;
    const cartData = getState().cart.cartData;
    let data = {
      sellerID: cartProducts[0]?.Product?.userID,
      status: 'PENDING',
      total: total,
      userID: userData.id,
      orderAddressId: addressID,
    };
    dispatch(setLoading(true));
    try {
      const orderData: any = await API.graphql({
        query: mutations.createOrder,
        variables: {input: data},
      });
 
      if (orderData.data.createOrder.id) {
        for (let i = 0; i < cartProducts.length; i++) {
          let orderItemData = {
            orderItemProductId: cartProducts[i].Product.id,
            orderID: orderData.data.createOrder.id,
            quantity: cartProducts[i].quantity,
            productPrice: cartProducts[i].Product.price,
            productName: cartProducts[i].Product.name,
          };
          API.graphql({
            query: mutations.createOrderItem,
            variables: {
              input: orderItemData,
            },
          });
        }
        await API.graphql({
          query: mutations.deleteCart,
          variables: {
            input: {
              _version: cartData._version,
              id: cartData.id,
            },
          },
        });
        dispatch(createCartManager(userData.id));
        navigate('Home', {});
      }
      showToast('Order has successfully been placed!');
    } catch (error: any) {
      showToast(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateCartItemManager = (data: any) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      await API.graphql({
        query: mutations.updateCartItem,
        variables: {input: data},
      });
      dispatch(cartDataManager());
      goBack();
      showToast('Product has been added to cart');
    } catch (error) {
      console.log(error);
      showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateOrderManager = (data: any) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      await API.graphql({
        query: mutations.updateOrder,
        variables: {input: data},
      });
      dispatch(cartDataManager());
      showToast('Order has been successfully updated!');
    } catch (error) {
      console.log(error);
      showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const createCartItemManager = (data: any) => {
  return async (dispatch: any, getState: any) => {
    const cartData = getState().cart.cartData;
    const cartProducts = getState().cart.cartProducts;
    let mainIndex = cartProducts.findIndex(
      (item: any) => item.Product.userID === data.userID,
    );
    if (cartProducts.length === 0) {
      mainIndex = 0;
    }
    if (mainIndex === 0) {
      delete data.userID;
      data.cartID = cartData.id;
      if (cartProducts) {
        const findIndex = cartProducts.findIndex(
          (item: any) => item.cartItemProductId === data.cartItemProductId,
        );
        if (findIndex === -1) {
          dispatch(setLoading(true));
          try {
            await API.graphql({
              query: mutations.createCartItem,
              variables: {input: data},
            });
            // dispatch(cartDataManager());
            goBack();
            navigate('Cart', {});
            showToast('Product has been added to cart');
          } catch (error) {
            console.log(error);
            showToast('Something went wrong please try again later!');
          } finally {
            dispatch(setLoading(false));
          }
        } else {
          let mainData = {
            cartItemProductId: cartProducts[findIndex].cartItemProductId,
            id: cartProducts[findIndex].id,
            _version: cartProducts[findIndex]._version,
            quantity: cartProducts[findIndex].quantity + data.quantity,
          };
          dispatch(updateCartItemManager(mainData));
        }
      }
    } else {
      showToast('This product is from other seller');
    }
  };
};

export const {setCartData, setCartProducts, setCartLoading, setOrderData} =
  cartSlice.actions;

export default cartSlice.reducer;
