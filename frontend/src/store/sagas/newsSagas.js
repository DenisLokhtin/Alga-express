import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    addNewsFailure,
    addNewsRequest,
    addNewsSuccess,
    changeNewsFailure,
    changeNewsRequest,
    changeNewsSuccess,
    fetchNewsFailure,
    fetchNewsRequest,
    fetchNewsSuccess,
    fetchOneNewsFailure,
    fetchOneNewsRequest,
    fetchOneNewsSuccess
} from "../actions/newsActions";

export function* newsSagas() {
    try {
        const response = yield axiosApi.get('/news');
        yield put(fetchNewsSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить новость');
        yield put(fetchNewsFailure());
    }
}

export function* oneNewsSagas({payload:id}) {
    try {
        const response = yield axiosApi.get('/news/'+ id);
        yield put(fetchOneNewsSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить новость');
        yield put(fetchOneNewsFailure());
    }
}

export function* addNewsSaga({payload: newNews}) {
    try {
        yield axiosApi.post( '/news', newNews);
        yield put(addNewsSuccess());
        yield put(fetchNewsRequest());
        toast.success('Свежая новость добавлена!');
    } catch (error) {
        toast.error('Произошла ошибка');
        yield put(addNewsFailure(error.response.data));
    }
}

function* newsEditSaga({payload}) {
    try {
        yield axiosApi.put(`/news/${payload.id}`, payload.news);
        yield put(changeNewsSuccess());
        toast.success('Новость отредактирована');
    } catch (e) {
        yield put(changeNewsFailure(e.response.data));
    }
}


const newsSaga = [
    takeEvery(fetchNewsRequest, newsSagas),
    takeEvery(addNewsRequest, addNewsSaga),
    takeEvery(fetchOneNewsRequest, oneNewsSagas),
    takeEvery(changeNewsRequest, newsEditSaga),
];

export default newsSaga;