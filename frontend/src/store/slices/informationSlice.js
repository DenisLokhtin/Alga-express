import {createSlice} from "@reduxjs/toolkit";

const name = 'information';

const initialState = {
    information: {},
    allInformation: [],
    loading: false,
    addError: null,
};

const informationSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchInformationRequest(state) {
            state.loading = true;
        },
        fetchInformationSuccess(state, action) {
            state.information = action.payload[0];
            state.loading = false;
        },
        fetchInformationFailure(state) {
            state.loading = false;
        },
        fetchAllInformationRequest(state) {
            state.loading = true;
        },
        fetchAllInformationSuccess(state, action) {
            state.allInformation = action.payload;
            state.loading = false;
        },
        fetchAllInformationFailure(state) {
            state.loading = false;
        },
        clearInformationErrors(state) {
            state.addError = null;
        },
        changeInformationRequest(state) {
            state.loading = true;
        },
        changeInformationSuccess(state) {
            state.loading = false;
        },
        changeInformationFailure(state, {payload: error}) {
            state.loading = false;
            state.addError = error;
        },
    }
});

export default informationSlice;