import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import store from "./store/configureStore";

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
            <ToastContainer/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
