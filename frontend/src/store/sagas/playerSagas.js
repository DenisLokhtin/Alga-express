import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {
    addPlayerFailure, addPlayerRequest,
    addPlayerSuccess,
    changePlayerFailure, changePlayerRequest,
    changePlayerSuccess, deletePlayerFailure, deletePlayerRequest,
    deletePlayerSuccess,
    fetchOnePlayerFailure, fetchOnePlayerRequest,
    fetchOnePlayerSuccess,
    fetchPlayerFailure,
    fetchPlayerRequest,
    fetchPlayerSuccess
} from "../actions/playerActions";

export function* playerSagas() {
    try {
        const response = yield axiosApi.get('/players');
        yield put(fetchPlayerSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить видео');
        yield put(fetchPlayerFailure());
    }
}

export function* onePlayerSagas({payload: id}) {
    try {
        const response = yield axiosApi.get('/players/' + id);
        yield put(fetchOnePlayerSuccess(response.data));
    } catch (e) {
        toast.error('Не удалось загрузить видео');
        yield put(fetchOnePlayerFailure());
    }
}

export function* addPlayerSaga({payload}) {
    try {
        yield axiosApi.post('/players', payload.playerData);
        yield put(addPlayerSuccess());
        yield put(fetchPlayerRequest());
        toast.success('Видео добавлено!');
        payload.navigate('/alga-express/wareHouses');
    } catch (error) {
        yield put(addPlayerFailure(error.response.data));
    }
}

function* playerEditSaga({payload}) {
    try {
        yield axiosApi.put(`/players/${payload.playerId}`, payload.singlePlayer);
        yield put(changePlayerSuccess());
        toast.success('Видео отредактировано!');
        payload.navigate('/alga-express/players');
    } catch (e) {
        yield put(changePlayerFailure(e.response.data));
    }
}

function* deletePlayerSaga({payload: id}) {
    try {
        yield axiosApi.delete(`/players/${id}`);
        yield put(deletePlayerSuccess(id));
        toast.success('Видео удалено!');
    } catch (e) {
        yield put(deletePlayerFailure(e.response.data));
    }
}

const playerSaga = [
    takeEvery(fetchPlayerRequest, playerSagas),
    takeEvery(addPlayerRequest, addPlayerSaga),
    takeEvery(fetchOnePlayerRequest, onePlayerSagas),
    takeEvery(changePlayerRequest, playerEditSaga),
    takeEvery(deletePlayerRequest, deletePlayerSaga),
];

export default playerSaga;