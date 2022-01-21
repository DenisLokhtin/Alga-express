import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    order: null,
    onePackage: {},
    createPackageLoading: false,
    createPackageError: false,
    getOrdersLoading: false,
    getOrderError: null,
    getOrderByIdLoading: false,
    getOrderByIdError: null,
    changePackageError: false,
};

const packageSlice = createSlice({
    name: 'package',
    initialState,

    reducers: {
        createPackageRequest(state) {
            state.createPackageRequest = true;
        },

        createPackageSuccess(state) {
            state.createPackageRequest = false;
        },

        createPackageFailure(state, {payload: packageRegisterError}) {
            state.createPackageRequest = false;
            state.createPackageError = packageRegisterError;
        },

        getOrdersHistoryRequest(state) {
            state.getOrdersLoading = true;
        },

        getOrdersHistorySuccess(state, {payload: orders}) {
            state.getOrdersLoading = false;
            state.orders = orders;
        },

        getOrdersHistoryError(state, {payload: orderHistoryError}) {
            state.getOrdersLoading = false;
            state.getOrdersError = orderHistoryError;
        },

        getOrderByIdRequest(state) {
            state.getOrderByIdLoading = true;
        },

        getOrderByIdSuccess(state, {payload: order}) {
            state.order = order;
            state.getOrderByIdLoading = false;
        },

        getOrderByIdError(state, {payload: getOrderByIdError}) {
            state.getOrderByIdError = getOrderByIdError;
            state.getOrderByIdLoading = false;
        },

        getPackageByIdRequest(state) {
            state.createPackageLoading = true;
        },

        getPackageByIdSuccess(state, {payload: packageData}) {
            state.createPackageLoading = false;
            state.onePackage = packageData;
        },

        getPackageByIdFailure(state, {payload: getPackageError}) {
            state.createPackageError = getPackageError;
            state.createPackageLoading = false;
        },

        changePackageRequest(state) {
            state.createPackageLoading = true;
        },

        changePackageSuccess(state) {
            state.createPackageRequest = false;
        },

        changePackageFailure(state, {payload: packageChangeError}) {
            state.createPackageRequest = false;
            state.changePackageError = packageChangeError;
        },

        clearTextFieldsErrors(state) {
            state.createPackageError = null;
        },
    },
});

export default packageSlice;