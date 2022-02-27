import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTariffsRequest} from "../../store/actions/tariffActions";
import {Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";



const useStyles = makeStyles(()=> ({
    box:{
        width: "40%",
        padding: '15px',
        border: "3px solid #ddd2d2"
    }
}));


const TariffsPage = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const tariff = useSelector(state => state.tariffs.tariffs);
    const user = useSelector(state => state.users.user);
    console.log(tariff)


    useEffect(() => {
        dispatch(fetchTariffsRequest());
    }, [dispatch])

    const shownTariff = []

    if (tariff && tariff.length !==0) {
        const obj = tariff[0];
        const keys = Object.keys(obj);
        keys.forEach(key => {
            if (key === 'new') {
                return shownTariff.push(obj[key]);
            } else if (key === 'buyers' && user?.group === 'BUYERS') {
                return shownTariff.push(obj[key]);
            } else if (key === 'advanced' && user?.group === 'ADVANCED') {
                return shownTariff.push(obj[key]);
            }
        });
    }

    return (
        <Grid>
            <h3>Ваш тариф</h3>
            {shownTariff.length !== 0 && shownTariff.map((t,i) => (
                <Grid item key={i} className={classes.box}>
                        <p>США <b>{t.usa} $</b></p>
                        <p>Китай(авиа) <b>{t.china} $</b></p>
                        <p>Китай <b>{t.chinaGround} $</b></p>
                        <p>Турция <b>{t.turkey} $</b></p>
                </Grid>
            ))}
        </Grid>
    );
}

export default TariffsPage;