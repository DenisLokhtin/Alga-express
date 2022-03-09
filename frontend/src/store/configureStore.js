import {combineReducers} from "redux";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";
import createSagaMiddleware from 'redux-saga';
import {rootSagas} from "./rootSagas";
import {configureStore} from "@reduxjs/toolkit";
import packageSlice from "./slices/packageRegisterSlice";
import usersSlice, {initialState} from "./slices/usersSlice";
import newsSlice from "./slices/newsSlice";
import marketSlice from "./slices/marketSlice";
import flightSlice from "./slices/flightSlice";
import buyoutSlice from "./slices/buyoutSlice";
import paymentSlice from "./slices/paymentSlices";
import wareHouseSlice from "./slices/wareHouseSlice";
import pagesSlice from "./slices/pagesSlice";
import requisitesSlice from "./slices/requisitesSlice";
import tariffSlice from "./slices/tariffSlice";
import currenciesSlice from "./slices/currenciesSlice";
import deliverySlice from "./slices/deliverySlice";

const rootReducer = combineReducers({
    'users': usersSlice.reducer,
    'market': marketSlice.reducer,
    'package': packageSlice.reducer,
    'news':newsSlice.reducer,
    'flights': flightSlice.reducer,
    'buyouts':buyoutSlice.reducer,
    'payments': paymentSlice.reducer,
    'wareHouses': wareHouseSlice.reducer,
    'pages': pagesSlice.reducer,
    'requisites': requisitesSlice.reducer,
    'tariffs':tariffSlice.reducer,
    'currencies': currenciesSlice.reducer,
    'delivery': deliverySlice.reducer,
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
        config.headers['Authorization'] = store.getState().users.user.token;
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