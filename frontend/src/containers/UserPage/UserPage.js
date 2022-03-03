import React from 'react';
import {Container, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {packageHistory} from "../../paths";
import {listBuyouts, resetPassword} from "../../paths";
import {makeStyles} from "@mui/styles";
import TariffPage from "../TariffPage/TariffPage";
import Currency from "../../components/Currency/Currency";


const useStyles = makeStyles(()=> ({
    box:{
        width: "40%",
        padding: '15px',
        border: "3px solid #ddd2d2",
        '& > a': {
            textDecoration: "none",
            color: 'black',
        }
    },
}));


const UserPage = () => {
    const classes = useStyles();
    return (
        <Container>
            <h2>Личная страница пользователя</h2>
            <Currency/>
            <Grid container justifyContent={"space-between"}>
                <Grid item className={classes.box}>
                    <Link to={listBuyouts}>Мои заказы</Link>
                </Grid>
                <Grid item className={classes.box}>
                    <Link to={packageHistory}>Мои посылки</Link>
                </Grid>
                <Grid item className={classes.box}>
                    <Link to={resetPassword} >Сменить пароль</Link>
                </Grid>
            </Grid>
            <Grid>
                <TariffPage/>
            </Grid>
        </Container>
    );
};

export default UserPage;