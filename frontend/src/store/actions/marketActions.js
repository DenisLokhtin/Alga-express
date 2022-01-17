import marketSlice from "../slices/marketSlice";

export const {
    fetchMarketRequest,
    fetchMarketSuccess,
    fetchMarketFailure,
    addMarketRequest,
    addMarketSuccess,
    addMarketFailure,

} = marketSlice.actions;