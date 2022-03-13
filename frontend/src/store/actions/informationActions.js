import pagesSlice from "../slices/informationSlice";

export const {
    fetchInformationRequest,
    fetchInformationSuccess,
    fetchInformationFailure,
    fetchAllInformationRequest,
    fetchAllInformationSuccess,
    fetchAllInformationFailure,
    changeInformationRequest,
    changeInformationSuccess,
    changeInformationFailure
} = pagesSlice.actions;