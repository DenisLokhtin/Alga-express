import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTariffsRequest} from "../../store/actions/tariffActions";
import {Grid, List, ListItem, ListItemText} from "@mui/material";

const TariffsPage = () => {
    const dispatch = useDispatch();
    const tariff = useSelector(state => state.tariffs.tariffs);
    const user = useSelector(state => state.users.user);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        dispatch(fetchTariffsRequest());
    }, [dispatch, messagesEndRef]);

    const shownTariff = [];

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
        <Grid ref={messagesEndRef}>
            {shownTariff.length !== 0 && shownTariff.map((t,i) => (
                <List key={i} sx={{width: 150}}>
                    <ListItem divider disablePadding>
                        <ListItemText>
                            США <b>{t.usa} $</b>
                        </ListItemText>
                    </ListItem>

                    <ListItem divider disablePadding>
                        <ListItemText>
                            Китай(авиа) <b>{t.china} $</b>
                        </ListItemText>
                    </ListItem>

                    <ListItem divider disablePadding>
                        <ListItemText>
                            Китай <b>{t.chinaGround} $</b>
                        </ListItemText>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemText>
                            Турция <b>{t.turkey} $</b>
                        </ListItemText>
                    </ListItem>
                </List>
            ))}
        </Grid>
    );
}

export default TariffsPage;