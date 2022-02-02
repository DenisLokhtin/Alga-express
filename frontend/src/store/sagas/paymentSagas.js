import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {
    fetchPaymentFailure,
    fetchPaymentRequest,
    fetchPaymentSuccess,
    paymentAcceptedRequest, paymentAcceptedSuccess
} from "../actions/paymentActions";
import {toast} from "react-toastify";

export function* fetchPaymentAdmin ({payload}){
    const page = payload.page;
    const limit = payload.limit;
    try {
        const response = yield axiosApi.get(`/cargo?page=${page}&limit=${limit}`);
        yield put (fetchPaymentSuccess(response.data));
    } catch (e) {
        console.log(e.response.data);
        toast.error(e.response.data.error);
        yield put (fetchPaymentFailure(e.response.data.error));
    }
}

export function* paymentAccepted ({payload}){
    console.log('payload', payload);

    try {
        yield axiosApi.post(`/cargo/`, payload);
        yield put (paymentAcceptedSuccess());
    } catch (e) {
        console.log(e.response.data);
        toast.error(e.response.data.error);
        yield put (fetchPaymentFailure(e.response.data.error));
    }
}
const paymentSagas = [
    takeEvery(fetchPaymentRequest, fetchPaymentAdmin),
    takeEvery(paymentAcceptedRequest, paymentAccepted),

];

export default paymentSagas;