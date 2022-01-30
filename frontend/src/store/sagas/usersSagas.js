import {put, takeEvery} from "redux-saga/effects";
import {
    addUserPaymentFailure,
    addUserPaymentRequest,
    addUserPaymentSuccess,
    editPassportFailure,
    editPassportRequest,
    editPassportSuccess,
    editUserDataFailure,
    editUserDataRequest,
    editUserDataSuccess,
    fetchUserPaymentFailure,
    fetchUserPaymentRequest,
    fetchUserPaymentSuccess,
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
        userData.navigate('/');
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
        user.navigate('/', true);
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
        yield put(editPassportFailure(e.response.data.error));
    }
}

export function* userPaymentSaga({payload}) {
    try {
        const response = yield  axiosApi.post('/userEdit/payment/', payload);
        yield put(addUserPaymentSuccess(response.data));
        // toast.success('Добавление прошло успешно!');
    } catch (e) {
        toast.error(e.response.data.error);
        yield put(addUserPaymentFailure(e.response.data.error));
    }
}

export function* fetchUserPaymentSaga ({payload}) {
    console.log('payload', payload);
    const page = payload.page;
    const limit = payload.limit;

    try{
        const response = yield axiosApi.get(`/userEdit/payment?page=${page}&limit=${limit}`);
        yield put(addUserPaymentSuccess(response.data));
        toast.success('Оплата отправлена');
    } catch (e) {
        toast.error(e.response.data.error);
        yield put(addUserPaymentFailure(e.response.data.error));
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
    takeEvery(addUserPaymentRequest, userPaymentSaga),
    takeEvery(fetchUserPaymentRequest, fetchUserPaymentSaga),
];

export default usersSaga;