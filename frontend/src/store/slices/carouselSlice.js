import {createSlice} from "@reduxjs/toolkit";

const name = 'carousels';
const initialState = {
    carousels: [],
    oneCarousel:{},
    carouselsLoading: false,
    carouselsError: null,
}

const carouselsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchCarouselsRequest(state) {
            state.carouselsLoading = true;
        },
        fetchCarouselsSuccess(state, action) {
            state.carousels = action.payload;
            state.carouselsLoading = false;
        },
        fetchCarouselsFailure(state) {
            state.carouselsLoading = false;
        },
        addCarouselsRequest(state){
            state.carouselsLoading = true;
        },
        addCarouselsSuccess(state) {
            state.carouselsLoading = false;
            state.carouselsError = null;
        },
        addCarouselsFailure(state,action ){
            state.carouselsLoading = false;
            state.carouselsError = action.payload;
        },
        fetchOneCarouselsRequest(state) {
            state.carouselsLoading = true;
        },
        fetchOneCarouselsSuccess(state, action) {
            state.oneCarousel = action.payload;
            state.carouselsLoading = false;
        },
        fetchOneCarouselsFailure(state) {
            state.carouselsLoading = false;
        },
        clearCarouselsErrors(state) {
            state.carouselsError = null;
        },
        changeCarouselsRequest(state) {
            state.carouselsLoading = true;
        },

        changeCarouselsSuccess(state) {
            state.carouselsLoading = false;
        },

        changeCarouselsFailure(state, {payload: error}) {
            state.carouselsLoading = false;
            state.carouselsError = error;
        },
        deleteCarouselsRequest(state){
            state.carouselsLoading = true;
        },
        deleteCarouselsSuccess(state, {payload: carouselsId}) {
            state.carouselsLoading = false;
            state.carouselsError = null;
            state.carousels = state.carousels.filter(carousels => carousels._id !== carouselsId);
        },
        deleteCarouselsFailure(state,action ){
            state.carouselsLoading = false;
            state.carouselsError = action.payload;
        },
    }
});

export default carouselsSlice;