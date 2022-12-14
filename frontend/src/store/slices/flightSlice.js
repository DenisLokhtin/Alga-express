import {createSlice} from "@reduxjs/toolkit";

const name = 'flight';

const flightSlice = createSlice({
    name,
    initialState: {
        flights: [],
        error: null,
        loading: false,
        flightsCount: 0
    },
    reducers: {
        postFlightRequest(state) {
            state.loading = true;
        },
        postFlightSuccess(state) {
            state.loading = false;
        },
        postFlightFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getFlightsRequest(state) {
            state.loading = true;
        },
        getFlightsSuccess(state, action) {
            state.loading = false;
            state.flights = action.payload.data;
            state.flightsCount = action.payload.totalElements;
        },
        getFlightsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        putFlightRequest(state) {
            state.loading = true;
        },
        putFlightSuccess(state, action) {
            state.loading = false;
            state.flights = action.payload.data;
            state.flightsCount = action.payload.totalElements;
        },
        putFlightFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearFlightsError(state) {
            state.error = null;
        }

    }
});

export default flightSlice;