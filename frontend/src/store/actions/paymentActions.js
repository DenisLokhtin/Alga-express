import paymentSlice from "../slices/paymentSlices";

export const {
    fetchPaymentRequest,
    fetchPaymentSuccess,
    fetchPaymentFailure,
    paymentAcceptedRequest,
    paymentAcceptedSuccess,
    paymentAcceptedFailure,
    addPaymentAdminRequest,
    addPaymentAdminSuccess,
    addPaymentAdminFailure,
    fetchTariffGroupRequest,
    fetchTariffGroupSuccess,
    fetchTariffGroupFailure,

} = paymentSlice.actions;