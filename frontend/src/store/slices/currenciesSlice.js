import {createSlice} from "@reduxjs/toolkit";

const name = "currencies";

const currenciesSlice = createSlice({
    name,
    initialState: {
        currencies: null,
        loading: false,
        error: null
    },
    reducers: {
        fetchCurrencies(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCurrenciesSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.currencies = action.payload;
        },
        fetchCurrenciesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateCurrencies(state) {
            state.loading = true;
            state.error = null;
        },
        updateCurrenciesSuccess(state) {
            state.loading = false;
            state.error = null;
        },
        updateCurrenciesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default currenciesSlice;