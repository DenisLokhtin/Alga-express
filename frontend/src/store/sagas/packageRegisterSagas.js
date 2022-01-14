import {takeEvery, put} from 'redux-saga/effects';
import {createPackageFailure, createPackageRequest, createPackageSuccess} from "../actions/packageRegisterActions";
import axiosApi from "../../axiosApi";

function* packageRegisterSagas({payload: packageData}) {
    try {
        yield axiosApi.post('/packages', packageData);
        yield put(createPackageSuccess());
    } catch (e) {
        yield put(createPackageFailure(e.response.data));
    }
}

const packageSagas = [
    takeEvery(createPackageRequest, packageRegisterSagas),
];

export default packageSagas;