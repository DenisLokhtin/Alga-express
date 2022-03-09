import {takeEvery, put} from 'redux-saga/effects';
import {
    changePackageFailure,
    changePackageRequest,
    changePackageSuccess,
    createPackageFailure,
    createPackageRequest,
    editAdminPackageRequest,
    editAdminPackageSuccess,
    fetchPackageAdminFailure,
    fetchPackageAdminRequest,
    fetchPackageAdminSuccess,
    getPackageByIdFailure,
    getPackageByIdRequest,
    getPackageByIdSuccess,
    createPackageSuccess,
    getOrderByIdError,
    getOrderByIdRequest,
    getOrderByIdSuccess,
    getOrdersHistoryError,
    getOrdersHistoryRequest,
    getOrdersHistorySuccess,
    changeStatusesError,
    changeStatusesSuccess,
    changeStatusesRequest,
    changeStatusSuccess,
    changeDeliveryStatusRequest,
    changeDeliveryStatusSuccess,
    changeDeliveryStatusError,
    changeStatusError, changeStatusRequest,
    // fetchNewPackagesSuccess, fetchNewPackagesFailure, fetchNewPackages,
    fetchNewPackagesSuccess, fetchNewPackagesFailure, fetchNewPackages,
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

function* packageGetByIdSagas({payload: id}) {
    try {
        const {data} = yield axiosApi.get(`/packages/${id}`);
        yield put(getPackageByIdSuccess(data));
    } catch (e) {
        yield put(getPackageByIdFailure(e.response.data));
    }
}

function* packageChangeSagas({payload}) {
    try {
        yield axiosApi.put(`/packages/${payload._id}`, payload);
        yield put(changePackageSuccess());
        toast.success('Ваш заказ был успешно отредактирован');
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
    try {
        const response = yield axiosApi.get(`/packages?page=${pageData.page}&limit=${pageData.limit}`);
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

const packageSagas = [
    takeEvery(createPackageRequest, packageRegisterSagas),
    takeEvery(changePackageRequest, packageChangeSagas),
    takeEvery(getPackageByIdRequest, packageGetByIdSagas),
    takeEvery(fetchPackageAdminRequest, adminPackageEditSaga),
    takeEvery(editAdminPackageRequest, packageEditAdminSagas),
    takeEvery(getOrdersHistoryRequest, getOrdersHistorySagas),
    takeEvery(getOrderByIdRequest, getOrderById),
    takeEvery(changeStatusesRequest, changeStatuses),
    takeEvery(fetchNewPackages, fetchNewPackagesSaga)
    takeEvery(changeStatusRequest, changeSingleStatus),
    takeEvery(changeDeliveryStatusRequest, changeDeliveryStatus),
];

export default packageSagas;