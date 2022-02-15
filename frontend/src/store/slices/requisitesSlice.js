import {createSlice} from "@reduxjs/toolkit";

const name = 'pages';
const initialState = {
    requisites: {},
    loading: false,
    addError: null,
};

const requisitesSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchRequisitesRequest(state) {
            state.loading = true;
        },
        fetchRequisitesSuccess(state, action) {
            state.requisites = action.payload;
            state.loading = false;
        },
        fetchRequisitesFailure(state) {
            state.loading = false;
        },
        clearRequisitesErrors(state) {
            state.addError = null;
        },
        changeRequisitesRequest(state) {
            state.loading = true;
        },
        changeRequisitesSuccess(state) {
            state.loading = false;
        },
        changeRequisitesFailure(state, {payload: error}) {
            state.loading = false;
            state.addError = error;
        },
    }
});

export default requisitesSlice;