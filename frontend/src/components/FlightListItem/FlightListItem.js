import React, {useState} from 'react';
import {Button, Card, CardContent, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import {useDispatch} from "react-redux";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {putFlightRequest} from "../../store/actions/flightActions";
import ruLocale from 'date-fns/locale/ru';

const localeMap = {
    ru: ruLocale,
};

const maskMap = {
    ru: '__.__.____',
};

const FlightListItem = ({flight, id, update}) => {
    const dispatch = useDispatch();
    const [editStatus, setEditStatus] = useState(true);
    const [flightData, setFlightData] = useState({
        number: flight.number,
        depart_date: flight.depart_date || null,
        arrived_date: flight.arrived_date || null,
        description: flight.description || "",
        status: flight.status
    });

    const onChangeHandler = (e) => {
        e.preventDefault();

        const {name, value} = e.target;

        setFlightData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const edit = () => {
        setEditStatus(!editStatus);
    };

    const saveAfterEdit = () => {
        dispatch(putFlightRequest({id, flightData}));
        setEditStatus(!editStatus);
        update();
    };

    const statusChanger = () => {
        if (flightData.status === 'ACTIVE') {
            setFlightData(prevState => ({...prevState, status: 'DONE'}));
        } else {
            setFlightData(prevState => ({...prevState, status: 'ACTIVE'}));
        }
    }
    return (
        <Grid item>
            <Card>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: 'column',
                            sm: 'row'
                        },
                        alignItems: 'center'
                    }}
                >
                    <Grid
                        container
                        flexDirection='column'
                        spacing={2}
                        justifyContent='space-evenly'
                        sx={{marginRight: {sm: '8px'}, marginBottom: {xs: '16px'}}}
                    >
                        <Grid item>
                            <TextField
                                disabled={editStatus}
                                label="Номер рейса"
                                fullWidth
                                name="number"
                                value={flightData.number}
                                onChange={onChangeHandler}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                disabled={editStatus}
                                label="Описание"
                                fullWidth
                                name="description"
                                value={flightData.description}
                                onChange={onChangeHandler}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        flexDirection='column'
                        spacing={2}
                        justifyContent='space-evenly'
                        sx={{marginBottom: {xs: '16px'}}}
                    >
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap['ru']}>
                                <DatePicker
                                    mask={maskMap['ru']}
                                    disabled={editStatus}
                                    label="Дата вылета"
                                    openTo="month"
                                    views={['year', 'month', 'day']}
                                    value={flightData.depart_date}
                                    onChange={(newValue) => {
                                        setFlightData(prevState => ({
                                            ...prevState,
                                            depart_date: newValue
                                        }));
                                    }}
                                    renderInput={(params) => <TextField {...params}/>}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap['ru']}>
                                <DatePicker
                                    mask={maskMap['ru']}
                                    disabled={editStatus}
                                    label="Дата вылета"
                                    openTo="month"
                                    views={['year', 'month', 'day']}
                                    value={flightData.arrived_date}
                                    onChange={(newValue) => {
                                        setFlightData(prevState => ({
                                            ...prevState,
                                            arrived_date: newValue
                                        }));
                                    }}
                                    renderInput={(params) => <TextField {...params}/>}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        flexDirection='column'
                        spacing={1}
                        justifyContent='space-evenly'
                        alignContent="center"
                    >
                        <Grid item>
                            <Button
                                fullWidth
                                variant='contained'
                                onClick={edit}
                            >
                                Редактировать
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                disabled={editStatus}
                                fullWidth
                                variant='contained'
                                onClick={statusChanger}
                                color={flightData.status === 'ACTIVE' ? "success" : "secondary"}
                            >
                                {flightData.status}
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                fullWidth
                                disabled={editStatus || flightData.number.length === 0}
                                variant='contained'
                                onClick={saveAfterEdit}
                            >
                                Сохранить
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default FlightListItem;