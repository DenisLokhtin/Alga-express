import marketSlice from "../slices/marketSlice";

export const {
    fetchMarketRequest,
    fetchMarketSuccess,
    fetchMarketFailure,
} = marketSlice.actions;