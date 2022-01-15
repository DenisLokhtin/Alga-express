import {combineReducers} from "redux";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";
import createSagaMiddleware from 'redux-saga';
import {rootSagas} from "./rootSagas";
import {configureStore} from "@reduxjs/toolkit";
import packageSlice from "./slices/packageRegisterSlice";
import usersSlice, {initialState} from "./slices/usersSlice";

const rootReducer = combineReducers({
    'users': usersSlice.reducer,
    'package': packageSlice.reducer,
});

const persistedState = loadFromLocalStorage();

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true,
    preloadedState: persistedState
});

sagaMiddleware.run(rootSagas);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            ...initialState,
            user: store.getState().users.user
        },
    });
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.user.token
    } catch (e) {}

    return config;
});

axiosApi.interceptors.response.use(res => res, e => {
    if (!e.response) {
        e.response = {data: {global: 'No internet'}};
    }

    throw e;
});

export default store;