import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    changePagesFailure,
    changePagesRequest,
    changePagesSuccess,
    fetchPagesFailure,
    fetchPagesRequest,
    fetchPagesSuccess,
} from "../actions/pagesAction";

export function* pagesSagas({payload: nameURL}) {
    try {
        const response = yield axiosApi.get(`/pages/${nameURL}`);
        yield put(fetchPagesSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить страницу');
        yield put(fetchPagesFailure(e.response.data));
    }
}

function* pagesEditSaga({payload}) {
    try {
        console.log(payload);
        const response = yield axiosApi.put(`/pages/${payload.page}`, {text: payload.text});
        yield put(changePagesSuccess(response.data));
        toast.success('Страница отредактирована!');
    } catch (e) {
        yield put(changePagesFailure(e.response.data));
    }
}

const pagesSaga = [
    takeEvery(fetchPagesRequest, pagesSagas),
    takeEvery(changePagesRequest, pagesEditSaga),
];

export default pagesSaga;