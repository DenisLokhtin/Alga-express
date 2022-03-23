import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    totalPage: 0,
    order: null,
    package: null,
    getUserPackageByIdLoading: null,
    editUserPackageLoading: null,
    createPackageLoading: false,
    createPackageError: null,
    getOrdersLoading: false,
    getOrderError: null,
    getOrderByIdLoading: false,
    getOrderByIdError: null,
    changePackageError: null,
    packageAdmin: null,
    editAdminLoading: false,
    editAdminError: null,
    packageAdminLoading: false,
    notFoundTrackNumbers: [],
    changeStatusesLoading: false,
    changeStatusesError: null,
    changeDeliveryStatusLoading: false,
    changeDeliveryStatusFailure: null,
};

const packageSlice = createSlice({
    name: 'package',
    initialState,

    reducers: {
        fetchNewPackages(state) {
            state.getOrdersLoading = true;
        },
        fetchNewPackagesSuccess(state, action) {
            state.getOrdersLoading = false;
            state.getOrderError = null;
            state.orders = action.payload;
        },
        fetchNewPackagesFailure(state, action) {
            state.getOrdersLoading = false;
            state.getOrderError = action.payload;
        },
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

        getOrdersHistorySuccess(state, {payload}) {
            state.getOrdersLoading = false;
            state.totalPage = payload.totalPage;
            state.orders = payload.packages;
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
            state.getUserPackageByIdLoading = true;
        },

        getPackageByIdSuccess(state, {payload: packageData}) {
            state.getUserPackageByIdLoading = false;
            state.package = packageData;
        },

        getPackageByIdFailure(state, {payload: getPackageError}) {
            state.createPackageError = getPackageError;
            state.getUserPackageByIdLoading = false;
        },

        changePackageRequest(state) {
            state.editUserPackageLoading = true;
        },

        changePackageSuccess(state) {
            state.editUserPackageLoading = false;
        },

        changePackageFailure(state, {payload: packageChangeError}) {
            state.editUserPackageLoading = false;
            state.changePackageError = packageChangeError;
        },

        clearTextFieldsErrors(state) {
            state.createPackageError = null;
            state.changeStatusesError = null;
        },

        editAdminPackageRequest(state) {
            state.editAdminLoading = true;
        },

        editAdminPackageSuccess(state) {
            state.editAdminLoading = false;
        },

        editAdminPackageFailure(state, {payload: editAdminError}) {
            state.editAdminLoading = false;
            state.editAdminError = editAdminError;
        },

        fetchPackageAdminRequest(state) {
            state.packageAdminLoading = true;
        },

        fetchPackageAdminSuccess(state, {payload: packageAdmin}) {
            state.packageAdminLoading = false;
            state.packageAdmin = packageAdmin;
        },

        fetchPackageAdminFailure(state) {
            state.packageAdminLoading = false;
        },

        changeStatusesRequest(state) {
            state.changeStatusesLoading = true;
        },

        changeStatusesSuccess(state) {
            state.changeStatusesLoading = false;
        },

        changeStatusesError(state, {payload: error}) {
            state.changeStatusesError = error;
            state.changeStatusesLoading = false;
            state.notFoundTrackNumbers = error;
        },

        changeDeliveryStatusRequest(state) {
            state.changeStatusesLoading = true;
        },

        changeDeliveryStatusSuccess(state) {
            state.changeStatusesLoading = false;
        },

        changeDeliveryStatusError(state, {payload: error}) {
            state.changeStatusesError = error;
            state.changeStatusesLoading = false;
            state.notFoundTrackNumbers = error;
        },
        clearAdminErrors(state) {
            state.editAdminError = false;
        },
        clearPackage(state) {
            state.package = null;
        },

        giveOutRequest(state) {
            state.changeStatusesLoading = true;
        },
        giveOutSuccess(state) {
            state.changeStatusesLoading = false;
        },
        giveOutFailure(state, action) {
            state.changeStatusesError = action.payload;
            state.changeStatusesLoading = false;
        },
    },
});

export default packageSlice;