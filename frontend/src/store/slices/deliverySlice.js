import {createSlice} from "@reduxjs/toolkit";

const name = 'delivery';

const deliverySlice = createSlice({
    name,
    initialState: {
        delivery: [],
        error: null,
        loading: false,
    },
    reducers: {
        postDeliveryRequest(state) {
            state.loading = true;
        },
        postDeliverySuccess(state) {
            state.loading = false;
        },
        postDeliveryFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getDeliveryRequest(state) {
            state.loading = true;
        },
        getDeliverySuccess(state, action) {
            state.loading = false;
            state.delivery = action.payload.data;
        },
        getDeliveryFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        putDeliveryRequest(state) {
            state.loading = true;
        },
        putDeliverySuccess(state) {
            state.loading = false;
        },
        putDeliveryFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearDeliveryError(state) {
            state.error = null;
        }
    }
});

export default deliverySlice;