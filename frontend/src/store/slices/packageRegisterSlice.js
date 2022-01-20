import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    onePackage: {},
    createPackageLoading: false,
    createPackageError: false,
    changePackageError: false,
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
    },
});

export default packageSlice;