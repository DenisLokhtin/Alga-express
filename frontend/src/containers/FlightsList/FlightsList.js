import React, {useEffect} from 'react';
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {getFlightsRequest} from "../../store/actions/flightActions";
import Grid from "@mui/material/Grid";
import FlightListItem from "../../components/FlightListItem/FlightListItem";

const FlightsList = () => {
    const dispatch = useDispatch();
    const flights = useSelector(state => state.flights.flights);

    useEffect(() => {
        dispatch(getFlightsRequest());
    }, [dispatch]);

    return (
        <Container>
            <h1>Рейсы</h1>
            <Grid container flexDirection='column'  spacing={3}>
                {flights.length !== 0 ?
                    flights.map(item => (
                        <FlightListItem key={item._id} flight={item} id={item._id}/>
                    ))
                    :
                    <Grid item>
                        <h2>Нет активных рейсов</h2>
                    </Grid>
                }
            </Grid>
        </Container>
    );
};

export default FlightsList;