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
} = packageSlice.actions;