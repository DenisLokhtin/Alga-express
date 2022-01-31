import {takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {put} from 'redux-saga/effects';
import {toast} from "react-toastify";
import {
    addBuyoutRequest, addBuyoutSuccess, deleteBuyoutRequest,
    fetchBuyoutsFailure,
    fetchBuyoutsRequest,
    fetchBuyoutsSuccess
} from "../actions/buyoutActions";



export function* getBuyoutSagas() {
    try {
        const response = yield axiosApi.get('/buyout');
        yield put(fetchBuyoutsSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить');
        yield put(fetchBuyoutsFailure());
    }
}

export function* addBuyoutSaga({payload: newMarket}) {
    try {
        yield axiosApi.post( '/market', newMarket);
        yield put(addBuyoutSuccess());
        // yield put(fetchBuyoutsRequest());
        toast.success('Новая ссылка добавлена!');
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
        }
        toast.error('Произошла ошибка');
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
    takeEvery(fetchBuyoutsRequest, getBuyoutSagas),
    takeEvery(addBuyoutRequest, addMarketSaga),
    takeEvery(deleteBuyoutRequest, deleteMarketSaga),
];

export default marketSaga;
