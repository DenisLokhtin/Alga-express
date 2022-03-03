import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import {changePasswordRequest, clearError, resetPasswordRequest} from "../../store/actions/usersActions";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import LockClockIcon from '@mui/icons-material/LockClock';
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Alert from '@mui/material/Alert';
import {AlertTitle} from "@mui/material";
import theme from "../../theme";

const useStyles = makeStyles(theme => ({
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

const ResetPassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(state => state.users.resetLoading);
    const error = useSelector(state => state.users.resetError);
    const isUser = useSelector(state => state.users.user);


    const [user, setUser] = useState({
        secretCode: '',
        password: '',
    });

    const [changePassword, setChangePassword] = useState({
        password: '',
    });

    const [password, setPassword] = useState({
        passwordConfirm: ""
    });

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
        if (!isUser) {
            setUser(prevState => ({...prevState, [name]: value}));
        } else {
            setChangePassword(prevState => ({...prevState, [name]: value}));
        }

    };

    const passwordOnChange = e => {
        const {name, value} = e.target;
        setPassword(prevState => ({...prevState, [name]: value}));
    };


    const passwordInputError = () => {
        if (!isUser) {
            if (user.password !== password.passwordConfirm) {
                return 'Пароли не совпадают'
            }
        } else {
            if (changePassword.password !== password.passwordConfirm) {
                return 'Пароли не совпадают'
            }
        }

    };

    const submitFormHandler = e => {
        e.preventDefault();
        if (isUser) {
            dispatch(changePasswordRequest({...changePassword, navigate}))
        } else {
            dispatch(resetPasswordRequest({...user, navigate}));
        }
    };

    const buttonDisable = () => {
        if (!isUser) {
            return user.password === '';
        } else if (isUser) {
            return changePassword.password === '';
        }
        return false
    };

    return (
        <Container ref={messagesEndRef} component="section" maxWidth="xs" style={{textAlign: 'center'}}>
            <div style={theme.paper}>
                <Avatar className={classes.avatar}>
                    <LockClockIcon/>
                </Avatar>

                {
                    error &&
                    <Alert align="center" severity="error" className={classes.alert}>
                        <AlertTitle>{error.message || error.global}</AlertTitle>
                    </Alert>
                }

                {isUser ? (
                    <Grid
                        component="form"
                        container
                        direction="column"
                        className={classes.form}
                        onSubmit={submitFormHandler}
                        spacing={2}
                    >
                        <>
                            <FormElement
                                type="password"
                                autoComplete="current-password"
                                label="Новый пароль"
                                name="password"
                                value={changePassword.password}
                                required={true}
                                onChange={inputChangeHandler}
                            />
                        </>
                        <>
                            <FormElement
                                type="password"
                                autoComplete="current-passwordConfirm"
                                label="Потвердите пароль"
                                name="passwordConfirm"
                                value={password.passwordConfirm}
                                required={true}
                                onChange={passwordOnChange}
                                error={passwordInputError()}
                            />
                        </>

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
                                Отправить
                            </ButtonWithProgress>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid
                        component="form"
                        container
                        className={classes.form}
                        onSubmit={submitFormHandler}
                        spacing={2}
                    >
                        <>
                            <FormElement
                                type="text"
                                label="Код"
                                autoComplete="current-secretCode"
                                name="secretCode"
                                value={user.secretCode}
                                required={true}
                                onChange={inputChangeHandler}
                            />
                        </>
                        <>
                            <FormElement
                                type="password"
                                autoComplete="current-password"
                                label="Новый пароль"
                                name="password"
                                value={user.password}
                                required={true}
                                onChange={inputChangeHandler}
                            />
                        </>

                        <>
                            <FormElement
                                type="password"
                                autoComplete="current-passwordConfirm"
                                label="Потвердите пароль"
                                name="passwordConfirm"
                                value={password.passwordConfirm}
                                required={true}
                                onChange={passwordOnChange}
                                error={passwordInputError()}
                            />
                        </>

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
                                Отправить
                            </ButtonWithProgress>
                        </Grid>
                    </Grid>
                )}

            </div>
        </Container>
    );
};

export default ResetPassword;