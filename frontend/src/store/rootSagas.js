import {all} from 'redux-saga/effects';
import packageSagas from "./sagas/packageRegisterSagas";
import usersSagas from "./sagas/usersSagas";
import newsSaga from "./sagas/newsSagas";
import marketSaga from "./sagas/marketSagas";
import flightSagas from "./sagas/flightSagas";

export function* rootSagas() {
    yield all([
        ...packageSagas,
        ...usersSagas,
        ...newsSaga,
        ...marketSaga,
        ...flightSagas,
    ]);
}