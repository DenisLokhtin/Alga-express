import React from 'react';
import {Container, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {listBuyouts, tariffs, userPackageHistory} from "../../paths";
import {makeStyles} from "@mui/styles";



const useStyles = makeStyles(()=> ({
    box:{
        width: "30%",
        padding: '15px',
        border: "1px solid grey"
    }
}));


const UserPage = () => {
    const classes = useStyles();
    return (
        <Container>
            <h2>Личная страница пользователя</h2>
            <Grid container justifyContent={"space-evenly"}>
                <Grid item className={classes.box}>
                    <Link to={listBuyouts}>Мои заказы</Link>
                </Grid>
                <Grid item className={classes.box}>
                    <Link to={userPackageHistory}>Мои посылки</Link>
                </Grid>
                <Grid item className={classes.box}>
                    <Link to={tariffs}>Мой тариф</Link>
                </Grid>
            </Grid>

        </Container>
    );
};

export default UserPage;