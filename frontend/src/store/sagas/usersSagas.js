import {put, takeEvery} from "redux-saga/effects";
import {
    editPassportFailure,
    editPassportRequest, editPassportSuccess,
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
    userDateRequest,
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
        toast.error(e.response.data.error);
        yield put(userDateFailure(e.response.data));
    }
}

export function* editUserSaga({payload}) {
    try {
        const response = yield  axiosApi.put('/userEdit/' + payload.id, payload.data);
        yield put(editUserDataSuccess(response.data));
        toast.success('Редактирование успешно!');
    } catch (e) {
        toast.error(e.response.data.error);
        yield put(editUserDataFailure(e.response.data));
    }
}

export function* editPassportSaga({payload}) {
    console.log(payload);
    try {
        const response = yield  axiosApi.put('/userEdit/' + payload.id, payload.data);
        yield put(editPassportSuccess(response.data));
        toast.success('Добавление прошло успешно!');
    } catch (e) {
        toast.error(e.response.data.error);
        yield put(editPassportFailure(e.response.data));
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
    takeEvery(userDateRequest, getUserSaga),
    takeEvery(editUserDataRequest, editUserSaga),
    takeEvery(editPassportRequest, editPassportSaga),
];

export default usersSaga;