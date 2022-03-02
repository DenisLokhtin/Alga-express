import carouselSlice from "../slices/carouselSlice";

export const {
    fetchCarouselsRequest,
    fetchCarouselsSuccess,
    fetchCarouselsFailure,
    addCarouselsRequest,
    addCarouselsSuccess,
    addCarouselsFailure,
    fetchOneCarouselsRequest,
    fetchOneCarouselsSuccess,
    fetchOneCarouselsFailure,
    changeCarouselsRequest,
    changeCarouselsSuccess,
    changeCarouselsFailure,
    deleteCarouselsRequest,
    deleteCarouselsSuccess,
    deleteCarouselsFailure,
    clearCarouselsErrors,
} = carouselSlice.actions;