import {createSlice} from "@reduxjs/toolkit";

const name = 'news'
const initialState = {
    news: [],
    oneNews:null,
    singleLoading: false,
    fetchLoading: false,
    addLoading: false,
    addError: null,
}

const newsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchNewsRequest(state) {
            state.fetchLoading = true;
        },
        fetchNewsSuccess(state, action) {
            state.news = action.payload;
            state.fetchLoading = false;
        },
        fetchNewsFailure(state) {
            state.fetchLoading = false;
        },
        addNewsRequest(state){
            state.addLoading = true;
        },
        addNewsSuccess(state) {
            state.addLoading = false;
            state.addError = null;
        },
        addNewsFailure(state,action ){
            state.addLoading = false;
            state.addError = action.payload;
        },
        fetchOneNewsRequest(state) {
            state.singleLoading = true;
        },
        fetchOneNewsSuccess(state, action) {
            state.oneNews = action.payload;
            state.singleLoading = false;
        },
        fetchOneNewsFailure(state) {
            state.singleLoading = false;
        },

    }
});

export default newsSlice;