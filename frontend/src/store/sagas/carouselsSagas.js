import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    addCarouselsFailure,
    addCarouselsRequest,
    addCarouselsSuccess,
    changeCarouselsFailure,
    changeCarouselsRequest,
    changeCarouselsSuccess,
    deleteCarouselsFailure,
    deleteCarouselsRequest,
    deleteCarouselsSuccess,
    fetchCarouselsFailure,
    fetchCarouselsRequest,
    fetchCarouselsSuccess,
    fetchOneCarouselsFailure,
    fetchOneCarouselsRequest,
    fetchOneCarouselsSuccess
} from "../actions/carouselActions";

export function* carouselsSagas() {
    try {
        const response = yield axiosApi.get('/carousels');
        yield put(fetchCarouselsSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить изображение');
        yield put(fetchCarouselsFailure());
    }
}

export function* oneCarouselsSagas({payload:id}) {
    try {
        const response = yield axiosApi.get('/carousels/'+ id);
        yield put(fetchOneCarouselsSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить изображение');
        yield put(fetchOneCarouselsFailure());
    }
}

export function* addCarouselsSaga({payload}) {
    try {
        yield axiosApi.post( '/carousels', payload.formData);
        yield put(addCarouselsSuccess());
        yield put(fetchCarouselsRequest());
        toast.success('Свежее изображение добавлено!');
        payload.navigate('/');
    } catch (error) {
        yield put(addCarouselsFailure(error.response.data));
    }
}

function* carouselsEditSaga({payload}) {
    try {
        yield axiosApi.put(`/carousels/${payload.carouselId}`, payload.carousels);
        yield put(changeCarouselsSuccess());
        toast.success('Изображение в карусели отредактировано!');
        payload.navigate('/carousels');
    } catch (e) {
        yield put(changeCarouselsFailure(e.response.data));
    }
}

function* deleteCarouselsSaga({payload: id}) {
    try {
        yield axiosApi.delete(`/carousels/${id}`);
        yield put(deleteCarouselsSuccess(id));
        toast.success('Изображение удалено!');
        // payload.navigate('/Carousels');
    } catch (e) {
        yield put(deleteCarouselsFailure(e.response.data));
    }
}


const carouselsSaga = [
    takeEvery(fetchCarouselsRequest, carouselsSagas),
    takeEvery(addCarouselsRequest, addCarouselsSaga),
    takeEvery(fetchOneCarouselsRequest, oneCarouselsSagas),
    takeEvery(changeCarouselsRequest, carouselsEditSaga),
    takeEvery(deleteCarouselsRequest, deleteCarouselsSaga),
];

export default carouselsSaga;