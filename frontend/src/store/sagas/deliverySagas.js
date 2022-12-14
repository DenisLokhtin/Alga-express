import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    putDeliveryRequest,
    putDeliverySuccess,
    putDeliveryFailure,
    postDeliveryRequest,
    postDeliverySuccess,
    postDeliveryFailure,
} from '../actions/deliveryAction';

function* postDelivery({payload}) {
    try {
        const {data} = yield axiosApi.post(`/delivery?package=${payload.package}`, payload.address);
        yield put(postDeliverySuccess());
        toast.success(data.message);
        payload.onClose();
    } catch (e) {
        yield put(postDeliveryFailure(e));
        toast.error(e.response.data.errors.address.message);
    }
}

function* putDelivery({payload}) {
    try {
        const {data} = yield axiosApi.put(`/delivery/${payload.id}`, payload.address);
        yield put(putDeliverySuccess());
        toast.success(data.message);
    } catch (e) {
        yield put(putDeliveryFailure(e));
        toast.error(e.response.data.errors.address.message);
    }
}

const deliverySagas = [
    takeEvery(postDeliveryRequest, postDelivery),
    takeEvery(putDeliveryRequest, putDelivery),
];

export default deliverySagas;