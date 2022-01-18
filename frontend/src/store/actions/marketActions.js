import marketSlice from "../slices/marketSlice";

export const {
    fetchMarketRequest,
    fetchMarketSuccess,
    fetchMarketFailure,
    addMarketRequest,
    addMarketSuccess,
    addMarketFailure,
    deleteMarketRequest,
    deleteMarketSuccess,
    deleteMarketFailure,

} = marketSlice.actions;