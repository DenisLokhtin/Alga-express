import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    changeRequisitesFailure,
    changeRequisitesRequest,
    changeRequisitesSuccess,
    fetchRequisitesFailure,
    fetchRequisitesRequest,
    fetchRequisitesSuccess,
} from "../actions/requisitesActions";

export function* requisitesSagas() {
    try {
        const response = yield axiosApi.get(`/requisites/`);
        yield put(fetchRequisitesSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить реквезиты');
        yield put(fetchRequisitesFailure(e.response.data));
    }
}

function* requisitesEditSaga({payload}) {
    try {
        console.log(payload);
        const response = yield axiosApi.put(`/requisites/${payload.bank}`, {requisites: payload.requisites});
        yield put(changeRequisitesSuccess(response.data));
        toast.success('Реквезиты отредактированы!');
    } catch (e) {
        yield put(changeRequisitesFailure(e.response.data));
    }
}

const requisitesSaga = [
    takeEvery(fetchRequisitesRequest, requisitesSagas),
    takeEvery(changeRequisitesRequest, requisitesEditSaga),
];

export default requisitesSaga;