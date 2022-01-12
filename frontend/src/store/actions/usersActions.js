import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import usersSlice from "../slices/usersSlice";


export const {
  registerUser,
  registerUserSuccess,
  registerUserFailure,
} = usersSlice.actions;

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const CLEAR_ERROR_USER = 'CLEAR_ERROR_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, payload: user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, payload: error});

export const clearErrorUser = () => ({type: CLEAR_ERROR_USER});

export const loginUser = (userData) => {
  return async dispatch => {
    try {
      dispatch(loginUserRequest());
      const response = await axiosApi.post('/users/sessions', userData);
      dispatch(loginUserSuccess(response.data.user));
      toast.success('Login successful');
    } catch (error) {
      toast.error(error.response.data.global);
      dispatch(loginUserFailure(error.response.data));
    }
  };
};

export const googleLogin = googleData => {
  return async dispatch => {
    try {
      const response = await axiosApi.post('/users/googleLogin', {
        tokenId: googleData.tokenId,
        googleId: googleData.googleId,
      });
      dispatch(loginUserSuccess(response.data.user));
      toast.success('Login successful');
    } catch (error) {
      toast.error(error.response.data.global);
      dispatch(loginUserFailure(error.response.data));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    await axiosApi.delete('/users/sessions');
    dispatch({type: LOGOUT_USER});
  };
};