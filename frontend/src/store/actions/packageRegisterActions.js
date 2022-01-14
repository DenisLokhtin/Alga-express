import packageSlice from "../slices/packageRegisterSlice";

export const {
    createPackageRequest,
    createPackageSuccess,
    createPackageFailure,
    clearTextFieldsErrors,
} = packageSlice.actions;