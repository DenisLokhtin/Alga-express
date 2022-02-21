import currenciesSlice from "../slices/currenciesSlice";

export const {
    fetchCurrencies,
    fetchCurrenciesSuccess,
    fetchCurrenciesFailure,
    updateCurrencies,
    updateCurrenciesSuccess,
    updateCurrenciesFailure
} = currenciesSlice.actions;