import React from 'react';
import {CssBaseline} from "@mui/material";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <Header/>
            <div style={{display: 'flex', minHeight: '100vh', flexDirection: 'column'}}>
                <div style={{flex: '1 1 auto'}}>
                    {children}
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default Layout;