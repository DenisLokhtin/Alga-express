import React, {useEffect} from 'react';
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {getFlightsRequest} from "../../store/actions/flightActions";
import Grid from "@mui/material/Grid";
import FlightListItem from "../../components/FlightListItem/FlightListItem";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FlightsList = () => {
    const dispatch = useDispatch();
    const flights = useSelector(state => state.flights.flights);

    useEffect(() => {
        dispatch(getFlightsRequest());
    }, [dispatch]);

    return (
        <Container>
            <h1>Рейсы</h1>
            <Grid container flexDirection='column' spacing={4}>
                <Grid item>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Активные рейсы</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container flexDirection='column'  spacing={3}>
                                {flights.length !== 0 ?
                                    flights.map(item => (
                                        item.status === 'ACTIVE'
                                            &&
                                        <FlightListItem key={item._id} flight={item} id={item._id}/>
                                    ))
                                    :
                                    <Grid item>
                                        <h2>Нет активных рейсов</h2>
                                    </Grid>
                                }
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Завершенные рейсы</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container flexDirection='column'  spacing={3}>
                                {flights.length !== 0 ?
                                    flights.map(item => (
                                        item.status === 'DONE'
                                            &&
                                        <FlightListItem key={item._id} flight={item} id={item._id}/>
                                    ))
                                    :
                                    <Grid item>
                                        <h2>Нет активных рейсов</h2>
                                    </Grid>
                                }
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FlightsList;