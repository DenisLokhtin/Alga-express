import React, {useEffect, useRef, useState} from 'react';
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
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 768,
        },
    },
});

const useStyles = makeStyles(() => ({
    btn: {
        margin: '24px 0 2px',
    },
    avatar: {
        width: '56px',
        height: '56px',
        marginBottom: '15px',
        margin: '0 auto',
    },
    breakpoints: {
        values: {
            sm: 768,
        },
    },

    container: {
        textAlign: 'center',
        paddingTop: '180px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '110px',
        },
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

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }
        return () => {
            dispatch(clearFlightsError());
        }
    }, [dispatch, messagesEndRef]);

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setFlightNumber(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const sendData = (e) => {
        e.preventDefault();
        dispatch(postFlightRequest({flightNumber, navigate}));
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
        <Container ref={messagesEndRef} className={classes.container} component="section" maxWidth="xs">
            <div style={theme.paper}>
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
                            disabled={!flightNumber.number}
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