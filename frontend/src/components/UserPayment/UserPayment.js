import React, {useEffect, useState} from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addUserPaymentRequest, editUserDataRequest, fetchUserPaymentRequest} from "../../store/actions/usersActions";
import FormElement from "../UI/Form/FormElement";
import FileInput from "../UI/FileInput/FileInput";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";


const useStyles = makeStyles(() => ({
    container: {
        marginTop: '10px',
        paddingBottom: '40px',
        display: "flex"
    },

    packageBtnContainer: {
        textAlign: 'center',
    },

    packageMainTitle: {
        textAlign: 'center',
        '@media (max-width:600px)': {
            padding: '10px',
        },
    },

    textField: {
        '&:last-child': {
            marginBottom: '50px',
        },
    },
    phoneField: {
        '&:last-child': {
            marginBottom: '100px',
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    margin0: {
        margin: 0,
    },
    addButton: {
        position: "relative",
        bottom: '-35px',
    },
    padding: {
        padding: '15px',
        marginTop: '20px',
    }


}));

const theme = createTheme();

theme.typography.h4 = {
    fontSize: '1.3rem',
    '@media (min-width:600px)': {
        fontSize: '1.6rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};


const UserPayment = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const error = useSelector(state => state.users.userError);


    const [pay, setPay] = useState({
        description: '',
        image: null,
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setPay(prevState => ({...prevState, [name]: value}));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const files = e.target.files;

        if (name === 'payment') {
            setPay(prevState => {
                return {...prevState, image: files[0]};
            });
        }
    };

    const submitPaymentHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(pay).forEach(key => {
            formData.append('payment', pay[key]);
        });
        dispatch(addUserPaymentRequest(formData));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <Container
            component="section"
            maxWidth="md"
            className={classes.container}
        >
            <Grid
                container
                item
                justifyContent='center'
            >
                <Typography
                    variant="h4"
                    className={classes.packageMainTitle}
                >
                    Оплата Пользователя
                </Typography>
                <Grid
                    component="form"
                    onSubmit={submitPaymentHandler}
                    justifyContent="center"
                    container
                    noValidate
                    spacing={5}
                >
                    <Grid item xs={12} sm={9} md={8} lg={8}>
                        <FormElement
                            name="description"
                            type="text"
                            value={pay.description}
                            fullWidth
                            required={true}
                            onChange={inputChangeHandler}
                            variant="outlined"
                            label="Описание"
                            error={getFieldError('description')}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12} sm={8} md={7} lg={7}
                    >
                        <label>
                            Оплата
                            <FileInput
                                name="payment"
                                type="file"
                                fullWidth
                                required={true}
                                onChange={fileChangeHandler}
                                // error={getFieldError('payment')}
                            >
                                <Button>Text</Button>
                            </FileInput>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}
                          className={classes.packageBtnContainer}>
                        <ButtonWithProgress
                            // loading={loading}
                            // disabled={loading}
                            type="submit"
                            variant="contained">
                            Сохранить
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </Grid>

        </Container>
    );
};
export default UserPayment;