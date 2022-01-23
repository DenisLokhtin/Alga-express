import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginError: null,
    loginLoading: false,
    loadUserDate: false,
    userDate: null,
    userError: null,
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
        loginUser(state, action) {
            state.loginLoading = true;
        },
        loginUserSuccess(state, action) {
            state.loginLoading = false;
            state.user = action.payload;
            state.loginError = null;
        },
        loginUserFailure(state, action) {
            state.loginError = action.payload;
            state.loginLoading = false;
        },
        clearError(state, action) {
            state.loginError = null;
            state.registerError = null;
            state.error = null;
            state.userError = null;
        },
        userDateResponse(state, action) {
            state.loadUserDate = true;
        },
        userDateSuccess(state, action) {
            state.loadUserDate = false;
            state.userDate = action.payload;

        },
        userDateFailure(state, action) {
            state.loadUserDate = false;
            state.userError = action.payload;
        },
        editUserDataRequest(state, action) {
            state.loadUserDate = true;
        },
        editUserDataSuccess(state, action) {
            state.loadUserDate = false;
            state.user.name = action.payload.name;
        },
        editUserDataFailure(state, action) {
            state.loadUserDate = false;
        },

        logout(state, action) {
            state.user = null;
        },
    },
});

export default usersSlice;