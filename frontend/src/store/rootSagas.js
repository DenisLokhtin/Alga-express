import {all} from 'redux-saga/effects';
import usersSagas from "./sagas/usersSagas";
import marketSaga from "./sagas/marketSagas";

export function* rootSagas() {
    yield all([
        ...usersSagas,
        ...marketSaga,
    ])
}