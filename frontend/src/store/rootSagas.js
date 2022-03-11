import {all} from 'redux-saga/effects';
import packageSagas from "./sagas/packageRegisterSagas";
import usersSagas from "./sagas/usersSagas";
import newsSaga from "./sagas/newsSagas";
import marketSaga from "./sagas/marketSagas";
import flightSagas from "./sagas/flightSagas";
import buyoutSagas from "./sagas/buyoutSagas";
import paymentSagas from "./sagas/paymentSagas";
import wareHouseSagas from "./sagas/wareHouseSagas";
import pagesSagas from "./sagas/pagesSagas";
import requisitesSagas from "./sagas/requisitesSagas";
import tariffSagas from "./sagas/tariffSagas";
import currenciesSagas from "./sagas/currenciesSagas";
import deliverySagas from "./sagas/deliverySagas";
import carouselsSagas from "./sagas/carouselsSagas";
import playerSaga from "./sagas/playerSagas";
import informationSaga from "./sagas/informationSagas";

export function* rootSagas() {
    yield all([
        ...packageSagas,
        ...usersSagas,
        ...newsSaga,
        ...marketSaga,
        ...flightSagas,
        ...paymentSagas,
        ...buyoutSagas,
        ...wareHouseSagas,
        ...pagesSagas,
        ...requisitesSagas,
        ...tariffSagas,
        ...currenciesSagas,
        ...deliverySagas,
        ...carouselsSagas,
        ...playerSaga,
        ...informationSaga,
    ]);
}