import React from 'react';
import {Box, CssBaseline, Grid} from "@mui/material";
import AppToolbar from "../Toolbar/AppToolbar";
import Footer from "../Footer/Footer";
import AppSidebar from "../AppSidebar/AppSidebar";

const styles = {
    main: {
        overflow: "scroll",
        height: "100%",
        position: "absolute",
        left: "300px",
        top: "0"
    },
    content: {
        minHeight: "calc(100% - 30px)"
    }
}

const Layout = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <AppToolbar/>
            <AppSidebar/>
            <Box sx={styles.main}>
                <Box sx={styles.content}>
                    {children}
                </Box>
                <Footer/>
            </Box>

        </>
    );
};

export default Layout;