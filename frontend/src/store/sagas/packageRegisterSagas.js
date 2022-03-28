import {put, select, takeEvery} from 'redux-saga/effects';
import {
    changeDeliveryStatusError,
    changeDeliveryStatusRequest,
    changeDeliveryStatusSuccess,
    changePackageFailure,
    changePackageRequest,
    changePackageSuccess,
    changeStatusesError,
    changeStatusesRequest,
    changeStatusesSuccess,
    createPackageFailure,
    createPackageRequest,
    createPackageSuccess, editAdminPackageFailure,
    editAdminPackageRequest,
    editAdminPackageSuccess,
    fetchNewPackages,
    fetchNewPackagesFailure,
    fetchNewPackagesSuccess,
    fetchPackageAdminFailure,
    fetchPackageAdminRequest,
    fetchPackageAdminSuccess,
    getOrderByIdError,
    getOrderByIdRequest,
    getOrderByIdSuccess,
    getOrdersHistoryError,
    getOrdersHistoryRequest,
    getOrdersHistorySuccess,
    getPackageByIdFailure,
    getPackageByIdRequest,
    getPackageByIdSuccess,
    giveOutFailure,
    giveOutRequest,
    giveOutSuccess,
} from "../actions/packageRegisterActions";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import History from '../../History';
import {adminPagePath, userPage} from "../../paths";

function* packageRegisterSagas({payload: packageData}) {
    const state = yield select();
    const role = state.users.user.role;

    try {
        yield axiosApi.post('/packages', packageData);
        yield put(createPackageSuccess());
        toast.success('Ваш заказ был успешно создан');
        if ((role==='admin') || (role === 'superAdmin')){
            History.push(adminPagePath);
        }else{
            History.push(userPage);
        }
    } catch (e) {
        yield put(createPackageFailure(e.response.data));
    }
}

function* getPackageById({payload: id}) {
    try {
        const {data} = yield axiosApi.get(`/packages/${id}`);
        yield put(getPackageByIdSuccess(data));
    } catch (e) {
        yield put(getPackageByIdFailure(e.response.data));
    }
}

function* packageChangeSagas({payload: packageData}) {
    const state = yield select();
    const role = state.users.user.role;
    try {
        yield axiosApi.put(`/packages/${packageData.packageId}`, packageData.editPackage);
        yield put(changePackageSuccess());
        toast.success('Ваш заказ был успешно отредактирован');
        if ((role==='admin') || (role === 'superAdmin')){
            History.push(adminPagePath);
        }else{
            History.push(userPage);
        }
    } catch (e) {
        yield put(changePackageFailure(e.response.data));
    }
}

function* adminPackageEditSaga({payload: id}) {
    try {
        const response = yield axiosApi.get(`/packages/${id}`);
        yield put(fetchPackageAdminSuccess(response.data));
    } catch (e) {
        yield put(fetchPackageAdminFailure(e.response.data));
    }
}

function* packageEditAdminSagas({payload}) {
    try {
        yield axiosApi.put(`/packages/` + payload.id, payload.obj);
        yield put(editAdminPackageSuccess());
        toast.success('Заказ был успешно отредактирован');
        History.push(adminPagePath);
    } catch (e) {
        yield put(editAdminPackageFailure(e.response.data));
    }
}

function* getOrdersHistorySagas({payload: pageData}) {
    const page = pageData.page;
    const limit = pageData.limit;
    const id = pageData.id;
    const history = pageData.history;
    const from = pageData.from;
    const to = pageData.to;
    const packageFind = pageData.packageFind;
    let url = `/packages?page=${page}&limit=${limit}`;

    if (id) url = url.concat(`&id=${id}`);
    if (history) url = url.concat(`&history=${true}`);
    if (from) url = url.concat(`&from=${from}`);
    if (to) url = url.concat(`&to=${to}`);
    if (packageFind) url = url.concat(`&packageFind=${packageFind}`);

    try {
        const response = yield axiosApi.get(url);

        yield put(getOrdersHistorySuccess(response.data));
    } catch (error) {
        yield put(getOrdersHistoryError(error.response.statusText || error.message));
        toast.error(error.response.statusText || error.message, {
            autoClose: 5000,
        });
    }
}

function* getOrderById({payload: orderId}) {
    try {
        const response = yield axiosApi.get(`/packages/${orderId}`);
        yield put(getOrderByIdSuccess(response.data));
    } catch (error) {
        yield put(getOrderByIdError(error.response.data));
        toast.error(error.response.statusText || error.message, {
            autoClose: 5000,
        });
    }
}

function* changeStatuses({payload: packageData}) {
    const state = yield select();
    const role = state.users.user.role;
    try {
        const response = yield axiosApi.put('/packages', packageData);
        yield put(changeStatusesSuccess());
        if (!response.data.length) {
            toast.success(response.data.message);
            if ((role==='admin') || (role === 'superAdmin')){
                History.push(adminPagePath);
            }else{
                History.push(userPage);
            }
        }
    } catch (error) {
        if (error.response.data && error.response.data.length > 0) {
            toast.error('Некоторые трек-номера не были найдены в базе', {
                autoClose: 5000,
            });
        }
        yield put(changeStatusesError(error.response.data));
    }
}

function* changeDeliveryStatus({payload: data}) {
    try {
        yield axiosApi.put('/packages/packageDelivery', data);
        yield put(changeDeliveryStatusSuccess());
        toast.success('Статус доставки изменён');
    } catch (error) {
        toast.error('не удалось сменить статус доставки');
        yield put(changeDeliveryStatusError(error.response.data));
    }
}

export function* fetchNewPackagesSaga() {
    try {
        const {data} = yield axiosApi.get('/packages/newPackages');
        yield put(fetchNewPackagesSuccess(data));
    } catch (e) {
        yield put(fetchNewPackagesFailure(e));
    }
}

export function* giveOutSagas({payload}) {
    try {
        yield axiosApi.put(`/packages/giveout/${payload.id}`, payload.data);
        yield put(giveOutSuccess());
    } catch (e) {
        yield put(giveOutFailure(e));
    }
}

const packageSagas = [
    takeEvery(createPackageRequest, packageRegisterSagas),
    takeEvery(changePackageRequest, packageChangeSagas),
    takeEvery(getPackageByIdRequest, getPackageById),
    takeEvery(fetchPackageAdminRequest, adminPackageEditSaga),
    takeEvery(editAdminPackageRequest, packageEditAdminSagas),
    takeEvery(getOrdersHistoryRequest, getOrdersHistorySagas),
    takeEvery(getOrderByIdRequest, getOrderById),
    takeEvery(changeStatusesRequest, changeStatuses),
    takeEvery(fetchNewPackages, fetchNewPackagesSaga),
    takeEvery(changeDeliveryStatusRequest, changeDeliveryStatus),
    takeEvery(giveOutRequest, giveOutSagas)
];

export default packageSagas;