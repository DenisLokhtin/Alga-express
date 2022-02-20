import pagesSlice from "../slices/pagesSlice";

export const {
    fetchPagesRequest,
    fetchPagesSuccess,
    fetchPagesFailure,
    changePagesRequest,
    changePagesSuccess,
    changePagesFailure
} = pagesSlice.actions;