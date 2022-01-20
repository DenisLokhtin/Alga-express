import packageSlice from "../slices/packageRegisterSlice";

export const {
    createPackageRequest,
    createPackageSuccess,
    createPackageFailure,
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