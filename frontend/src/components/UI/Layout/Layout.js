import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "../Toolbar/AppToolbar";

const Layout = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <AppToolbar/>
            <main>
                <Container>
                    {children}
                </Container>
            </main>
        </>
    );
};

export default Layout;