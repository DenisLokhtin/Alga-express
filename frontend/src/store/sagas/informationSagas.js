import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    changeInformationFailure,
    changeInformationRequest,
    changeInformationSuccess,
    fetchInformationFailure,
    fetchInformationRequest,
    fetchInformationSuccess,
    fetchAllInformationRequest,
    fetchAllInformationSuccess,
    fetchAllInformationFailure,
} from "../actions/informationActions";

export function* informationSagas({payload: name}) {
    try {
        const response = yield axiosApi.get(`/information/${name}`);
        yield put(fetchInformationSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить информацию');
        yield put(fetchInformationFailure(e.response.data));
    }
}

export function* allInformationSagas() {
    try {
        const response = yield axiosApi.get(`/information`);
        yield put(fetchAllInformationSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить информацию');
        yield put(fetchAllInformationFailure(e.response.data));
    }
}

function* informationEditSaga({payload}) {
    try {
        const response = yield axiosApi.put(`/information/${payload.information}`, {text: payload.text});
        yield put(changeInformationSuccess(response.data));
        toast.success('Информация отредактирована!');
    } catch (e) {
        yield put(changeInformationFailure(e.response.data));
    }
}

const informationSaga = [
    takeEvery(fetchInformationRequest, informationSagas),
    takeEvery(changeInformationRequest, informationEditSaga),
    takeEvery(fetchAllInformationRequest, allInformationSagas),
];

export default informationSaga;