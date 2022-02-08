import buyoutSlice from "../slices/buyoutSlice";

export const {
fetchBuyoutsRequest,
    fetchBuyoutsSuccess,
    fetchBuyoutsFailure,
    addBuyoutRequest,
    addBuyoutSuccess,
    addBuyoutFailure,
    deleteBuyoutRequest,
    deleteBuyoutSuccess,
    deleteBuyoutFailure,
    fetchSingleBuyoutRequest,
    fetchSingleBuyoutSuccess,
    fetchSingleBuyoutFailure,
    clearBuyoutsError,
    editBuyoutRequest,
    editBuyoutSuccess,
    editBuyoutFailure,
} = buyoutSlice.actions;