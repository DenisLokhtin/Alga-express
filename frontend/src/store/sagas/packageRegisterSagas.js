import {takeEvery, put} from 'redux-saga/effects';
import {
    changePackageFailure,
    changePackageRequest,
    changePackageSuccess,
    createPackageFailure,
    createPackageRequest,
    createPackageSuccess, getOrderByIdError, getOrderByIdRequest,
    getOrderByIdSuccess, getOrdersHistoryError, getOrdersHistoryRequest,
    getOrdersHistorySuccess,
    getPackageByIdFailure,
    getPackageByIdRequest,
    getPackageByIdSuccess
} from "../actions/packageRegisterActions";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

function* packageRegisterSagas({payload: packageData}) {
    try {
        yield axiosApi.post('/packages', packageData);
        yield put(createPackageSuccess());
        toast.success('Ваш заказ был успешно создан');
        packageData.navigate('/');
    } catch (e) {
        yield put(createPackageFailure(e.response.data));
    }
}

function* packageGetByIdSagas({payload: id}) {
    try {
        const {data} = yield axiosApi.get(`/packages/${id}`);
        yield put(getPackageByIdSuccess(data));
    } catch (e) {
        yield put(getPackageByIdFailure(e.response.data));
    }
}

function* packageChangeSagas({payload}) {
    try {
        yield axiosApi.put(`/packages/${payload._id}`, payload);
        yield put(changePackageSuccess());
        toast.success('Ваш заказ был успешно отредактирован');
    } catch (e) {
        yield put(changePackageFailure(e.response.data));
    }
}

function* getOrdersHistorySagas({payload: pageData}) {
    try {
        const response = yield axiosApi.get(`/packages?page=${pageData.page - 1}&limit=${pageData.limit}`);
        yield put(getOrdersHistorySuccess(response.data));
    } catch (error) {
        yield put(getOrdersHistoryError(error.response.statusText || error.essage));
        toast.error( error.response.statusText || error.message, {
            autoClose: 5000,
        });
    }
}

function* getOrderById({payload: orderId}) {
    try {
        const response = yield axiosApi.get(`/packages/${orderId}`);
        yield put(getOrderByIdSuccess(response.data));
    } catch (error) {
        yield put(getOrderByIdError(error.response.data));
        toast.error( error.response.statusText || error.message, {
            autoClose: 5000,
        });
    }
}

const packageSagas = [
    takeEvery(createPackageRequest, packageRegisterSagas),
    takeEvery(changePackageRequest, packageChangeSagas),
    takeEvery(getPackageByIdRequest, packageGetByIdSagas),
    takeEvery(getOrdersHistoryRequest, getOrdersHistorySagas),
    takeEvery(getOrderByIdRequest, getOrderById),
];

export default packageSagas;