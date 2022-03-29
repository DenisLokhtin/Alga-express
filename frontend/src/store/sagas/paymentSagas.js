import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {
    addPaymentAdminRequest,
    fetchPaymentFailure,
    fetchPaymentRequest,
    fetchPaymentSuccess,
    paymentAcceptedRequest,
    paymentAcceptedSuccess,
} from "../actions/paymentActions";
import {toast} from "react-toastify";
import History from "../../History";
import {adminPagePath} from "../../paths";

export function* fetchPaymentAdmin({payload: paymentsData}) {
    const page = paymentsData.page;
    const limit = paymentsData.limit;
    const id = paymentsData.id;
    const history = paymentsData.history;
    const from = paymentsData.from;
    const to = paymentsData.to;

    let url = `/cargo?page=${page}&limit=${limit}`;

    if (id) url = url.concat(`&id=${id}`);
    if (history) url = url.concat(`&history=${true}`);
    if (from) url = url.concat(`&from=${from}`);
    if (to) url = url.concat(`&to=${to}`);

    try {
        const response = yield axiosApi.get(url);

        yield put(fetchPaymentSuccess(response.data));
    } catch (e) {
        toast.error(e.response.data.error);
        yield put(fetchPaymentFailure(e.response.data.error));
    }
}

export function* paymentAccepted({payload}) {
    try {
        yield axiosApi.post(`/cargo/`, payload);
        yield put(paymentAcceptedSuccess());
        toast.success("Оплата подтверждена");
    } catch (e) {
        console.log('ya tut => ', e);
        toast.error(e.response.data.error);
        yield put(fetchPaymentFailure(e.response.data));
    }
}

export function* addPaymentAdmin({payload}) {
    try {
        const payment = yield axiosApi.post(`/cargo/cash`, payload);
        yield put(paymentAcceptedSuccess());
        yield put(fetchPaymentFailure());
        toast.success(payment.data);
        History.push(adminPagePath);
    } catch (e) {
        toast.error(e.response.data.error);
        yield put(fetchPaymentFailure(e.response.data));
    }
}

const paymentSagas = [
    takeEvery(fetchPaymentRequest, fetchPaymentAdmin),
    takeEvery(paymentAcceptedRequest, paymentAccepted),
    takeEvery(addPaymentAdminRequest, addPaymentAdmin),
];

export default paymentSagas;