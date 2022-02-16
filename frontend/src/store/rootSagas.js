import {all} from 'redux-saga/effects';
import packageSagas from "./sagas/packageRegisterSagas";
import usersSagas from "./sagas/usersSagas";
import newsSaga from "./sagas/newsSagas";
import marketSaga from "./sagas/marketSagas";
import flightSagas from "./sagas/flightSagas";
import buyoutSagas from "./sagas/buyoutSagas";
import paymentSagas from "./sagas/paymentSagas";
import pagesSagas from "./sagas/pagesSagas";
import tariffSagas from "./sagas/tariffSagas";

export function* rootSagas() {
    yield all([
        ...packageSagas,
        ...usersSagas,
        ...newsSaga,
        ...marketSaga,
        ...flightSagas,
        ...paymentSagas,
        ...buyoutSagas,
        ...pagesSagas,
        ...tariffSagas,
    ]);
}