import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import App from './App';
import store from "./store/configureStore";
import theme from "./theme";
import {MuiThemeProvider} from "@material-ui/core";

import 'react-toastify/dist/ReactToastify.css';

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <ToastContainer/>
                <App/>
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));