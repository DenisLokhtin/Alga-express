import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
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
} from '../actions/deliveryAction';

function* postDelivery({payload: data}) {
    try {
        yield axiosApi.post('/delivery', data);
        yield put(postDeliverySuccess());
        toast.success('Заказ на доставку добавлен!');
    } catch (e) {
        yield put(postDeliveryFailure(e.response.data));
    }
}

function* getDelivery() {
    try {
        const response = yield axiosApi.get(`/delivery`);
        yield put(getDeliverySuccess(response.data));
    } catch (e) {
        yield put(getDeliveryFailure(e.response.data));
    }
}

function* putDelivery({payload}) {
    try {
        yield axiosApi.put(`/delivery`, payload);
        yield put(putDeliverySuccess());
        toast.success('Заказ на доcтавку завершён!');
    } catch (e) {
        yield put(putDeliveryFailure(e.response.data.message));
        toast.error(e.response.data.message);
    }
}

function* deleteDelivery({payload}) {
    try {
        yield axiosApi.delete(`/delivery/${payload.trackNumber}`);
        yield put(deleteDeliverySuccess());
        toast.success('Заказ на доcтавку Удалён!');
    } catch (e) {
        yield put(deleteDeliveryFailure(e.response.data.message));
        toast.error(e.response.data.message);
    }
}

const deliverySagas = [
    takeEvery(postDeliveryRequest, postDelivery),
    takeEvery(getDeliveryRequest, getDelivery),
    takeEvery(putDeliveryRequest, putDelivery),
    takeEvery(deleteDeliveryRequest, deleteDelivery),
];

export default deliverySagas;