import React, {useEffect} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrencies} from "../../store/actions/currenciesActions";
import CurrenciesCard from "../../components/CurrenciesCard/CurrenciesCard";
import {fetchNewPackages} from "../../store/actions/packageRegisterActions";

const AdminPage = () => {
    const dispatch = useDispatch();
    const currencies = useSelector(state => state.currencies.currencies);
    const newPackages = useSelector(state => state.package.orders);

    useEffect(() => {
        dispatch(fetchCurrencies());
        dispatch(fetchNewPackages());
    }, [dispatch]);

    console.log(newPackages);

    return (
        <Container>
            <Grid container sx={{paddingTop: "50px"}} spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper>

                    </Paper>
                </Grid>

                {currencies.length !== 0 &&
                    <Grid item xs={12} md={3} lg={3}>
                        <CurrenciesCard currency={currencies[0]}/>
                    </Grid>}

                <Grid item></Grid>
            </Grid>
        </Container>
    );
};

export default AdminPage;