import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    payment: null,
    fetchLoading: false,
    errorPayment: null,
    status: false,
    tariff: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        fetchPaymentRequest(state) {
            state.fetchLoading = true;
        },
        fetchPaymentSuccess(state, action) {
            state.fetchLoading = false;
            state.payment = action.payload;
        },
        fetchPaymentFailure(state, action) {
            state.fetchLoading = false;
            state.errorPayment = action.payload;
        },
        paymentAcceptedRequest(state) {
            state.fetchLoading = true;
        },
        paymentAcceptedSuccess(state, action) {
            state.fetchLoading = true;
            state.status = !state.status
        },
        paymentAcceptedFailure(state, action) {
            state.fetchLoading = true;
            state.errorPayment = action.payload;
        },
        addPaymentAdminRequest(state) {
            state.fetchLoading = true;
        },
        addPaymentAdminSuccess(state, action) {
            state.fetchLoading = false;
        },
        addPaymentAdminFailure(state, action) {
            state.fetchLoading = false;
        },
        fetchTariffGroupRequest(state, action) {
            state.fetchLoading = true
        },
        fetchTariffGroupSuccess(state, action) {
            state.fetchLoading = false
            state.tariff = action.payload;
        },
        fetchTariffGroupFailure(state, action) {
            state.fetchLoading = false
        },
    }
});

export default paymentSlice;