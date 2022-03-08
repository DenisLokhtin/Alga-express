import playerSlice from "../slices/playerSlice";

export const {
    fetchPlayerRequest,
    fetchPlayerSuccess,
    fetchPlayerFailure,
    addPlayerRequest,
    addPlayerSuccess,
    addPlayerFailure,
    fetchOnePlayerRequest,
    fetchOnePlayerSuccess,
    fetchOnePlayerFailure,
    changePlayerRequest,
    changePlayerSuccess,
    changePlayerFailure,
    deletePlayerRequest,
    deletePlayerSuccess,
    deletePlayerFailure,
} = playerSlice.actions;