import {createSlice} from "@reduxjs/toolkit";

const name = 'tariffs'

const tariffSlice = createSlice({
    name,
    initialState: {
        tariffs: null,
        fetchLoading: false,
    },
    reducers: {
        fetchTariffsRequest(state) {
            state.fetchLoading = true;
        },
        fetchTariffsSuccess(state, {payload: tariffs}) {
            state.tariffs = tariffs;
            state.fetchLoading = false;
        },
        fetchTariffsFailure(state) {
            state.fetchLoading = false;
        },
        changeTariffRequest(state) {
            state.fetchLoading = true;

        },
        changeTariffSuccess(state, {payload: tariffs}) {
            state.fetchLoading = false;
            state.tariffs = tariffs;
        },
        changeTariffFailure(state) {
            state.fetchLoading = false;

        },
    }
});

export default tariffSlice;