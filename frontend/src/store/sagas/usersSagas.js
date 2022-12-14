import {
    addUserPaymentFailure,
    addUserPaymentRequest,
    addUserPaymentSuccess,
    changePasswordFailure,
    changePasswordRequest,
    changePasswordSuccess,
    editPassportFailure,
    editPassportRequest,
    editPassportSuccess,
    editTariff,
    editTariffFailure,
    editTariffSuccess,
    editUserDataByAdminFailure,
    editUserDataByAdminRequest,
    editUserDataByAdminSuccess,
    editUserDataFailure,
    editUserDataRequest,
    editUserDataSuccess,
    fetchUserPaymentFailure,
    fetchUserPaymentRequest,
    fetchUserPaymentSuccess,
    fetchUsersFailure,
    fetchUsersRequest,
    fetchUsersSuccess,
    forgotPasswordFailure,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    loginUser,
    loginUserFailure,
    loginUserSuccess,
    logout,
    registerUser,
    registerUserFailure,
    registerUserSuccess,
    resetPasswordFailure,
    resetPasswordRequest,
    resetPasswordSuccess,
    userDateFailure,
    userDateRequest,
    userDateSuccess,
} from "../actions/usersActions";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import History from '../../History';
import {adminPagePath, processingTrackNumbersAdmin, userLogin, userPage} from "../../paths";
import {put, select, takeEvery} from "redux-saga/effects";

export function* registerUserSaga({payload}) {
    try {
        const userData = {
            email: payload.email,
            name: payload.name,
            password: payload.password,
            phone: payload.phone,
            role: payload.role || 'user',
            creator: payload?.userData?.role || null,
            confirmPassword: payload.confirmPassword,
        };

        const response = yield axiosApi.post('/users', userData);
        if (response.data.creator === 'superAdmin') {
            if (payload?.role === 'admin') {
                toast.success('Вы успешно создали администратора');
                History.push(adminPagePath);
                yield put(registerUserSuccess());
            } else if (payload?.role === 'warehouseman') {
                yield put(registerUserSuccess());
                toast.success('Вы успешно создали складовщика');
                History.push(adminPagePath);
            }
        } else {
            yield put(registerUserSuccess(response.data));
            toast.success('Вы зарегистрированы');
            History.push(userPage);
        }
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
        switch (response.data.role) {
            case 'admin':
                History.push(adminPagePath);
                break;
            case 'superAdmin':
                History.push(adminPagePath);
                break;
            case 'warehouseman':
                History.push(processingTrackNumbersAdmin);
                break;
            case 'user':
                History.push(userPage);
                break;
            default:
                return
        }
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
        History.push(userPage);
    } catch (e) {
        toast.error(e.response.data.error);
        yield put(editUserDataFailure(e.response.data));
    }
}


export function* editUserByAdminSaga({payload}) {
    try {
        const response = yield  axiosApi.put('/userEdit/' + payload.id, payload.data);
        yield put(editUserDataByAdminSuccess(response.data));
        toast.success('Редактирование успешно!');
    } catch (e) {
        toast.error(e.response.data.error);
        yield put(editUserDataByAdminFailure(e.response.data));
    }
}

export function* editPassportSaga({payload}) {
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
        yield  axiosApi.post('/userEdit/payment/', payload);
        yield put(addUserPaymentSuccess());
        toast.success('Оплата отправлена');
        History.push(userPage);
    } catch (e) {
        toast.error(e.response.data.error);
        yield put(addUserPaymentFailure(e.response.data.error));
    }
}

export function* fetchUserPaymentSaga({payload}) {
    const page = payload.page;
    const limit = payload.limit;

    try {
        const response = yield axiosApi.get(`/userEdit/payment?page=${page}&limit=${limit}`);
        yield put(fetchUserPaymentSuccess(response.data));
    } catch (e) {
        toast.error(e.response.data.error);
        yield put(fetchUserPaymentFailure(e.response.data.error));
    }
}

export function* fetchUserSaga() {
    try {
        const response = yield axiosApi.get(`/users`);
        yield put(fetchUsersSuccess(response.data));
    } catch (e) {
        toast.error(e.response.data.error);
        yield put(fetchUsersFailure(e.response.data.error));

    }
}


export function* resetPasswordSaga({payload: user}) {
    try {
        const response = yield axiosApi.post('/users/reset', user);
        user.navigate(userLogin, true);
        yield put(resetPasswordSuccess());
        toast.success(response.data?.message);
    } catch (e) {
        yield put(resetPasswordFailure(e.response.data));
    }
}


export function* changePasswordSaga({payload: user}) {
    try {
        const response = yield axiosApi.post('/users/change', user);
        user.navigate('/', true);
        yield put(changePasswordSuccess());
        toast.success(response.data?.message);
    } catch (e) {
        yield put(changePasswordFailure(e.response.data));
    }
}


export function* forgotPasswordSaga({payload: user}) {
    try {
        const response = yield axiosApi.post('/users/forgot', user);
        user.navigate('/', true);
        yield put(forgotPasswordSuccess());
        toast.success(response.data?.message);
    } catch (e) {
        yield put(forgotPasswordFailure(e.response.data));
    }
}

export function* logoutUserSaga() {
    try {
        yield axiosApi.delete('/users/sessions');
    } catch (e) {
        if (e.response && e.response.data) {
            yield  put(loginUserFailure(e.response.data));
        } else {
            yield put(loginUserFailure({message: "No internet connection"}));
        }
    }
}

export function* editTariffSagas({payload}) {
    const state = yield select();
    const userRole = state.users.user.role;
    const id = payload.id;
    const group = payload.group;
    const tariff = payload.tariff;

    try {
        const {data} = yield axiosApi.put(`users/tariffEdit?id=${id}`, {group: group, tariff: tariff});
        if (userRole === 'user') {
            yield put(editTariffSuccess(data.user.tariff));
        }
        yield put(editTariffSuccess());
        toast.success(data.message);
    } catch (e) {
        yield put(editTariffFailure(e));
    }
}

const usersSaga = [
    takeEvery(registerUser, registerUserSaga),
    takeEvery(loginUser, loginUserSaga),
    takeEvery(logout, logoutUserSaga),
    takeEvery(userDateRequest, getUserSaga),
    takeEvery(editUserDataRequest, editUserSaga),
    takeEvery(editUserDataByAdminRequest, editUserByAdminSaga),
    takeEvery(editPassportRequest, editPassportSaga),
    takeEvery(addUserPaymentRequest, userPaymentSaga),
    takeEvery(fetchUserPaymentRequest, fetchUserPaymentSaga),
    takeEvery(fetchUsersRequest, fetchUserSaga),
    takeEvery(resetPasswordRequest, resetPasswordSaga),
    takeEvery(changePasswordRequest, changePasswordSaga),
    takeEvery(forgotPasswordRequest, forgotPasswordSaga),
    takeEvery(editTariff, editTariffSagas)
];

export default usersSaga;