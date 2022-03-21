import React, {useEffect, useState} from 'react';
import {Grid, TextField, Autocomplete} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsersRequest} from "../../store/actions/usersActions";
import FormElement from "../UI/Form/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {addPaymentAdminRequest} from "../../store/actions/paymentActions";
import {createTheme} from "@mui/material/styles";
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 767,
        },
    },
});

const useStyles = makeStyles(() => ({
    breakpoints: {
        values: {
            sm: 767,
        },
    },

    container: {
        textAlign: 'center',
        paddingTop: '175px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '120px',
        },
    }
}));

const AddPaymentAdmin = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const loading = useSelector(state => state.users.loadUserDate);
    const error = useSelector(state => state.payments.errorPayment);

    const [payment, setPayment] = useState({
        id: '',
        price: '',
    });

    useEffect(() => {
        dispatch(fetchUsersRequest());
    }, [dispatch]);

    const inputChangeHandler = (e, val) => {
        let {name, value} = e.target;

        if (name) {
            setPayment(prevState => ({...prevState, [name]: value}));
        } else {
            setPayment(prevState => ({
                ...prevState,
                id: val._id,
            }));
        }
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(addPaymentAdminRequest(payment));
    };

    return (
        <Container maxWidth="sm">
            <Grid
                component="form"
                onSubmit={submitFormHandler}
                justifyContent="center"
                container
                noValidate
                spacing={3}
                className={classes.container}
            >
                <Grid item xs={12} sm={10} md={10} lg={10}>
                    <Autocomplete
                        disablePortal
                        id='userList'
                        name='user'
                        options={users}
                        getOptionLabel={option => option.name}
                        onChange={(e, value) => inputChangeHandler(e, value)}
                        renderInput={(params) => <TextField {...params} label="Пользователи"/>}
                    />
                </Grid>
                    <FormElement
                        xs={12} sm={10} md={10} lg={10}
                        name="price"
                        type='number'
                        value={payment.price}
                        required
                        fullWidth
                        onChange={inputChangeHandler}
                        variant="outlined"
                        label="Сумма оплаты"
                        error={getFieldError('price')}
                    />
                <Grid container item
                      justifyContent="center"
                      alignItems="center"
                      sx={{maxWidth: '500px'}}
                >
                    {
                        payment.price &&
                        payment.id ? (
                            <ButtonWithProgress
                                loading={loading}
                                disabled={loading}
                                type="submit"
                                variant="contained">
                                Принять
                            </ButtonWithProgress>
                        ) : (
                            <ButtonWithProgress
                                loading={loading}
                                disabled={true}
                                type="submit"
                                variant="contained">
                                Принять
                            </ButtonWithProgress>
                        )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddPaymentAdmin;