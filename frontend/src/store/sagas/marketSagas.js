import {takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {put} from 'redux-saga/effects';
import {toast} from "react-toastify";
import {fetchMarketFailure, fetchMarketRequest, fetchMarketSuccess} from "../actions/marketActions";

export function* marketSagas() {
    try {
        const response = yield axiosApi.get('/market');
        yield put(fetchMarketSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить ссылки');
        yield put(fetchMarketFailure());
    }
}

const marketSaga = [
    takeEvery(fetchMarketRequest, marketSagas),
];

export default marketSaga;
