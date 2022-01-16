import {all} from 'redux-saga/effects';
import packageSagas from "./sagas/packageRegisterSagas";
import usersSagas from "./sagas/usersSagas";

export function* rootSagas() {
    yield all([
        ...packageSagas,
        ...usersSagas,
    ]);
}