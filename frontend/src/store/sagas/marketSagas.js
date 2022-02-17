import {takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {put} from 'redux-saga/effects';
import {toast} from "react-toastify";
import {
    addMarketFailure, addMarketRequest,
    addMarketSuccess, deleteMarketFailure, deleteMarketRequest, deleteMarketSuccess,
    fetchMarketFailure,
    fetchMarketRequest,
    fetchMarketSuccess
} from "../actions/marketActions";

export function* marketSagas() {
    try {
        const response = yield axiosApi.get('/market');
        yield put(fetchMarketSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить ссылки');
        yield put(fetchMarketFailure());
    }
}

export function* addMarketSaga({payload: newMarket}) {
    try {
        yield axiosApi.post( '/market', newMarket);
        yield put(addMarketSuccess());
        yield put(fetchMarketRequest());
        toast.success('Новая ссылка добавлена!');
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
        }
        yield put(addMarketFailure(error.response.data));
    }
}


export function* deleteMarketSaga({payload: id}) {
    try {
        yield axiosApi.delete('/market/'+id);
        yield put(deleteMarketSuccess(id));
        toast.success('Deleted');
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
        } else {
            toast.error(error.response?.data?.global);
        }
        yield put(deleteMarketFailure(error.response?.data));
    }
}



const marketSaga = [
    takeEvery(fetchMarketRequest, marketSagas),
    takeEvery(addMarketRequest, addMarketSaga),
    takeEvery(deleteMarketRequest, deleteMarketSaga),
];

export default marketSaga;
