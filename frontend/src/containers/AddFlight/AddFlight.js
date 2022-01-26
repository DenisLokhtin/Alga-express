import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormElement from "../../components/UI/Form/FormElement";
import {useDispatch, useSelector} from "react-redux";
import {clearFlightsError, postFlightRequest} from "../../store/actions/flightActions";
import {makeStyles} from "@mui/styles";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useNavigate} from "react-router-dom";
import FlightIcon from '@mui/icons-material/Flight';
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    btn: {
        margin: theme.spacing(3, 0, 2),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        width: '56px',
        height: '56px'
    }
}));

const AddFlight = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const error = useSelector(state => state.flights.error);
    const loading = useSelector(state => state.flights.loading);

    const [flightNumber, setFlightNumber] = useState({
        number: ""
    });

    useEffect(() => {
        return () => {
            dispatch(clearFlightsError());
        }
    }, [dispatch]);

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setFlightNumber(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const sendData = (e) => {
        e.preventDefault();
        dispatch(postFlightRequest({flightNumber, navigate}));
    }

    const buttonDisable = () => {
        return flightNumber.number.length === 0;
    };

    const getFieldError = fieldName => {
        try {
            if (error.errors[fieldName].message) {
                return 'Заполните пустое поле!';
            }
        } catch (e) {
            return undefined;
        }
    };

    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <FlightIcon fontSize='large'/>
                </Avatar>

                <Grid container flexDirection="column" spacing={2}>
                    <FormElement
                        name="number"
                        value={flightNumber.number}
                        fullWidth
                        onChange={onChangeHandler}
                        variant="outlined"
                        label="Номер рейса"
                        error={getFieldError('number')}
                    />
                    <Grid item xs={12}>
                        <ButtonWithProgress
                            onClick={sendData}
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.btn}
                            loading={loading}
                            disabled={buttonDisable()}
                        >
                            Сохранить рейс
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default AddFlight;