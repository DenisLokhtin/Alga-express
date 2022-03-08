import React, {useEffect, useRef} from 'react';
import {Container, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrencies} from "../../store/actions/currenciesActions";
import CurrenciesCard from "../../components/CurrenciesCard/CurrenciesCard";
import NewPackagesDataGrid from "../../components/DataGrids/NewPackagesDataGrid/NewPackagesDataGrid";

const AdminPage = () => {
    const dispatch = useDispatch();
    const currencies = useSelector(state => state.currencies.currencies);
    // const buyouts = useSelector(state => state.buyouts.buyouts);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }
        dispatch(fetchCurrencies());
    }, [dispatch, messagesEndRef]);

    return (
        <Container ref={messagesEndRef}>
            <Grid container sx={{paddingY: "20px"}} spacing={2}>
                <Grid item xs={12} md={12} lg={12} sx={{height: 500}}>
                    <NewPackagesDataGrid/>
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