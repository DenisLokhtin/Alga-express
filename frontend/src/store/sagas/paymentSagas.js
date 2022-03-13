import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {
    addPaymentAdminRequest,
    fetchPaymentFailure,
    fetchPaymentRequest,
    fetchPaymentSuccess,
    fetchTariffGroupFailure,
    fetchTariffGroupRequest,
    fetchTariffGroupSuccess,
    paymentAcceptedRequest,
    paymentAcceptedSuccess,
} from "../actions/paymentActions";
import {toast} from "react-toastify";

export function* fetchPaymentAdmin ({payload: paymentsData}){
    let response;
    const page = paymentsData.page;
    const limit = paymentsData.limit;
    const id = paymentsData.id;
    const history = paymentsData.history;

    try {
        if (id) {
            if (history) {
                response = yield axiosApi.get(`/cargo?page=${page}&limit=${limit}&history=${true}&id=${id}`);
            } else {
                response = yield axiosApi.get(`/cargo?page=${page}&limit=${limit}&id=${id}`);
            }
        } else {
            if (history) {
                response = yield axiosApi.get(`/cargo?page=${page}&limit=${limit}&history=${true}`);
            } else {
                response = yield axiosApi.get(`/cargo?page=${page}&limit=${limit}`);
            }
        }
        yield put (fetchPaymentSuccess(response.data));
    } catch (e) {
        toast.error(e.response.data.error);
        yield put (fetchPaymentFailure(e.response.data.error));
    }
}

export function* paymentAccepted ({payload}){
    try {
        yield axiosApi.post(`/cargo/`, payload);
        yield put (paymentAcceptedSuccess());
    } catch (e) {
        toast.error(e.response.data.error);
        yield put (fetchPaymentFailure(e.response.data));
    }
}

export function* addPaymentAdmin ({payload}){
    try {
        const payment = yield axiosApi.post(`/cargo/cash`, payload);
        yield put (paymentAcceptedSuccess());
        yield put(fetchPaymentFailure());
        toast.success(payment.data);
    } catch (e) {
        // toast.error(e.response.data.error);
        yield put (fetchPaymentFailure(e.response.data));
    }
}

export function* fetchTariffGroup () {
    try {
        const response = yield axiosApi.get(`/cargo/tariff`);
        yield put (fetchTariffGroupSuccess(response.data));
        toast.success(response.data);
    } catch (e) {
        yield put (fetchTariffGroupFailure(e.response.data.error));
    }
}


const paymentSagas = [
    takeEvery(fetchPaymentRequest, fetchPaymentAdmin),
    takeEvery(paymentAcceptedRequest, paymentAccepted),
    takeEvery(addPaymentAdminRequest, addPaymentAdmin),
    takeEvery(fetchTariffGroupRequest, fetchTariffGroup),


];

export default paymentSagas;