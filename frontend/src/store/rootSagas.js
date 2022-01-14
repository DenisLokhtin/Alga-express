import {all} from 'redux-saga/effects';
import packageSagas from "./sagas/packageRegisterSagas";

export function* rootSagas() {
    yield all([
        ...packageSagas,
    ]);
}