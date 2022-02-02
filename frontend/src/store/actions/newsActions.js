import newsSlice from "../slices/newsSlice";

export const {
    fetchNewsRequest,
    fetchNewsSuccess,
    fetchNewsFailure,
    addNewsRequest,
    addNewsSuccess,
    addNewsFailure,
    fetchOneNewsRequest,
    fetchOneNewsSuccess,
    fetchOneNewsFailure,
    changeNewsRequest,
    changeNewsSuccess,
    changeNewsFailure,
    deleteNewsRequest,
    deleteNewsSuccess,
    deleteNewsFailure,
    clearNewsErrors,
} = newsSlice.actions;