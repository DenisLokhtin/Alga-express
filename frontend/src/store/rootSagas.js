import {all} from 'redux-saga/effects';
import registerUserSaga from "./sagas/usersSagas";

export function* rootSagas() {
    yield all([
        ...registerUserSaga
    ])
}