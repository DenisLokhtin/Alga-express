import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    addWareHouseFailure, addWareHouseRequest,
    addWareHouseSuccess,
    changeWareHouseFailure, changeWareHouseRequest,
    changeWareHouseSuccess, deleteWareHouseFailure, deleteWareHouseRequest,
    deleteWareHouseSuccess,
    fetchOneWareHouseFailure, fetchOneWareHouseRequest,
    fetchOneWareHouseSuccess,
    fetchWareHouseFailure,
    fetchWareHouseRequest,
    fetchWareHouseSuccess
} from "../actions/wareHouseActions";

export function* wareHouseSagas() {
    try {
        const response = yield axiosApi.get('/warehouses');
        yield put(fetchWareHouseSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить склад');
        yield put(fetchWareHouseFailure());
    }
}

export function* oneWareHouseSagas({payload: id}) {
    try {
        const response = yield axiosApi.get('/warehouses/' + id);
        yield put(fetchOneWareHouseSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить склад');
        yield put(fetchOneWareHouseFailure());
    }
}

export function* addWareHouseSaga({payload}) {
    try {
        yield axiosApi.post('/warehouses', payload.wareHouseData);
        yield put(addWareHouseSuccess());
        yield put(fetchWareHouseRequest());
        toast.success('Склад добавлен!');
        payload.navigate('/alga-express/wareHouses');
    } catch (error) {
        yield put(addWareHouseFailure(error.response.data));
    }
}

function* wareHouseEditSaga({payload}) {
    try {
        yield axiosApi.put(`/warehouses/${payload.wareHouseId}`, payload.singleWareHouse);
        yield put(changeWareHouseSuccess());
        toast.success('Склад отредактирован!');
        payload.navigate('/alga-express/wareHouses');
    } catch (e) {
        yield put(changeWareHouseFailure(e.response.data));
    }
}

function* deleteWareHouseSaga({payload: id}) {
    try {
        yield axiosApi.delete(`/warehouses/${id}`);
        yield put(deleteWareHouseSuccess(id));
        toast.success('Склад удален!');
    } catch (e) {
        yield put(deleteWareHouseFailure(e.response.data));
    }
}

const wareHouseSaga = [
    takeEvery(fetchWareHouseRequest, wareHouseSagas),
    takeEvery(addWareHouseRequest, addWareHouseSaga),
    takeEvery(fetchOneWareHouseRequest, oneWareHouseSagas),
    takeEvery(changeWareHouseRequest, wareHouseEditSaga),
    takeEvery(deleteWareHouseRequest, deleteWareHouseSaga),
];

export default wareHouseSaga;