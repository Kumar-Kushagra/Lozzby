import {createSlice} from '@reduxjs/toolkit';
import {API, DataStore} from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import {createProductSchema, showToast} from '../../utils/domUtils';
import {setLoading} from '../common';
import {uploadImage} from '../auth';
import {goBack} from '../../services/Routerservices';
import {Product} from '../../models';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    products: null,
    productDetail: null,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setProductDetail(state, action) {
      state.productDetail = action.payload;
    },
    resetHomeSlice(state) {
      state.products = null;
    },
  },
});

export const createProductManager = (data: any) => {
  return async (dispatch: any, getState: any) => {
    let profile = '';
    let result = createProductSchema(data);
    if (result) {
      if (data?.image?.fileName) {
        const image = await dispatch(uploadImage(data.image));
        if (!image.status) {
          dispatch(setLoading(false));
          return showToast('Image Upload failed!');
        } else {
          profile = image.key;
        }
      }
      const userData = getState().auth.userData;
      try {
        let mainData: any = {
          ...data,
          userID: userData.id,
        };
        if (profile.length) {
          mainData.image = profile;
        }
        const mainResult: any = await API.graphql({
          query: mutations.createProduct,
          variables: {input: mainData},
        });
        goBack();
        showToast('Product has been added successfuly!');
      } catch (error) {
        console.log(error);
        showToast('Something went wrong please try again later!');
      } finally {
        dispatch(setLoading(false));
      }
    }
  };
};

export const createAddressManager = (data: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(setLoading(true));
    const userData = getState().auth.userData;
    data.userID = userData.id;
    try {
      const mainResult: any = await API.graphql({
        query: mutations.createAddress,
        variables: {input: data},
      });
      goBack();
      showToast('Address has been added successfuly!');
    } catch (error) {
      console.log(error);
      showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};
export const deleteAddressManager = (id: any, version: any) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      await API.graphql({
        query: mutations.deleteAddress,
        variables: {input: {id, _version: version}},
      });
       showToast('Address has been successfully deleted!');
    } catch (error) {
      console.log(error);
      showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const productDetailManager = (productId: any) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      const productDetail = await DataStore.query(Product, c =>
        c.id.eq(productId),
      );
      if (productDetail) {
        dispatch(setProductDetail(productDetail[0]));
      }
    } catch (error) {
      showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const deleteProductManager = (id: any, version: any) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      await API.graphql({
        query: mutations.deleteProduct,
        variables: {input: {id, _version: version}},
      });
      showToast('Product has been deleted');
    } catch (error) {
      console.log(error);
      showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const {setProducts, resetHomeSlice, setProductDetail} =
  homeSlice.actions;

export default homeSlice.reducer;
