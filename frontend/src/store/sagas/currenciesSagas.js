import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    fetchCurrencies,
    fetchCurrenciesFailure,
    fetchCurrenciesSuccess, updateCurrencies,
    updateCurrenciesSuccess
} from "../actions/currenciesActions";

export function* fetchCurrenciesSaga() {
    try {
        const {data} = yield axiosApi.get('/currencies');
        yield put(fetchCurrenciesSuccess(data));
    } catch (e) {
        yield put(fetchCurrenciesFailure(e));
    }
}

export function* updateCurrenciesSaga({payload}) {
    try {
        const {data} = yield axiosApi.put(`/currencies/${payload.id}`, payload.data);
        yield put(updateCurrenciesSuccess());
        toast.success(data.message);
    } catch (e) {
        yield put(fetchCurrenciesFailure(e));
    }
}

const currenciesSagas = [
    takeEvery(fetchCurrencies, fetchCurrenciesSaga),
    takeEvery(updateCurrencies, updateCurrenciesSaga)
]

export default currenciesSagas;