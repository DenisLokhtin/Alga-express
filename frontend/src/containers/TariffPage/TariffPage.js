import React, {useEffect, useRef} from 'react';
import {Grid, List, ListItem, ListItemText} from "@mui/material";

const TariffsPage = ({tariff}) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
    }, [messagesEndRef]);

    return (
        <Grid ref={messagesEndRef}>
            {tariff && (
                <List sx={{width: 150}}>
                    <ListItem divider disablePadding>
                        <ListItemText>
                            США <b>{tariff.usa} $</b>
                        </ListItemText>
                    </ListItem>

                    <ListItem divider disablePadding>
                        <ListItemText>
                            Китай(авиа) <b>{tariff.china} $</b>
                        </ListItemText>
                    </ListItem>

                    <ListItem divider disablePadding>
                        <ListItemText>
                            Китай <b>{tariff.chinaGround} $</b>
                        </ListItemText>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemText>
                            Турция(авиа) <b>{tariff.turkey} $</b>
                        </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText>
                            Турция <b>{tariff.turkeyGround} $</b>
                        </ListItemText>
                    </ListItem>
                </List>
            )}
        </Grid>
    );
}

export default TariffsPage;