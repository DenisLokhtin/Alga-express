import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {toast} from "react-toastify";
import {fetchTariffsRequest, fetchTariffsSuccess} from "../actions/tariffActions";
import {fetchMarketFailure} from "../actions/marketActions";

export function* getTariffsSagas() {
    try {
        const response = yield axiosApi.get('/tariffs');
        yield put(fetchTariffsSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить тарифы');
        yield put(fetchMarketFailure());
    }
}

const tariffSagas = [
    takeEvery(fetchTariffsRequest, getTariffsSagas),

];

export default tariffSagas;