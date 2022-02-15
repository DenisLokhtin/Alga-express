import React from 'react';
import {Box, CssBaseline} from "@mui/material";
import AppToolbar from "../Toolbar/AppToolbar";
import Footer from "../Footer/Footer";
import AppSidebar from "../AppSidebar/AppSidebar";

const styles = {
    main: {
        overflowY: "scroll",
        height: "100%",
        position: "absolute",
        left: {md: "300px", xs: "0"},
        top: {md: "0", xs: "56px"},
        width: {md : "calc(100% - 300px)", xs: "100%"}
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