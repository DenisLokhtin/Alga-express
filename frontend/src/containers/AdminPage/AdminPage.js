import React, {useEffect} from 'react';
import {Container, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrencies} from "../../store/actions/currenciesActions";
import CurrenciesCard from "../../components/CurrenciesCard/CurrenciesCard";
import {fetchNewPackages} from "../../store/actions/packageRegisterActions";
import NewPackageFilter from "../../components/NewPackageFilter/NewPackageFilter";

const AdminPage = () => {
    const dispatch = useDispatch();
    const currencies = useSelector(state => state.currencies.currencies);
    const newPackages = useSelector(state => state.package.orders);

    useEffect(() => {
        dispatch(fetchCurrencies());
        dispatch(fetchNewPackages());
    }, [dispatch]);

    return (
        <Container>
            <Grid container sx={{paddingY: "20px"}} spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                    <NewPackageFilter newPackages={newPackages}/>
                </Grid>

                {currencies.length !== 0 &&
                    <Grid item xs={12} md={12} lg={12}>
                        <CurrenciesCard currency={currencies[0]}/>
                    </Grid>}
            </Grid>
        </Container>
    );
};

export default AdminPage;