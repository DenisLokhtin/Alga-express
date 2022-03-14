import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrencies} from "../../store/actions/currenciesActions";
import ReactCountryFlag from "react-country-flag"
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";

const Currency = () => {
    const dispatch = useDispatch();
    const currencies = useSelector(state => state.currencies.currencies);

    useEffect(() => {
        dispatch(fetchCurrencies())
    }, [dispatch])

    return (currencies && (
        <List sx={{width: 200}}>
            <ListItem divider disablePadding>
                <ListItemIcon>
                    <ReactCountryFlag
                        countryCode="US"
                        style={{
                            fontSize: '2em',
                        }}
                        aria-label="United States"
                    />
                </ListItemIcon>
                <ListItemText>
                    <b>{currencies?.usd}</b> Сом
                </ListItemText>
            </ListItem>

            <ListItem divider disablePadding>
                <ListItemIcon>
                    <ReactCountryFlag
                        countryCode="TR"
                        style={{
                            fontSize: '2em',
                        }}
                        aria-label="Turkey"
                    />
                </ListItemIcon>
                <ListItemText>
                    <b>{currencies?.try}</b> Сом
                </ListItemText>
            </ListItem>

            <ListItem disablePadding>
                <ListItemIcon>
                    <ReactCountryFlag
                        countryCode="CN"
                        style={{
                            fontSize: '2em',
                        }}
                        aria-label="China"
                    />
                </ListItemIcon>
                <ListItemText>
                    <b>{currencies?.cny}</b> Сом
                </ListItemText>
            </ListItem>
        </List>
        )
    )
}
export default Currency;