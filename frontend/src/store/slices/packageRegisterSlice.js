import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    onePackage: {},
    createPackageLoading: false,
    createPackageError: false,
    changePackageError: false,
    packageAdmin:{},
    editAdminLoading: false,
    editAdminError: null,
    packageAdminLoading: false,

};

const packageSlice = createSlice({
    name: 'packageRegister',
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

        editAdminPackageRequest(state){
            state.editAdminLoading = true;
        },

        editAdminPackageSuccess(state){
            state.editAdminLoading = false;
        },

        editAdminPackageFailure(state,{payload: editAdminError}){
            state.editAdminLoading = false;
            state.editAdminError = editAdminError;
        },

        fetchPackageAdminRequest(state){
            state.packageAdminLoading = true;
        },

        fetchPackageAdminSuccess(state,{payload: packageAdmin}){
            state.packageAdminLoading = false;
            state.packageAdmin = packageAdmin;
        },

        fetchPackageAdminFailure(state){
            state.packageAdminLoading = false;
        },

        clearAdminErrors(state) {
            state.editAdminError = null;
        },

    },
});

export default packageSlice;