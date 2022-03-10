import deliverySlice from "../slices/deliverySlice";

export const {
    getDeliveryRequest,
    getDeliverySuccess,
    getDeliveryFailure,
    putDeliveryRequest,
    putDeliverySuccess,
    putDeliveryFailure,
    postDeliveryRequest,
    postDeliverySuccess,
    postDeliveryFailure,
    deleteDeliveryRequest,
    deleteDeliverySuccess,
    deleteDeliveryFailure,
} = deliverySlice.actions;