import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearTextFieldsErrors, createPackageRequest} from "../../store/actions/packageRegisterActions";
import {
    Autocomplete,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useLocation, useNavigate} from "react-router-dom";
import FormElement from "../../components/UI/Form/FormElement";
import {fetchUsersRequest} from "../../store/actions/usersActions";
import {editBuyoutStatusRequest} from "../../store/actions/buyoutActions";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 768,
        },
    },
});

const useStyles = makeStyles(() => ({
    breakpoints: {
        values: {
            sm: 768,
        },
    },

    container: {
        paddingTop: '145px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '90px',
        },
    },

    packageMainTitle: {
        textAlign: 'center',
        paddingBottom: '30px',
        '@media (max-width:600px)': {
            padding: '15px',
        },
    },

    checkboxContainer: {
        marginTop: '50px',
    },
}));

theme.typography.h4 = {
    fontSize: '1.3rem',
    '@media (min-width:600px)': {
        fontSize: '1.6rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};

const PackageRegister = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const user = useSelector(state => state.users.user);
    const users = useSelector(state => state.users.users);
    const loading = useSelector(state => state.package.createPackageRequest);
    const dispatch = useDispatch();
    const error = useSelector(state => state.package.createPackageError);
    const data = useLocation();
    const buyoutUser = data?.state?.userProps;

    useEffect(() => {
        if(user?.role !== 'user'){
            dispatch(fetchUsersRequest());
        }
    }, [dispatch, user]);

    const [packageRegister, setPackageRegister] = useState({
        trackNumber: '',
        title: '',
        amount: '',
        price: '',
        country: '',
        priceCurrency: '',
    });

    const [value, setValue] = React.useState({});
    const [inputValue, setInputValue] = React.useState('');

    const inputChangeHandler = e => {
        let {name, value} = e.target;

        if (name === 'amount' || name === 'price' || name === 'width' || name === 'length' || name === 'height') {
            if (e.target.value < 0) {
                value = 0;
                setPackageRegister(prevState => ({...prevState, [name]: value}));
            }
        }
        setPackageRegister(prevState => ({...prevState, [name]: value}));
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
        if(user?.role === 'admin'){
            if(buyoutUser){
                dispatch(createPackageRequest({...packageRegister,userId:buyoutUser.id, navigate}));
                dispatch(editBuyoutStatusRequest(buyoutUser.buyoutId));
            } else {
                dispatch(createPackageRequest({...packageRegister,userId:value?._id, navigate}));
            }
        } else{
            dispatch(createPackageRequest({...packageRegister,...user, navigate}));
        }
    };

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        return () => {
            dispatch(clearTextFieldsErrors());
        };
    }, [dispatch, messagesEndRef]);

    return (
        <Container
            ref={messagesEndRef}
            component="section"
            maxWidth="sm"
            className={classes.container}>
            <Grid item>
                <Typography
                    variant="h4"
                    className={classes.packageMainTitle}>
                    Регистрация посылки
                </Typography>
            </Grid>
            <Grid
                component="form"
                onSubmit={submitFormHandler}
                justifyContent="center"
                container
                noValidate
                spacing={2}
            >
                <Grid item xs={12} sm={8} md={7} lg={9}>
                    <FormControl variant="outlined" fullWidth error={Boolean(getFieldError('country'))}>
                        <InputLabel id="demo-controlled-open-select-label">Страна</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={packageRegister.country}
                            label="Страна"
                            name="country"
                            required
                            onChange={inputChangeHandler}
                        >
                            <MenuItem value={'usa'}>Америка</MenuItem>
                            <MenuItem value={'turkey'}>Турция (Авия доставка)</MenuItem>
                            <MenuItem value={'turkeyGround'}>Турция (Наземная доставка)</MenuItem>
                            <MenuItem value={'china'}>Китай (Авия доставка)</MenuItem>
                            <MenuItem value={'chinaGround'}>Китай (Наземная доставка)</MenuItem>
                        </Select>
                        <FormHelperText error={true}>{error?.errors?.['country']?.message}</FormHelperText>
                    </FormControl>
                </Grid>
                <FormElement
                    xs={12} sm={8} md={7} lg={9}
                    name="trackNumber"
                    value={packageRegister.trackNumber}
                    required
                    fullWidth
                    onChange={inputChangeHandler}
                    variant="outlined"
                    label="Трек-номер"
                    error={getFieldError('trackNumber')}
                />
                <FormElement
                    xs={12} sm={8} md={7} lg={9}
                    name="title"
                    value={packageRegister.title}
                    onChange={inputChangeHandler}
                    required
                    fullWidth
                    variant="outlined"
                    label="Название"
                    error={getFieldError('title')}
                />
                    <FormElement
                        xs={12} sm={8} md={7} lg={9}
                        name="amount"
                        type="number"
                        value={packageRegister.amount}
                        onChange={inputChangeHandler}
                        // fullWidth
                        required
                        variant="outlined"
                        label="Количество"
                        error={getFieldError('amount')}
                    />
                    <FormElement
                        xs={12} sm={8} md={7} lg={4.5}
                        name="price"
                        type="number"
                        value={packageRegister.price}
                        onChange={inputChangeHandler}
                        className={classes.textField}
                        // fullWidth
                        required
                        variant="outlined"
                        label="Цена"
                        error={getFieldError('price')}
                    />
                    <Grid item xs={12} sm={8} md={7} lg={4.5}>
                        <FormControl variant="outlined" fullWidth error={Boolean(getFieldError('priceCurrency'))}>
                            <InputLabel id="demo-controlled-open-select-label">Валюта</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                value={packageRegister.priceCurrency}
                                label="Выберите валюту"
                                name="priceCurrency"
                                required
                                onChange={inputChangeHandler}
                            >
                                <MenuItem value={'USE'}>
                                    Доллар
                                    <AttachMoneyIcon/>
                                </MenuItem>
                                <MenuItem value={'TRY'}>
                                    Турецкая лира
                                    <CurrencyLiraIcon/>
                                </MenuItem>
                                <MenuItem value={'CNY'}>
                                    Юань
                                    <CurrencyYenIcon/>
                                </MenuItem>
                            </Select>
                            <FormHelperText error={true}>{error?.errors?.['priceCurrency']?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                {user?.role === 'admin' && (
                    <Grid item xs={12} sm={8} md={7} lg={7}>

                        {buyoutUser ? (
                            <TextField
                                xs={12} sm={8} md={7} lg={7}
                                type="text"
                                value={buyoutUser.name}
                                className={classes.textField}
                                fullWidth
                                required
                                variant="outlined"
                                label="Заказчик"
                            />
                        ):(
                            <Autocomplete
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                name={'user'}
                                disablePortal
                                id="combo-box-demo"
                                options={users}
                                getOptionLabel={(option)=>(option.name+' '+option.email)}
                                renderInput={(params) => <TextField {...params} label="Заказчик" />}
                            />
                        )}
                    </Grid>
                )}

                <Grid item xs={12} sm={8} md={7} lg={7}>{
                    packageRegister.country &&
                    packageRegister.amount &&
                    packageRegister.price &&
                    packageRegister.trackNumber &&
                    packageRegister.priceCurrency &&
                    packageRegister.title ? (
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            variant="contained">
                            Оформить
                        </ButtonWithProgress>
                    ) : (
                        <ButtonWithProgress
                            loading={loading}
                            disabled={true}
                            type="submit"
                            variant="contained">
                            Оформить
                        </ButtonWithProgress>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default PackageRegister;