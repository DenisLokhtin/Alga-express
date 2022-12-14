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
    deleteNewsFailure,
    deleteNewsRequest,
    deleteNewsSuccess,
    fetchNewsFailure,
    fetchNewsRequest,
    fetchNewsSuccess,
    fetchOneNewsFailure,
    fetchOneNewsRequest,
    fetchOneNewsSuccess
} from "../actions/newsActions";

export function* newsSagas({payload}) {
    let queryParams = '/news';

    if (payload) {
        queryParams += payload;
    }

    try {
        const response = yield axiosApi.get(`${queryParams}`);
        yield put(fetchNewsSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить новость');
        yield put(fetchNewsFailure());
    }
}

export function* oneNewsSagas({payload}) {
    try {
        const response = yield axiosApi.get('/news/'+ payload);
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
        yield put(addNewsFailure(error.response.data));
    }
}

function* newsEditSaga({payload}) {
    try {
        yield axiosApi.put(`/news`, payload);
        yield put(changeNewsSuccess());
        toast.success('Новость отредактирована!');
        payload.navigate('/news');
    } catch (e) {
        yield put(changeNewsFailure(e));
    }
}

function* deleteNewsSaga({payload: id}) {
    try {
        yield axiosApi.delete(`/news/${id}`);
        yield put(deleteNewsSuccess(id));
        toast.success('Новость удалена!');
        // payload.navigate('/news');
    } catch (e) {
        yield put(deleteNewsFailure(e.response.data));
    }
}


const newsSaga = [
    takeEvery(fetchNewsRequest, newsSagas),
    takeEvery(addNewsRequest, addNewsSaga),
    takeEvery(fetchOneNewsRequest, oneNewsSagas),
    takeEvery(changeNewsRequest, newsEditSaga),
    takeEvery(deleteNewsRequest, deleteNewsSaga),
];

export default newsSaga;