import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {API, Auth, Storage} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

import {
  changeForgotSchema,
  editProfileSchema,
  forgotSchema,
  loginSchema,
  otpSchema,
  showToast,
  signupSchema,
} from '../../utils/domUtils';
import {setLoading} from '../common';
import {goBack, navigate} from '../../services/Routerservices';
import {resetHomeSlice} from '../home';
import {cartDataManager} from '../cart';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    token: null,
    resendConfimation: false,
    refetch: false,
    mainLoading: true,
  },
  reducers: {
    setRefetch(state, action) {
      state.refetch = action.payload;
    },
    setMainLoading(state, action) {
      state.mainLoading = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setResendConfimation(state, action) {
      state.resendConfimation = action.payload;
    },
    logout(state) {
      state.userData = null;
      state.token = null;
    },
  },
});

export const logoutManager = () => {
  return async (dispatch: any) => {
    try {
      await Auth.signOut();
      dispatch(logout());
      dispatch(resetHomeSlice());
      showToast('User successfully logged out!');
    } catch (error: any) {
      showToast(error.message);
    }
  };
};

export const loginManager = (data: any) => {
  return async (dispatch: any, getState: any) => {
    const refetch = getState().auth.refetch;
    let result = loginSchema(data);
    if (result) {
      dispatch(setLoading(true));
      try {
        const res = await Auth.signIn(
          result.email.toLocaleLowerCase(),
          result.password,
        );
        if (res) {
          showToast('User Successfully logged in');
          dispatch(setRefetch(!refetch));
        }
      } catch (error: any) {
        const {code, message} = error;
        if (code === 'UserNotFoundException') {
          showToast('User does not exist, Please register');
        } else if (code === 'UserNotConfirmedException') {
          dispatch(userConfirmationManager(result.email));
        } else {
          showToast(message);
        }
      } finally {
        dispatch(setLoading(false));
      }
    }
  };
};

export const retrieveCurrentSessionManager = () => {
  return async (dispatch: any) => {
    dispatch(setMainLoading(true));
    try {
      const res = await Auth.currentAuthenticatedUser({bypassCache: true});
      if (res) {
        const user: any = await API.graphql({
          query: queries.getUser,
          variables: {id: res.attributes.sub},
        });
        if (!user.data.getUser) {
          const mainUser = {
            name: res.attributes.name,
            id: res.attributes.sub,
            type: '',
            profile: res.attributes.profile,
            email: res.attributes.email,
          };
          const fetchedUSER: any = await API.graphql({
            query: mutations.createUser,
            variables: {input: mainUser},
          });

          dispatch(setUserData(fetchedUSER.data.createUser));
          dispatch(createCartManager(res.attributes.sub));
        } else {
          const fetchedUSER: any = await API.graphql({
            query: queries.getUser,
            variables: {id: res.attributes.sub},
          });
          dispatch(setUserData(fetchedUSER.data.getUser));
        }
      }
    } catch (error) {
      if (error !== 'The user is not authenticated') {
        //showToast('Something went wrong please try again later!');
      }
    } finally {
      dispatch(setMainLoading(false));
    }
  };
};

export const createCartManager = (id: any) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      await API.graphql({
        query: mutations.createCart,
        variables: {input: {userID: id}},
      });
      dispatch(cartDataManager());
    } catch (error) {
      console.log(error);
      showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const becomeSellerManager = () => {
  return async (dispatch: any, getState: any) => {
    const userData = getState().auth.userData;
    try {
      dispatch(setLoading(true));
      let mainData: any = {
        type: 'seller',
        _version: userData._version,
        id: userData.id,
      };
      const updatedProfile: any = await API.graphql({
        query: mutations.updateUser,
        variables: {input: mainData},
      });
      dispatch(setUserData(updatedProfile.data.updateUser));
      showToast('You can add products now!');
    } catch (error) {
      console.log(error);
      showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateProfileManager = (data: any) => {
  return async (dispatch: any, getState: any) => {
    let profile = '';
    let result = editProfileSchema(data);
    if (result) {
      if (data?.image?.fileName) {
        const image = await dispatch(uploadImage(data.image));
        if (!image.status) {
          dispatch(setLoading(false));
          return 'Image Upload failed!';
        } else {
          profile = image.key;
        }
      }
      const userData = getState().auth.userData;
      try {
        dispatch(setLoading(true));
        let mainData: any = {
          name: result.name,
          _version: userData._version,
          id: userData.id,
          phoneNumber: data.phoneNumber,
        };
        if (profile.length) {
          mainData.profile = profile;
        }
        const updatedProfile: any = await API.graphql({
          query: mutations.updateUser,
          variables: {input: mainData},
        });
        dispatch(setUserData(updatedProfile.data.updateUser));
        goBack();
      } catch (error) {
        console.log(error);
        showToast('Something went wrong please try again later!');
      } finally {
        dispatch(setLoading(false));
      }
    }
  };
};

export const updateProductManager = (data: any) => {
  return async (dispatch: any) => {
    let profile = '';
    if (data?.image?.fileName) {
      const image = await dispatch(uploadImage(data.image));
      if (!image.status) {
        dispatch(setLoading(false));
        return showToast('Image Upload failed!');
      } else {
        profile = image.key;
      }
    }
    try {
      if (profile.length) {
        data.image = profile;
      } else {
        delete data.image;
      }
      await API.graphql({
        query: mutations.updateProduct,
        variables: {input: data},
      });
      showToast('Product has been updated successfully!');
      goBack();
    } catch (error) {
      console.log(error);
      showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateAddressManager = (data: any) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      await API.graphql({
        query: mutations.updateAddress,
        variables: {input: data},
      });
      showToast('Address has been successfully updated!');
      goBack();
    } catch (error) {
      console.log(error);
      showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const verifyOtpManager = (data: any) => {
  return async (dispatch: any) => {
    let result = otpSchema(data);
    if (result) {
      dispatch(setLoading(true));
      try {
        const res = await Auth.confirmSignUp(data.email, data.otp);
        if (res) {
          navigate('Login','Login');
          showToast('Verify successfully, please login!');
        }
      } catch (error: any) {
        showToast(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };
};

export const verifyFrogotOtpManager = (data: any) => {
  return async (dispatch: any) => {
    let result = changeForgotSchema(data);
    if (result) {
      dispatch(setLoading(true));
      try {
        const res = await Auth.forgotPasswordSubmit(
          data.email,
          result.otp,
          result.password,
        );
        if (res) {
          navigate('Login','Login');
          showToast('Password has been changed successfully!');
        }
      } catch (error: any) {
        showToast(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };
};

export const forgotPasswordManager = (data: any) => {
  return async (dispatch: any) => {
    let result = forgotSchema(data);
    if (result) {
      dispatch(setLoading(true));
      try {
        const res = await Auth.forgotPassword(result.email);
        if (res) {
          showToast(`Code has been sent to ${result.email}`);
          navigate('ChangeForgotPassword', {
            data: result.email,
          });
        }
      } catch (error: any) {
        showToast("User does not exist!");
      } finally {
        dispatch(setLoading(false));
      }
    }
  };
};

export const resendConfirmationCodeManager = (data: any) => {
  return async (dispatch: any) => {
    dispatch(setResendConfimation(true));
    try {
      const res = await Auth.resendSignUp(data.email);
      if (res) {
        showToast('Code has been resent successfully!');
      }
    } catch (error: any) {
      showToast(error.message);
    } finally {
      dispatch(setResendConfimation(false));
    }
  };
};

export const resendForgotConfirmationManager = (data: any) => {
  return async (dispatch: any) => {
    dispatch(setResendConfimation(true));
    try {
      const res = await Auth.forgotPassword(data.email);
      if (res) {
        showToast('Code has been resent successfully!');
      }
    } catch (error: any) {
      showToast(error.message);
    } finally {
      dispatch(setResendConfimation(false));
    }
  };
};

export const userConfirmationManager = (email: any) => {
  return async (dispatch: any) => {
    try {
      const res = await Auth.resendSignUp(email);
      if (res) {
        dispatch(setLoading(true));
        showToast('Please verify yourself first');
        navigate('VerifyOtp', {data: email, path: 'login'});
      }
    } catch (error: any) {
      const {message} = error;
      showToast(message);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const uploadImage = (data: any) => {
  return async (dispatch: any) => {
    const photoResponse = await fetch(data.uri);
    const blob = await photoResponse.blob();
    try {
      dispatch(setLoading(true));
      const res = await Storage.put(data.fileName, blob, {
        contentType: data.type,
        completeCallback: event => {
          return event.key;
        },
        progressCallback: progress => {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
        errorCallback: err => {
          console.error('Unexpected error while uploading', err);
        },
      });
      if (res?.key) {
        return {status: true, key: res.key};
      } else {
        return {status: false, key: null};
      }
    } catch (error) {
      return {status: false, key: null};
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const signupManager = (data: any) => {
  return async (dispatch: any) => {
    let profile = '';
    let result = signupSchema(data);
    if (result) {
      dispatch(setLoading(true));
      if (data?.image?.uri) {
        const image = await dispatch(uploadImage(data.image));
        if (!image.status) {
          dispatch(setLoading(false));
          return showToast('Image Upload failed!');
        } else {
          profile = image.key;
        }
      }
      try {
        const res: any = await Auth.signUp({
          username: result.email.toLocaleLowerCase(),
          password: result.password,
          attributes: {
            email: result.email.toLocaleLowerCase(),
            name: result.name,
            profile: profile,
          },
        });
        if (res) {
          navigate('VerifyOtp', {data: result.email, path: 'signup'});
        }
      } catch (error: any) {
        const {code, message} = error;
        if (code === 'InvalidPasswordException') {
          showToast('Password must of be atleast 8 characters');
        } else if (code === 'UsernameExistsException') {
          showToast('User already exists');
        } else {
          showToast(message);
        }
      } finally {
        dispatch(setLoading(false));
      }
    }
  };
};

export const {
  setUserData,
  setMainLoading,
  setToken,
  logout,
  setResendConfimation,
  setRefetch,
} = authSlice.actions;

export default authSlice.reducer;
