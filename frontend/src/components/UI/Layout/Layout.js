import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "../Toolbar/AppToolbar";
import Footer from "../Footer/Footer";
import "./Layout.css";

const Layout = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <AppToolbar/>
            <main style={{minHeight: "calc(100vh - 100px)"}}>
                <Container>
                    {children}
                </Container>
            </main>
            <Footer/>
        </>
    );
};

export default Layout;