import {all} from 'redux-saga/effects';
import usersSagas from "./sagas/usersSagas";

export function* rootSagas() {
    yield all([
        ...usersSagas,
    ])
}