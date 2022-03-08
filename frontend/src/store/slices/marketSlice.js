import {createSlice} from "@reduxjs/toolkit";

const name = 'market'

const marketSlice = createSlice({
    name,
    initialState: {
        sites: [],
        fetchLoading: false,
        createLoading: false,
        createError: null,
        deleteLoading: false,
        deleteError:null,
    },
    reducers: {
        fetchMarketRequest(state) {
            state.fetchLoading = true;
        },
        fetchMarketSuccess(state, {payload: sites}) {
            state.sites = sites;
            state.fetchLoading = false;
        },
        fetchMarketFailure(state) {
            state.fetchLoading = false;
        },
        addMarketRequest(state){
            state.createLoading = true;
        },
        addMarketSuccess(state) {
            state.createLoading = false;
            state.createError = null;
        },
        addMarketFailure(state,action ){
            state.createLoading = false;
            state.createError = action.payload;
        },
        deleteMarketRequest(state){
            state.deleteLoading = true;
        },
        deleteMarketSuccess(state,{payload:id}){
            state.deleteLoading = false;
            state.deleteError =null;
            state.sites = state.sites.filter(site=>site._id!==id);
        },
        deleteMarketFailure(state,{payload:error}){
            state.deleteLoading = false;
            state.deleteError = error;
        }
    }
});

export default marketSlice;