import packageSlice from "../slices/packageRegisterSlice";

export const {
    createPackageRequest,
    createPackageSuccess,
    createPackageFailure,
    getOrdersHistoryRequest,
    getOrdersHistorySuccess,
    getOrdersHistoryError,
    getOrderByIdRequest,
    getOrderByIdSuccess,
    getOrderByIdError,
    getPackageByIdRequest,
    getPackageByIdSuccess,
    getPackageByIdFailure,
    changePackageRequest,
    changePackageSuccess,
    changePackageFailure,
    clearTextFieldsErrors,
    editAdminPackageRequest,
    editAdminPackageSuccess,
    editAdminPackageFailure,
    fetchPackageAdminRequest,
    fetchPackageAdminSuccess,
    fetchPackageAdminFailure,
    clearAdminErrors,
} = packageSlice.actions;