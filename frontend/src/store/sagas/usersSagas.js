import {put, takeEvery} from "redux-saga/effects";
import {
    editUserDataFailure,
    editUserDataRequest,
    editUserDataSuccess,
    loginUser,
    loginUserFailure,
    loginUserSuccess,
    logout,
    registerUser,
    registerUserFailure,
    registerUserSuccess,
    userDateFailure,
    userDateResponse,
    userDateSuccess,
} from "../actions/usersActions";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export function* registerUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users', userData);
        yield put(registerUserSuccess(response.data));
        toast.success('Вы зарегистрированны');
    } catch (e) {
        toast.error(e.response.data.global);
        yield put(registerUserFailure(e.response.data));
    }
}

export function* loginUserSaga({payload: user}) {
    try {
        const response = yield axiosApi.post('/users/sessions', user);
        yield put(loginUserSuccess(response.data));
        toast.success('Вы авторизированы!');
    } catch (e) {
        toast.error(e.response.data.global);
        yield put(loginUserFailure(e.response.data));
    }
}

export function* getUserSaga({payload: id}) {
    try {
        const response = yield  axiosApi.get('/userEdit/' + id);
        yield put(userDateSuccess(response.data));
    } catch (e) {
        toast.error(e.response.data.global);
        yield put(userDateFailure(e.response.data));
    }
}

export function* editUserSaga({payload}) {
    try {
        const response = yield  axiosApi.put('/userEdit/' + payload.id, payload.data);
        yield put(editUserDataSuccess(response.data));
        toast.success('Редактирование успешно!');
    } catch (e) {
        toast.error(e.response.data.global);
        yield put(editUserDataFailure(e.response.data));
    }
}

export function* logoutUserSaga() {
    try {
        yield axiosApi.delete('/users/sessions');
    } catch (e) {
        if (e.response && e.response.data) {
            yield  put(loginUserFailure(e.response.data));
        } else {
            yield put(loginUserFailure({message: "No internet connexion"}));
        }
    }
}

const usersSaga = [
    takeEvery(registerUser, registerUserSaga),
    takeEvery(loginUser, loginUserSaga),
    takeEvery(logout, logoutUserSaga),
    takeEvery(userDateResponse, getUserSaga),
    takeEvery(editUserDataRequest, editUserSaga),
];

export default usersSaga;