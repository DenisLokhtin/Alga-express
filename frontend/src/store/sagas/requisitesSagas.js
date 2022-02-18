import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    fetchRequisitesRequest,
    fetchRequisitesSuccess,
    fetchRequisitesFailure,
    fetchOneRequisitesRequest,
    fetchOneRequisitesSuccess,
    deleteRequisitesRequest,
    deleteRequisitesSuccess,
    deleteRequisitesFailure,
    addRequisitesRequest,
    addRequisitesSuccess,
    addRequisitesFailure,
    changeRequisitesRequest,
    changeRequisitesSuccess,
    changeRequisitesFailure
} from "../actions/requisitesActions";

export function* requisitesSagas({payload}) {
    try {
       if (payload) {
           const response = yield axiosApi.get(`/requisites/${payload.target.value}`);
           yield put(fetchOneRequisitesSuccess(response.data));
       } else {
           const response = yield axiosApi.get(`/requisites`);
           yield put(fetchRequisitesSuccess(response.data));
       }
    } catch (e) {
        toast.error('Не удалось загрузить реквезиты');
        yield put(fetchRequisitesFailure(e.response.data));
    }
}

export function* requisitesEditSaga({payload}) {
    try {
        const response = yield axiosApi.put(`/requisites/edit/${payload.bank}`, {requisites: payload.requisites});
        yield put(changeRequisitesSuccess(response.data));
        toast.success('Реквезиты отредактированы!');
    } catch (e) {
        yield put(changeRequisitesFailure(e.response.data));
    }
}

export function* requisitesDeleteSaga({payload}) {
    try {
        const response = yield axiosApi.delete(`/requisites/delete/${payload.bank}`);
        yield put(deleteRequisitesSuccess(response.data));
        toast.success('Реквезиты удалены!');
    } catch (e) {
        yield put(deleteRequisitesFailure(e.response.data));
    }
}

export function* requisitesAddSaga({payload}) {
    try {
        const response = yield axiosApi.post(`/requisites/add`, {requisites: payload.requisites, bank: payload.bank});
        yield put(addRequisitesSuccess(response.data));
        toast.success('Реквезиты добавлены!');
    } catch (e) {
        yield put(addRequisitesFailure(e.response.data));
    }
}

const requisitesSaga = [
    takeEvery(fetchRequisitesRequest, requisitesSagas),
    takeEvery(changeRequisitesRequest, requisitesEditSaga),
    takeEvery(fetchOneRequisitesRequest, requisitesSagas),
    takeEvery(deleteRequisitesRequest, requisitesDeleteSaga),
    takeEvery(addRequisitesRequest, requisitesAddSaga),
];

export default requisitesSaga;