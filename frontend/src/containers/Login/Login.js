import React, {useEffect, useRef, useState} from 'react';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import {clearError, loginUser} from "../../store/actions/usersActions";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Alert from '@mui/material/Alert';
import {AlertTitle, InputAdornment} from "@mui/material";
import {forgotPassword, newUserRegister} from "../../paths";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 450,
            sm: 768,
        },
    },
});

const useStyles = makeStyles(() => ({
    form: {
        marginTop: '8px',
    },

    breakpoints: {
        values: {
            xs: 450,
            sm: 768,
        },
    },

    container: {
        textAlign: 'center',
        paddingTop: '170px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '100px',
        },
        [theme.breakpoints.down('xs')]: {
            paddingTop: '140px',
        },
    },


    submit: {
        margin: '24px 0 16px',
    },

    alert: {
        marginTop: theme.spacing(3),
        width: "100%",
    },

    avatar: {
        margin: '0 auto',
    },
}));

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(state => state.users.loginLoading);
    const error = useSelector(state => state.users.loginError);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        return () => {
            dispatch(clearError());
        };
    }, [dispatch, messagesEndRef]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(loginUser({...user, navigate}));
    };

    const buttonDisable = () => {
        return user.password === '' || user.email === '';
    };

    return (
        <Container ref={messagesEndRef} component="section" maxWidth="xs" className={classes.container}>
            <div style={theme.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon/>
                </Avatar>

                <Typography component="h1" variant="h6" sx={{margin: '20px'}}>
                    Вход
                </Typography>
                {
                    error &&
                    <Alert align="center" severity="error" className={classes.alert}>
                        <AlertTitle>{error.message || error.global}</AlertTitle>
                    </Alert>
                }

                <Grid
                    component="form"
                    container
                    className={classes.form}
                    direction="column"
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
                        type={isPasswordVisible ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {isPasswordVisible ? (
                                        <VisibilityIcon
                                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}/>
                                    ) : (
                                        <VisibilityOffIcon onClick={() => setIsPasswordVisible(!isPasswordVisible)}/>
                                    )}
                                </InputAdornment>
                            )
                        }}
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
                            войти
                        </ButtonWithProgress>
                    </Grid>

                    <Grid item container justifyContent="flex-end">
                        <Link component={RouterLink} variant="body2" to={newUserRegister}>
                            Нет аккаунта? Зарегистрироваться
                        </Link>
                    </Grid>
                    <Grid item container justifyContent="flex-end">
                        <Link component={RouterLink} variant="body2" to={forgotPassword}>
                            Забыли пароль?
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Login;