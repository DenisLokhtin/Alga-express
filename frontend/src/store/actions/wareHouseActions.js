import wareHouseSlice from "../slices/wareHouseSlice";

export const {
    fetchWareHouseRequest,
    fetchWareHouseSuccess,
    fetchWareHouseFailure,
    addWareHouseRequest,
    addWareHouseSuccess,
    addWareHouseFailure,
    fetchOneWareHouseRequest,
    fetchOneWareHouseSuccess,
    fetchOneWareHouseFailure,
    changeWareHouseRequest,
    changeWareHouseSuccess,
    changeWareHouseFailure,
    deleteWareHouseRequest,
    deleteWareHouseSuccess,
    deleteWareHouseFailure,
    clearWareHouseErrors,
} = wareHouseSlice.actions;