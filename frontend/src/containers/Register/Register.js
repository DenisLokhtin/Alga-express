import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Avatar, Container, Grid, Link, makeStyles, Typography} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useDispatch, useSelector} from "react-redux";
import {clearErrorUser, registerUser} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PhoneInput from 'react-phone-input-2'
import ru from 'react-phone-input-2/lang/ru.json'
import './Register.css'
import 'react-phone-input-2/lib/bootstrap.css'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);

    const [user, setUser] = useState({
        email: '',
        password: '',
        phone: '',
        name: '',
    });

    const [passwords, setPasswords] = useState({
        password_2: '',
    });

    const [checkbox, setCheckbox] = useState(false);

    useEffect(() => {
        return () => {
            dispatch(clearErrorUser());
        };
    }, [dispatch]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prevState => ({...prevState, [name]: value}));
    };

    const passwordChangeHandler = e => {
        const {name, value} = e.target;

        setPasswords(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        dispatch(registerUser({...user}));
    };

    const passwordInputError = () => {
        if (user.password !== passwords.password_2) {
            return 'Пароли не совпадают'
        }
    };

    const passwordError = () => {
        if (user.password === passwords.password_2 && user.password !== '' && passwords.password_2 !== '' && user.email !== '' && user.name !== '' && user.phone !== '' && checkbox) {
            return false
        } else return true
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const phoneChangeHandler = () => {
        const value = document.getElementsByClassName('form-control');

        setUser(prevState => ({...prevState, phone: value[0].value}));
    };

    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h6">
                    Регистрация
                </Typography>
                <Grid
                    component="form"
                    container
                    className={classes.form}
                    onSubmit={submitFormHandler}
                    spacing={2}
                    noValidate
                >

                    <FormElement
                        required
                        type="text"
                        label="ФИО"
                        name="name"
                        value={user.name}
                        onChange={inputChangeHandler}
                        error={getFieldError('name')}
                    />

                    <PhoneInput
                        style={{'margin': '8px'}}
                        country={'kg'}
                        localization={ru}
                        required
                        type="tel"
                        label="Номер телефона"
                        name="phone"
                        value={user.phone}
                        onChange={phoneChangeHandler}
                    />

                    <FormElement
                        required
                        type="email"
                        autoComplete="new-email"
                        label="Эл.почта"
                        name="email"
                        value={user.email}
                        onChange={inputChangeHandler}
                        error={getFieldError('email')}
                    />

                    <FormElement
                        required
                        type="password"
                        autoComplete="new-password"
                        label="Пароль"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                        error={passwordInputError()}
                    />

                    <FormElement
                        required
                        type="password"
                        autoComplete="new-password"
                        label="Повторите пароль"
                        name="password_2"
                        value={passwords.password_2}
                        onChange={passwordChangeHandler}
                        error={passwordInputError()}
                    />

                    <Grid item xs={12}>
                        <FormControlLabel onClick={() => setCheckbox(!checkbox)} style={{'marginBottom': '5px'}}
                                          control={<Checkbox size='medium'/>}/>
                        <Typography style={{'marginLeft': '-20px'}} component="span">
                            Я согласен с <Link component={RouterLink} to="/rules">правилами</Link>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography component="p">
                            Перед совершением покупок необходимо будет подробнее заполнить информацию о себе в личном кабинете
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            loading={loading}
                            disabled={passwordError()}
                        >
                            зарегистрироваться
                        </ButtonWithProgress>
                    </Grid>

                    <Grid item container justifyContent="flex-end">
                        <Link component={RouterLink} variant="body2" to="/login">
                            Уже есть аккаунт? Войти
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;