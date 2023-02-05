import {createSlice} from '@reduxjs/toolkit';
import {API, Auth, Storage} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

import {
  otpSchema,
  showToast,
  signupSchema,
} from '../../utils/domUtils';
import {setLoading} from '../common';
import {goBack, navigate} from '../../services/Routerservices';

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
      (state.userData = null), (state.token = null);
    },
  },
});

export const logoutManager = () => {
  return async (dispatch: any) => {
    dispatch(logout());
  };
};



export const retrieveCurrentSessionManager = () => {
  return async (dispatch: any) => {
    dispatch(setMainLoading(true));
    try {
      const res = await Auth.currentAuthenticatedUser({bypassCache: true});
      dispatch(setUserData(res));
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
          await API.graphql({
            query: mutations.createUser,
            variables: {input: mainUser},
          });
        }
      }
    } catch (error) {
      console.log(error);
      //showToast('Something went wrong please try again later!');
    } finally {
      dispatch(setMainLoading(false));
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
          navigate('Login');
          showToast('Verify successfull, please login to continue!');
        }
      } catch (error: any) {
        showToast(error.message);
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
        showToast('code resent successfully');
      }
    } catch (error: any) {
      showToast(error.message);
    } finally {
      dispatch(setResendConfimation(false));
    }
  };
};


export const uploadImage = (data: any) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    const photoResponse = await fetch(data.uri);
    const blob = await photoResponse.blob();
    try {
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
            phone_number: `+1${result.phone}`,
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
