import {createSlice} from "@reduxjs/toolkit";

const name = "currencies";

const currenciesSlice = createSlice({
    name,
    initialState: {
        currencies: [],
        loading: false,
        error: null
    },
    reducers: {
        fetchCurrencies(state, action) {
            state.loading = true;
            state.error = null;
            state.currencies = [];
        },
        fetchCurrenciesSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.currencies = action.payload;
        },
        fetchCurrenciesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.currencies = [];
        },
        updateCurrencies(state, action) {
            state.loading = true;
            state.error = null;
        },
        updateCurrenciesSuccess(state, action) {
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