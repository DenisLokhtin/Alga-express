import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    user: null,
};

const name = 'users';

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {

    },
});

export default usersSlice;