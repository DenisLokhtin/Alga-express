import React, {useEffect, useRef, useState} from 'react';
import {Container, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addUserPaymentRequest} from "../../store/actions/usersActions";
import FormElement from "../UI/Form/FormElement";
import FileInput from "../UI/FileInput/FileInput";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 786,
        },
    },
});


const useStyles = makeStyles(() => ({
    breakpoints: {
        values: {
            sm: 786,
        },
    },

    container: {
        display: "flex",
        textAlign: 'center',
        paddingTop: '160px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '90px',
        },
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
        margin: '24px 0 16px',
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
    },

    label: {
        fontSize: '24px',
    },
}));

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

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
    }, [messagesEndRef]);

    return (
        <Container
            ref={messagesEndRef}
            component="section"
            maxWidth="sm"
            className={classes.container}
        >
            <Grid
                container
                item
                justifyContent='center'
            >
                <Typography
                    variant="h4"
                    sx={{marginBottom: '15px'}}
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
                    spacing={3}
                >
                    <Grid item xs={12} sm={9.5} md={9.5} lg={9.5}>
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
                        xs={12} sm={9.5} md={9.5} lg={9.5}
                    >
                        <label className={classes.label}>
                            Оплата
                            <FileInput
                                name="payment"
                                type="file"
                                fullWidth
                                required={true}
                                onChange={fileChangeHandler}
                                // error={getFieldError('payment')}
                            >
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
                            Отправить
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </Grid>

        </Container>
    );
};
export default UserPayment;