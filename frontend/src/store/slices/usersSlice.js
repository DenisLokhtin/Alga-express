import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginError: null,
  loginLoading: false,
};

const name = 'users';

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    registerUser(state, action) {
      state.registerLoading = true;
    },
    registerUserSuccess(state, {payload: userData}) {
      state.user = userData;
      state.registerLoading = false;
      state.registerError = null;
    },
    registerUserFailure(state, action) {
      state.registerLoading = false;
      state.registerError = action.payload;
    },
  }
});

export default usersSlice;