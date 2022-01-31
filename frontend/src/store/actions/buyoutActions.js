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

} = buyoutSlice.actions;