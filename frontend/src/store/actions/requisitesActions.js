import requisitesSlice from "../slices/requisitesSlice";

export const {
    fetchRequisitesRequest,
    fetchRequisitesSuccess,
    fetchRequisitesFailure,
    fetchOneRequisitesRequest,
    fetchOneRequisitesSuccess,
    deleteRequisitesRequest,
    deleteRequisitesSuccess,
    deleteRequisitesFailure,
    addRequisitesRequest,
    addRequisitesSuccess,
    addRequisitesFailure,
    changeRequisitesRequest,
    changeRequisitesSuccess,
    changeRequisitesFailure
} = requisitesSlice.actions;