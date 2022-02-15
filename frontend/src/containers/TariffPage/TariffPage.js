import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTariffsRequest} from "../../store/actions/tariffActions";
import {Grid, Paper} from "@mui/material";


const TariffsPage = () => {
    const dispatch = useDispatch();
    const tariff = useSelector(state => state.tariffs.tariffs);
    const user = useSelector(state => state.users.user);


    useEffect(() => {
        dispatch(fetchTariffsRequest());
    }, [dispatch])

    const shownTariff = []


    if (tariff.length !==0) {
        const obj = tariff[0];
        const keys = Object.keys(obj);
        keys.forEach(key => {
            if (key === 'new' && user.group === 'NEW') {
                return shownTariff.push(obj[key]);
            } else if (key === 'buyers' && user.group === 'BUYERS') {
                return shownTariff.push(obj[key]);
            } else if (key === 'advanced' && user.group === 'ADVANCED') {
                return shownTariff.push(obj[key]);
            }
        });
    }

    return (
        <Grid container>
            <h3>Тарифы для вас</h3>
            {shownTariff.length !== 0 && shownTariff.map((t,i) => (
                <Grid item key={i} style={{marginTop:'50px'}}>
                    <Paper>
                        <p>США <b>{t.usa}</b></p>
                        <p>Китай(авиа) <b>{t.china}</b></p>
                        <p>Китай <b>{t.chinaGround}</b></p>
                        <p>Турция <b>{t.turkey}</b></p>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default TariffsPage;