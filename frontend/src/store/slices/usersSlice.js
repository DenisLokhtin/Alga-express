import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    user: null,
    users: [],
    registerLoading: false,
    registerError: null,
    loginError: null,
    loginLoading: false,
    loadUserDate: false,
    userDate: null,
    userError: null,
    payment: null,
    total: 0,
    resetError:null,
    resetLoading: false,
    forgotError:null,
    forgotLoading: false,
    notification: false,
};

const name = 'users';

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {
        registerUser(state) {
            state.registerLoading = true;
        },
        registerUserSuccess(state, {payload: userData}) {
            state.user = userData === undefined ? state.user : userData;
            state.registerLoading = false;
            state.registerError = null;
        },
        registerUserFailure(state, action) {
            state.registerLoading = false;
            state.registerError = action.payload;
        },
        loginUser(state) {
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
        clearError(state) {
            state.loginError = null;
            state.registerError = null;
            state.error = null;
            state.userError = null;
        },
        userDateRequest(state) {
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
        editUserDataRequest(state) {
            state.loadUserDate = true;
        },
        editUserDataSuccess(state, action) {
            state.loadUserDate = false;
            state.user.name = action.payload.name;
        },
        editUserDataFailure(state, action) {
            state.loadUserDate = false;
            state.userError = action.payload;
        },
        editPassportRequest(state) {
            state.loadUserDate = true;
        },
        editPassportSuccess(state, action) {
            state.userDate = action.payload;
            state.loadUserDate = false;
        },
        editPassportFailure(state) {
            state.loadUserDate = false;

        },
        fetchUserPaymentRequest(state) {
            state.loadUserDate = true;
        },
        fetchUserPaymentSuccess(state, action) {
            state.loadUserDate = false;
            state.payment = action.payload;
        },
        fetchUserPaymentFailure(state, action) {
            state.loadUserDate = false;
            state.payment = action.payload;
        },
        addUserPaymentRequest(state) {
            state.loadUserDate = true;
        },
        addUserPaymentSuccess(state, action) {
            state.loadUserDate = false;
            state.payment = action.payload;
        },
        addUserPaymentFailure(state) {
            state.loadUserDate = false;
        },
        fetchUsersRequest(state) {
            state.loadUserDate = true;
        },
        fetchUsersSuccess(state, action) {
            state.loadUserDate = false;
            state.users = action.payload;
        },
        fetchUsersFailure(state, action) {
            state.loadUserDate = false;
            state.userError = action.payload;
        },
        totalSend(state, action) {
            state.total = action.payload;
        },
        resetPasswordRequest(state){
            state.resetLoading = true;
        },
        resetPasswordSuccess(state){
            state.resetLoading = false;
            state.resetError = null;
        },
        resetPasswordFailure(state,action){
            state.resetLoading = false;
            state.resetError = action.payload;
        },
        changePasswordRequest(state){
            state.resetLoading = true;
        },
        changePasswordSuccess(state){
            state.resetLoading = false;
            state.resetError = null;
        },
        changePasswordFailure(state,action){
            state.resetLoading = false;
            state.resetError = action.payload;
        },
        forgotPasswordRequest(state){
            state.forgotLoading = true;
        },
        forgotPasswordSuccess(state){
            state.forgotLoading = false;
            state.forgotError = null;
        },
        forgotPasswordFailure(state,action){
            state.forgotLoading = false;
            state.forgotError = action.payload;
        },
        switchNotificationRequest(state) {
        },
        switchNotificationSuccess(state, action) {
            console.log(action.payload);
            state.notification = action.payload.notification;
        },
        switchNotificationFailure(state, action) {

        },
        changeNotificationRequest(state) {

        },
        changeNotificationSuccess(state, action) {
            console.log(action.payload);
            state.notification = action.payload;

        },
        changeNotificationFailure(state, action) {

        },

        logout(state) {
            state.user = null;
        },
    },
});

export default usersSlice;