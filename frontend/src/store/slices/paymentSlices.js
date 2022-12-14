import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    payment: {
        totalElements: 0,
        data: [],
    },
    fetchLoading: false,
    errorPayment: null,
    status: false,
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
            state.payment.totalElements = action.payload.totalElements;
            state.payment.data = action.payload.data;
            state.errorPayment = null;
        },
        fetchPaymentFailure(state, action) {
            state.fetchLoading = false;
            state.errorPayment = action.payload;
        },
        paymentAcceptedRequest(state) {
            state.fetchLoading = true;
        },
        paymentAcceptedSuccess(state) {
            state.fetchLoading = false;
            state.status = !state.status;
        },
        paymentAcceptedFailure(state, action) {
            state.fetchLoading = false;
            state.errorPayment = action.payload;
        },
        addPaymentAdminRequest(state) {
            state.fetchLoading = true;
        },
        addPaymentAdminSuccess(state) {
            state.fetchLoading = false;
        },
        addPaymentAdminFailure(state) {
            state.fetchLoading = false;
        },
    }
});

export default paymentSlice;