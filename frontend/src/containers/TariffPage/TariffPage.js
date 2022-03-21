import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, List, ListItem, ListItemText} from "@mui/material";
import {fetchTariffsRequest} from "../../store/actions/tariffActions";

const TariffsPage = () => {
    const dispatch = useDispatch();
    const tariff = useSelector(state => state.tariffs.tariffs);
    const user = useSelector(state => state.users.user);
    const messagesEndRef = useRef(null);
    const [showTariff, setShowTariff] = useState({
        usa: '',
        turkey: '',
        turkeyGround: '',
        china: '',
        chinaGround: ''
    });

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        dispatch(fetchTariffsRequest());
    }, [dispatch, messagesEndRef]);

    useEffect(() => {
        tariff && tariff.forEach(key => {
            if (key.name.toUpperCase() === user.group) {
                setShowTariff(prevState => ({
                    ...prevState,
                    usa: key.usa,
                    turkey: key.turkey,
                    turkeyGround: key.turkeyGround,
                    china: key.china,
                    chinaGround: key.chinaGround,
                }));
            }
        })
    }, [tariff, user]);

    return (
        <Grid ref={messagesEndRef}>
            {showTariff && (
                <List sx={{width: 150}}>
                    <ListItem divider disablePadding>
                        <ListItemText>
                            США <b>{showTariff.usa} $</b>
                        </ListItemText>
                    </ListItem>

                    <ListItem divider disablePadding>
                        <ListItemText>
                            Китай(авиа) <b>{showTariff.china} $</b>
                        </ListItemText>
                    </ListItem>

                    <ListItem divider disablePadding>
                        <ListItemText>
                            Китай <b>{showTariff.chinaGround} $</b>
                        </ListItemText>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemText>
                            Турция(авиа) <b>{showTariff.turkey} $</b>
                        </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText>
                            Турция <b>{showTariff.turkeyGround} $</b>
                        </ListItemText>
                    </ListItem>
                </List>
            )}
        </Grid>
    );
}

export default TariffsPage;