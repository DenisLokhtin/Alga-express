import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    payment: null,
    fetchLoading: false,
    errorPayment: null,
    status: false
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
       paymentAcceptedRequest(state){
           state.fetchLoading =true;
       },
       paymentAcceptedSuccess(state, action){
           state.fetchLoading = true;
           state.status = !state.status
       },
       paymentAcceptedFailure(state,action){
           state.fetchLoading = true;
           state.errorPayment = action.payload;
       },
   }
});

export default paymentSlice;