import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {toast} from "react-toastify";
import {
    changeTariffFailure,
    changeTariffRequest,
    changeTariffSuccess,
    fetchTariffsFailure,
    fetchTariffsRequest,
    fetchTariffsSuccess
} from "../actions/tariffActions";

export function* getTariffsSagas() {
    try {
        const response = yield axiosApi.get('/tariffs');
        yield put(fetchTariffsSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить тарифы');
        yield put(fetchTariffsFailure(e.response));
    }
}

export function* putTariffsSagas({payload}) {
    console.log(payload);
    try {
        const response = yield axiosApi.put('/tariffs', payload);
        console.log(response.data)
        yield put(changeTariffSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить тарифы');
        yield put(changeTariffFailure(e.response.data));
    }
}

const tariffSagas = [
    takeEvery(fetchTariffsRequest, getTariffsSagas),
    takeEvery(changeTariffRequest, putTariffsSagas),

];

export default tariffSagas;