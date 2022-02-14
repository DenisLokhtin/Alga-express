import {createSlice} from "@reduxjs/toolkit";

const name = 'pages';
const initialState = {
    page: {},
    loading: false,
    addError: null,
};

const pagesSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchPagesRequest(state) {
            state.loading = true;
        },
        fetchPagesSuccess(state, action) {
            state.page = action.payload[0];
            state.loading = false;
        },
        fetchPagesFailure(state) {
            state.loading = false;
        },
        clearPagesErrors(state) {
            state.addError = null;
        },
        changePagesRequest(state) {
            state.loading = true;
        },
        changePagesSuccess(state) {
            state.loading = false;
        },
        changePagesFailure(state, {payload: error}) {
            state.loading = false;
            state.addError = error;
        },
    }
});

export default pagesSlice;