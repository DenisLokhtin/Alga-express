import {createSlice} from "@reduxjs/toolkit";

const name = 'player';

const initialState = {
    player: [],
    onePlayer: {},
    singleLoading: false,
    fetchLoading: false,
    addLoading: false,
    playerError: null,
}

const playerSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchPlayerRequest(state) {
            state.fetchLoading = true;
        },
        fetchPlayerSuccess(state, action) {
            state.player = action.payload;
            state.fetchLoading = false;
        },
        fetchPlayerFailure(state) {
            state.fetchLoading = false;
        },
        addPlayerRequest(state) {
            state.addLoading = true;
        },
        addPlayerSuccess(state) {
            state.addLoading = false;
            state.addError = null;
        },
        addPlayerFailure(state, action) {
            state.addLoading = false;
            state.addError = action.payload;
        },
        fetchOnePlayerRequest(state) {
            state.singleLoading = true;
        },
        fetchOnePlayerSuccess(state, action) {
            state.onePlayer = action.payload;
            state.singleLoading = false;
        },
        fetchOnePlayerFailure(state) {
            state.singleLoading = false;
        },
        clearPlayerErrors(state) {
            state.addError = null;
        },
        changePlayerRequest(state) {
            state.singleLoading = true;
        },
        changePlayerSuccess(state) {
            state.singleLoading = false;
        },
        changePlayerFailure(state, {payload: error}) {
            state.singleLoading = false;
            state.addError = error;
        },
        deletePlayerRequest(state) {
            state.deleteLoading = true;
        },
        deletePlayerSuccess(state, {payload: playerId}) {
            state.deleteLoading = false;
            state.deleteError = null;
            state.player = state.player.filter(player => player._id !== playerId);
        },
        deletePlayerFailure(state, action) {
            state.deleteLoading = false;
            state.deleteError = action.payload;
        },
        editPlayerRequest(state) {
            state.singleLoading = true;
        },
        editPlayerSuccess(state) {
            state.singleLoading = false;
        },
        editPlayerFailure(state, {payload: error}) {
            state.singleLoading = false;
            state.addError = error;
        },
    }
});

export default playerSlice;