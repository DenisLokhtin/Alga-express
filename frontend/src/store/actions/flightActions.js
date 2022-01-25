import flightSlice from "../slices/flightSlice";

export const {
    postFlightRequest,
    postFlightSuccess,
    postFlightFailure,
    getFlightsRequest,
    getFlightsSuccess,
    getFlightsFailure,
    putFlightRequest,
    putFlightSuccess,
    putFlightFailure,
} = flightSlice.actions;