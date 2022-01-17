import {all} from 'redux-saga/effects';
import packageSagas from "./sagas/packageRegisterSagas";
import usersSagas from "./sagas/usersSagas";
import newsSaga from "./sagas/newsSagas";

export function* rootSagas() {
    yield all([
        ...packageSagas,
        ...usersSagas,
        ...newsSaga,
    ]);
}