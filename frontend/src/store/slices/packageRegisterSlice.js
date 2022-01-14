import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    createPackageLoading: false,
    createPackageError: false,
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

        clearTextFieldsErrors(state) {
            state.createPackageError = null;
        },
    },
});

export default packageSlice;