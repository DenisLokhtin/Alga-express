import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {makeStyles} from "@mui/styles";
import {useDispatch, useSelector} from "react-redux";
import {clearError, registerUser} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import PhoneInput from 'react-phone-input-2'
import ru from 'react-phone-input-2/lang/ru.json'
import './Register.css'
import 'react-phone-input-2/lib/bootstrap.css'
import {rulesCompany, userLogin} from "../../paths";
import theme from "../../theme";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const useStyles = makeStyles(theme => ({
    form: {
        margin: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(0, 0, 1),
    },
}));

const Register = ({userData}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);

    const [user, setUser] = useState({
        role: '',
        email: '',
        password: '',
        phone: '',
        name: '',
        confirmPassword: '',
    });

    const [checkbox, setCheckbox] = useState(userData?.role === 'superAdmin');

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prevState => ({...prevState, [name]: value}));
    };

    const handleChange = event => {
        setCheckbox(event.target.checked);
    };

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(registerUser({...user, userData}));
    };

    const passwordError = () => {
        return !(
            user.password !== '' && user.confirmPassword !== '' &&
            user.email !== '' && user.name !== '' &&
            user.phone !== '' && checkbox
        );
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
        <Container component="section" maxWidth="md">
            <div style={theme.paper}>
                <Grid item sx={{mb: '1.3em'}}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                </Grid>
                {userData?.role === 'superAdmin' ? (
                    <Typography component="h1" variant="h6" align={'center'}>
                        Регистрация пользователей
                    </Typography>
                ) : (
                    <Typography component="h1" variant="h6" align={'center'}>
                        Регистрация
                    </Typography>
                )}
                <Grid
                    component="form"
                    container
                    className={classes.form}
                    onSubmit={submitFormHandler}
                    justifyContent="center"
                    spacing={2}
                    noValidate
                >
                    {userData?.role === 'superAdmin' && (
                        <Grid item xs={12} sm={8} md={7} lg={7}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Выберите кого хотите создать</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={user.role}
                                    name="role"
                                    label="Выберите кого хотите создать"
                                    onChange={inputChangeHandler}
                                >
                                    <MenuItem value={'admin'}>Администратор</MenuItem>
                                    <MenuItem value={'warehouseman'}>Складовщик</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                    <FormElement
                        xs={12} sm={8} md={7} lg={7}
                        required
                        variant="outlined"
                        type="text"
                        label="ФИО"
                        name="name"
                        value={user.name}
                        onChange={inputChangeHandler}
                        error={getFieldError('name')}
                    />
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <PhoneInput
                            country={'kg'}
                            localization={ru}
                            required
                            type="tel"
                            label="Номер телефона"
                            name="phone"
                            value={user.phone}
                            onChange={phoneChangeHandler}
                        />
                    </Grid>
                    <FormElement
                        xs={12} sm={8} md={7} lg={7}
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
                        xs={12} sm={8} md={7} lg={7}
                        required
                        type="password"
                        autoComplete="new-password"
                        label="Пароль"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                        error={getFieldError('password')}
                    />
                    <FormElement
                        xs={12} sm={8} md={7} lg={7}
                        required
                        type="password"
                        autoComplete="new-password"
                        label="Повторите пароль"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={inputChangeHandler}
                        error={getFieldError('password')}
                    />

                    {userData?.role === 'superAdmin' ? null : (
                        <>
                            <Grid item xs={12} sm={8} md={7} lg={7} sx={{mt: '1.5em'}}>
                                <Typography align="center">
                                    Перед совершением покупок необходимо будет подробнее заполнить информацию о себе
                                    в личном кабинете
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center" style={{textAlign: 'center'}}>
                                <Checkbox
                                    sx={{my: '1.5em'}}
                                    checked={checkbox}
                                    onChange={handleChange}
                                    inputProps={{'aria-label': 'controlled'}}
                                />
                                <Typography>
                                    Я согласен с <Link component={RouterLink} to={rulesCompany}>правилами</Link>
                                </Typography>
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            loading={loading}
                            disabled={passwordError()}
                        >
                            {userData?.role === 'superAdmin' ? 'Создать пользователя' : 'зарегистрироваться'}
                        </ButtonWithProgress>
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <Link component={RouterLink} to={userLogin}>
                            <Typography align="right" variant="body2">
                                Уже есть аккаунт? Войти
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;