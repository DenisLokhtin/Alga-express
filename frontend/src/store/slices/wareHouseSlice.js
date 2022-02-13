import {createSlice} from "@reduxjs/toolkit";

const name = 'wareHouse';

const initialState = {
    wareHouse: [],
    oneWareHouse:{},
    singleLoading: false,
    fetchLoading: false,
    addLoading: false,
    addError: null,
}

const wareHouseSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchWareHouseRequest(state) {
            state.fetchLoading = true;
        },
        fetchWareHouseSuccess(state, action) {
            state.wareHouse = action.payload;
            state.fetchLoading = false;
        },
        fetchWareHouseFailure(state) {
            state.fetchLoading = false;
        },
        addWareHouseRequest(state){
            state.addLoading = true;
        },
        addWareHouseSuccess(state) {
            state.addLoading = false;
            state.addError = null;
        },
        addWareHouseFailure(state,action ){
            state.addLoading = false;
            state.addError = action.payload;
        },
        fetchOneWareHouseRequest(state) {
            state.singleLoading = true;
        },
        fetchOneWareHouseSuccess(state, action) {
            state.oneWareHouse = action.payload;
            state.singleLoading = false;
        },
        fetchOneWareHouseFailure(state) {
            state.singleLoading = false;
        },
        clearWareHouseErrors(state) {
            state.addError = null;
        },
        changeWareHouseRequest(state) {
            state.singleLoading = true;
        },

        changeWareHouseSuccess(state) {
            state.singleLoading = false;
        },

        changeWareHouseFailure(state, {payload: error}) {
            state.singleLoading = false;
            state.addError = error;
        },
        deleteWareHouseRequest(state){
            state.deleteLoading = true;
        },
        deleteWareHouseSuccess(state, {payload: wareHouseId}) {
            state.deleteLoading = false;
            state.deleteError = null;
            state.wareHouse = state.wareHouse.filter(wareHouse => wareHouse._id !== wareHouseId);
        },
        deleteWareHouseFailure(state,action ){
            state.deleteLoading = false;
            state.deleteError = action.payload;
        },
        editWareHouseRequest(state) {
            state.singleLoading = true;
        },

        editWareHouseSuccess(state) {
            state.singleLoading = false;
        },

        editWareHouseFailure(state, {payload: error}) {
            state.singleLoading = false;
            state.addError = error;
        },
    }
});

export default wareHouseSlice;