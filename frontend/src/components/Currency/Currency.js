import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrencies} from "../../store/actions/currenciesActions";
import ReactCountryFlag from "react-country-flag"
import {Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles(()=> ({
    box:{
        border: "3px solid #870d6c",
        maxWidth: "50%",
        padding: '5px',
    },
    underline:{
        borderTop: "2px solid #e1bfd9",
        '& > span': {
            paddingLeft: '5px',
        }
    }
}));

const Currency = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currencies = useSelector(state => state.currencies.currencies);


    useEffect(() => {
        dispatch(fetchCurrencies())
    }, [dispatch])


    return (
        <Grid container direction={"column"} className={classes.box}>
            <h3>Курс валют</h3>
            {currencies && (
                <>
                        <Grid item className={classes.underline}>
                            <ReactCountryFlag
                                className="emojiFlag"
                                countryCode="US"
                                style={{
                                    fontSize: '3em',
                                }}
                                aria-label="United States"
                            />
                            <span>USD <b>{currencies?.usd}</b> COM</span>
                        </Grid>
                    <Grid item className={classes.underline}>
                            <ReactCountryFlag
                                className="emojiFlag"
                                countryCode="TR"
                                style={{
                                    fontSize: '3em',
                                }}
                                aria-label="Turkey"
                            />
                            <span>TRL <b>{currencies?.try}</b> COM</span>
                    </Grid>
                    <Grid item className={classes.underline}>
                            <ReactCountryFlag
                                className="emojiFlag"
                                countryCode="CN"
                                style={{
                                    fontSize: '3em',
                                }}
                                aria-label="China"
                            />
                            <span>CNY <b>{currencies?.cny}</b> COM</span>
                    </Grid>
                </>
            )}
        </Grid>


    )
}
export default Currency;