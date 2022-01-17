import {createSlice} from "@reduxjs/toolkit";

const name = 'market'

const marketSlice = createSlice({
    name,
    initialState: {
        sites: [],
        fetchLoading: false,
        createLoading: false,
        createError: null,
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
        }
    }
});

export default marketSlice;