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
import theme from "../../theme";
import FormElement from "../../components/UI/Form/FormElement";
import {fetchUsersRequest} from "../../store/actions/usersActions";
import {editBuyoutStatusRequest} from "../../store/actions/buyoutActions";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: '50px',
    },

    packageMainTitle: {
        textAlign: 'center',
        paddingBottom: '50px',
        '@media (max-width:600px)': {
            padding: '10px',
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
        dispatch(fetchUsersRequest());
    }, [dispatch]);


    const [packageRegister, setPackageRegister] = useState({
        trackNumber: '',
        title: '',
        amount: '',
        price: '',
        country: '',
    });

    const [value, setValue] = React.useState(users[0]);
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
                console.log(buyoutUser.buyoutId);
                console.log(buyoutUser)
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
            maxWidth="md"
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
                spacing={5}
            >
                <Grid item xs={12} sm={8} md={7} lg={7}>
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
                            <MenuItem value={'USA'}>Америка</MenuItem>
                            <MenuItem value={'Turkey'}>Турция</MenuItem>
                            <MenuItem value={'China'}>Китай (Авия доставка)</MenuItem>
                        </Select>
                        <FormHelperText error={true}>{error?.errors?.['country']?.message}</FormHelperText>
                    </FormControl>
                </Grid>
                <FormElement
                    xs={12} sm={8} md={7} lg={7}
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
                    xs={12} sm={8} md={7} lg={7}
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
                    xs={12} sm={8} md={7} lg={7}
                    name="amount"
                    type="number"
                    value={packageRegister.amount}
                    onChange={inputChangeHandler}
                    fullWidth
                    required
                    variant="outlined"
                    label="Количество"
                    error={getFieldError('amount')}
                />
                <FormElement
                    xs={12} sm={8} md={7} lg={7}
                    name="price"
                    type="number"
                    value={packageRegister.price}
                    onChange={inputChangeHandler}
                    className={classes.textField}
                    fullWidth
                    required
                    variant="outlined"
                    label="Цена"
                    error={getFieldError('price')}
                />
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
                                // value={value}
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