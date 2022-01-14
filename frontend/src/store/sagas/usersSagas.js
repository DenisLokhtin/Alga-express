import {put, takeEvery} from "redux-saga/effects";
import {
    loginUser,
    loginUserFailure,
    loginUserSuccess, logout,
    registerUser,
    googleLoginRequest,
    registerUserFailure,
    registerUserSuccess,
} from "../actions/usersActions";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export function* registerUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users', userData);
        yield put(registerUserSuccess(response.data));
        toast.success('Registered successful!');
    } catch (e) {
        toast.error(e.response.data.global);
        yield put(registerUserFailure(e.response.data));
    }
}

export function* loginUserSaga({payload: user}) {
    try {
        const response = yield axiosApi.post('/users/sessions', user);
        yield put(loginUserSuccess(response.data));
        toast.success('Login successful!');
    } catch (e) {
        toast.error(e.response.data.global);
        yield put(loginUserFailure(e.response.data));
    }
}

export function* googleLogin({payload: googleData}) {
    try {
        const response = yield axiosApi.post("/users/googleLogin", {token: googleData.tokenId});
        yield put(loginUserSuccess(response.data.user));
    } catch (error) {
        yield put(loginUserFailure(error.response.data));
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
    takeEvery(googleLoginRequest, googleLogin),
];

export default usersSaga;