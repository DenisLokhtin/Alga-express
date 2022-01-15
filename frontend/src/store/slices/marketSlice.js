import {createSlice} from "@reduxjs/toolkit";

const name = 'market'

const marketSlice = createSlice({
    name,
    initialState: {
        sites: [],
        fetchLoading: false,
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
        }
    }
});

export default marketSlice;