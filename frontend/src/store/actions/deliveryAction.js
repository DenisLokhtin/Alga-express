import deliverySlice from "../slices/deliverySlice";

export const {
    putDeliveryRequest,
    putDeliverySuccess,
    putDeliveryFailure,
    postDeliveryRequest,
    postDeliverySuccess,
    postDeliveryFailure,
    clearDeliveryError
} = deliverySlice.actions;