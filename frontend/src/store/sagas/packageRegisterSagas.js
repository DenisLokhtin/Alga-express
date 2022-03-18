import {put, takeEvery} from 'redux-saga/effects';
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
    createPackageSuccess,
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
    getPackageByIdSuccess, giveOutFailure, giveOutRequest, giveOutSuccess,
} from "../actions/packageRegisterActions";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import History from '../../History';

function* packageRegisterSagas({payload: packageData}) {
    try {
        yield axiosApi.post('/packages', packageData);
        yield put(createPackageSuccess());
        History.push('/');
        toast.success('Ваш заказ был успешно создан');
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
    try {
        yield axiosApi.put(`/packages/${packageData.packageId}`, packageData.editPackage);
        yield put(changePackageSuccess());
        toast.success('Ваш заказ был успешно отредактирован');
        History.push('/package/history')
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
    } catch (e) {
        yield put(changePackageFailure(e.response.data));
    }
}

function* getOrdersHistorySagas({payload: pageData}) {
    let response;
    const page = pageData.page;
    const limit = pageData.limit;
    const id = pageData.id;
    const history = pageData.history;

    try {
        if (id) {
            if (history) {
                response = yield axiosApi.get(`/packages?page=${page}&limit=${limit}&history=${true}&id=${id}`);
            } else {
                response = yield axiosApi.get(`/packages?page=${page}&limit=${limit}&id=${id}`);
            }
        } else {
            if (history) {
                response = yield axiosApi.get(`/packages?page=${page}&limit=${limit}&history=${true}`);
            } else {
                response = yield axiosApi.get(`/packages?page=${page}&limit=${limit}`);
            }
        }
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
    try {
        const response = yield axiosApi.put('/packages', packageData);
        yield put(changeStatusesSuccess());
        if (!response.data.length) {
            toast.success(response.data.message);
            History.push('/')
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


// export function* fetchNewPackagesSaga() {
//     try {
//         const {data} = yield axiosApi.get('/packages/newPackages');
//         yield put(fetchNewPackagesSuccess(data));
//     } catch (e) {
//         yield put(fetchNewPackagesFailure(e));
//     }
// }


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
        const {data} = yield axiosApi.put(`/packages/giveout/${payload.id}`, payload.data);
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