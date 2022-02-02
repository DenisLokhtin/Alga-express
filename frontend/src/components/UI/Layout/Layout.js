import React from 'react';
import {CssBaseline} from "@mui/material";
import AppToolbar from "../Toolbar/AppToolbar";
import Footer from "../Footer/Footer";
import "./Layout.css";

const Layout = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <AppToolbar/>
            <main style={{minHeight: "calc(100vh - 100px)"}}>
                {children}
            </main>
            <Footer/>
        </>
    );
};

export default Layout;