import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    addBuyoutFailure,
    addBuyoutRequest,
    addBuyoutSuccess,
    deleteBuyoutFailure,
    deleteBuyoutRequest,
    deleteBuyoutSuccess,
    editBuyoutFailure,
    editBuyoutRequest,
    editBuyoutStatusFailure,
    editBuyoutStatusRequest,
    editBuyoutStatusSuccess,
    editBuyoutSuccess,
    fetchBuyoutsFailure,
    fetchBuyoutsList,
    fetchBuyoutsListFailure,
    fetchBuyoutsListSuccess,
    fetchBuyoutsRequest,
    fetchBuyoutsSuccess,
    fetchSingleBuyoutFailure,
    fetchSingleBuyoutRequest,
    fetchSingleBuyoutSuccess
} from "../actions/buyoutActions";
import {listBuyouts} from "../../paths";
import History from "../../History";



export function* getBuyoutSagas() {
    try {
        const response = yield axiosApi.get('/buyouts');
        yield put(fetchBuyoutsSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить');
        yield put(fetchBuyoutsFailure());
    }
}

export function* getOneBuyoutSagas({payload:id}) {
    try {
        const response = yield axiosApi.get('/buyouts/'+ id);
        yield put(fetchSingleBuyoutSuccess(response.data[0]));
    } catch (e) {
        toast.error('Не удалось загрузить');
        yield put(fetchSingleBuyoutFailure());
    }
}


export function* addBuyoutSaga({payload}) {
    try {
        yield axiosApi.post( '/buyouts', payload);
        yield put(addBuyoutSuccess());
       History.push(listBuyouts);
        toast.success('Новый заказ выкупа добавлен!');

    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
        }
        yield put(addBuyoutFailure(error.response.data));
    }
}


export function* deleteBuyoutSaga({payload: id}) {
    try {
        yield axiosApi.delete('/buyouts/'+id);
        yield put(deleteBuyoutSuccess(id));
        toast.success('Успешно удален');
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
        } else {
            toast.error(error.response?.data?.global);
        }
        yield put(deleteBuyoutFailure(error.response?.data));
    }
}

function* editBuyoutSagas({payload}) {
    try {
        yield axiosApi.put(`/buyouts/` + payload.id, payload.obj);
        yield put(editBuyoutSuccess());
        toast.success('Успешно обновлен!');
    } catch (e) {
        yield put(editBuyoutFailure(e.response.data));
    }
}

function* editBuyoutStatusSagas({payload: id}) {
    try {
        yield axiosApi.put(`/buyouts/change/` + id,);
        yield put(editBuyoutStatusSuccess());
        toast.success('Успешно обновлен!');
    } catch (e) {
        yield put(editBuyoutStatusFailure(e.response.data));
    }
}

function* fetchBuyoutsListSaga({payload}) {
    try {
        const {data} = yield axiosApi.get(`/buyouts/list?page=${payload.page}&limit=${payload.limit}`)
        yield put(fetchBuyoutsListSuccess(data));
    } catch (e) {
        yield put(fetchBuyoutsListFailure(e));
    }
}


const buyoutSaga = [
    takeEvery(fetchBuyoutsRequest, getBuyoutSagas),
    takeEvery(addBuyoutRequest, addBuyoutSaga),
    takeEvery(deleteBuyoutRequest, deleteBuyoutSaga),
    takeEvery(fetchSingleBuyoutRequest, getOneBuyoutSagas),
    takeEvery(editBuyoutRequest, editBuyoutSagas),
    takeEvery(editBuyoutStatusRequest, editBuyoutStatusSagas),
    takeEvery(fetchBuyoutsList, fetchBuyoutsListSaga)
];

export default buyoutSaga;
