import React from 'react';
import {CssBaseline, Grid} from "@mui/material";
import AppToolbar from "../Toolbar/AppToolbar";
import Footer from "../Footer/Footer";
import AppSidebar from "../AppSidebar/AppSidebar";

const styles = {
    appToolbar: {
        display: {
            md: "none",
            xs: "block"
        },
    },
    appSidebar: {
        display: {
            xs: "none",
            md: "block"
        },
        height: "100vh",
        overflow: "scroll",
        background: "grey",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
    },
    main: {
        overflow: "scroll",
        height: "100vh",
    },
    container: {
        flexDirection: {
            md: "row",
            xs: "column"
        }
    },
    children: {
        minHeight: "calc(100vh - 30px)"
    }
}

const Layout = ({children}) => {
    return (
        <Grid container sx={styles.container}>
            <Grid item xs={12} sx={styles.appToolbar}>
                <CssBaseline/>
                <AppToolbar/>
            </Grid>
            <Grid item md={3} sx={styles.appSidebar}>
                <CssBaseline/>
                <AppSidebar/>
            </Grid>
            <Grid item md={9} xs={12} sx={styles.main}>
                <Grid container flexDirection="column">
                    <Grid item sx={styles.children}>
                        {children}
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Footer/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Layout;