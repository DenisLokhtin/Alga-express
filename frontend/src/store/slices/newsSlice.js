import {createSlice} from "@reduxjs/toolkit";

const name = 'news'
const initialState = {
    news: [],
    oneNews:{},
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
        clearNewsErrors(state) {
            state.addError = null;
        },
        changeNewsRequest(state) {
            state.singleLoading = true;
        },

        changeNewsSuccess(state) {
            state.singleLoading = false;
        },

        changeNewsFailure(state, {payload: error}) {
            state.singleLoading = false;
            state.addError = error;
        },
        deleteNewsRequest(state){
            state.deleteLoading = true;
        },
        deleteNewsSuccess(state, {payload: newsId}) {
            state.deleteLoading = false;
            state.deleteError = null;
            state.news = state.news.filter(news => news._id !== newsId);
        },
        deleteNewsFailure(state,action ){
            state.deleteLoading = false;
            state.deleteError = action.payload;
        },
    }
});

export default newsSlice;