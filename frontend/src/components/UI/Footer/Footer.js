import React from 'react';
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles({
    footer: {
        padding: "15px",
        background: "rgba(0,0,0,0.82)",
        color: "#F5F5F7"
    }
})

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Grid container>
                <Grid item xs={12} md={6} lg={4}>

                </Grid>
                <Grid item xs={12} md={6} lg={4}>

                </Grid>
                <Grid item xs={12} md={6} lg={4}>

                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;