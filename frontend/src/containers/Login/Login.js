import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import {Avatar, Container, Grid, Link, makeStyles, Typography} from "@material-ui/core";
import {clearErrorUser, loginUser} from "../../store/actions/usersActions";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import GoogleLogin from "../../components/UI/GoogleLogin/GoogleLogin";

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
    alert: {
        marginTop: theme.spacing(3),
        width: "100%",
    },
}));

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.users.loginLoading);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        return () => {
            dispatch(clearErrorUser());
        };
    }, [dispatch]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(loginUser({...user}));
    };

    const buttonDisable = () => {
        if (user.password === '' || user.email === '') {
            return true
        } else return false
    };

    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlinedIcon/>
                </Avatar>

                <Typography component="h1" variant="h6">
                    Вход
                </Typography>

                <Grid
                    component="form"
                    container
                    className={classes.form}
                    onSubmit={submitFormHandler}
                    spacing={2}
                >
                    <FormElement
                        type="email"
                        autoComplete="current-email"
                        label="Эл.почта"
                        name="email"
                        value={user.email}
                        required={true}
                        onChange={inputChangeHandler}
                    />

                    <FormElement
                        type="password"
                        autoComplete="current-password"
                        label="Пароль"
                        name="password"
                        value={user.password}
                        required={true}
                        onChange={inputChangeHandler}
                    />

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            loading={loading}
                            disabled={buttonDisable()}
                        >
                            Войти
                        </ButtonWithProgress>
                    </Grid>

                    <Grid item xs={12}>
                        <GoogleLogin/>
                    </Grid>

                    <Grid item container justifyContent="flex-end">
                        <Link component={RouterLink} variant="body2" to="/register">
                            Нет аккаунта? Зарегистрироваться
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Login;