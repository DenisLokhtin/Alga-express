import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

import {
    getFlightsFailure,
    getFlightsRequest,
    getFlightsSuccess,
    postFlightFailure,
    postFlightRequest,
    postFlightSuccess,
    putFlightFailure,
    putFlightRequest,
    putFlightSuccess
} from '../actions/flightActions';
import {listFlightAdmin} from "../../paths";

function* postFlight({payload: data}) {
    try {
        yield axiosApi.post('/flights', data.flightNumber);
        yield put(postFlightSuccess());
        toast.success('Рейс добавлен!');
        data.navigate(listFlightAdmin);
    } catch (e) {
        yield put(postFlightFailure(e.response.data));
    }
}

function* getFlights({payload}) {
    try {
        const response = yield axiosApi.get(`/flights?page=${payload.page}&limit=${payload.limit}&status=${payload.status}`);
        yield put(getFlightsSuccess(response.data));
    } catch (e) {
        yield put(getFlightsFailure(e.response.data));
    }
}

function* putFlight({payload}) {
    try {
        const response = yield axiosApi.put(`/flights/${payload.id}?page=${payload.page}&limit=${payload.limit}&status=${payload.status}`, payload.flightData);
        yield put(putFlightSuccess(response.data));
        toast.success('Рейс отредактирован!');
    } catch (e) {
        yield put(putFlightFailure(e.response.data.message));
        toast.error(e.response.data.message);
    }
}

const flightSagas = [
    takeEvery(postFlightRequest,postFlight),
    takeEvery(getFlightsRequest,getFlights),
    takeEvery(putFlightRequest, putFlight),
];

export default flightSagas;