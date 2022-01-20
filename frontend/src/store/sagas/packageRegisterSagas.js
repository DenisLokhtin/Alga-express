import {takeEvery, put} from 'redux-saga/effects';
import {
    changePackageFailure, changePackageRequest, changePackageSuccess,
    createPackageFailure,
    createPackageRequest,
    createPackageSuccess, getPackageByIdFailure, getPackageByIdRequest, getPackageByIdSuccess
} from "../actions/packageRegisterActions";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

function* packageRegisterSagas({payload: packageData}) {
    try {
        yield axiosApi.post('/packages', packageData);
        yield put(createPackageSuccess());
        toast.success('Ваш заказ был успешно создан');
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

const packageSagas = [
    takeEvery(createPackageRequest, packageRegisterSagas),
    takeEvery(changePackageRequest, packageChangeSagas),
    takeEvery(getPackageByIdRequest, packageGetByIdSagas),
];

export default packageSagas;