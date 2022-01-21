import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearTextFieldsErrors, createPackageRequest} from "../../store/actions/packageRegisterActions";
import {Checkbox, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Dimension from "../../components/Dimension/Dimension";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useNavigate} from "react-router-dom";
import theme from "../../theme";
import FormElement from "../../components/UI/Form/FormElement";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: '50px',
    },

    packageBtnContainer: {
        textAlign: 'center',
        margin: '50px',
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
    const loading = useSelector(state => state.package.createPackageRequest);
    const dispatch = useDispatch();
    const error = useSelector(state => state.package.createPackageError);

    const [packageRegister, setPackageRegister] = useState({
        trackNumber: '',
        title: '',
        amount: '',
        price: '',
        country: '',
        width: '',
        height: '',
        length: '',
    });

    const [checked, setChecked] = useState(false);

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

    const onCheckedChange = e => {
        setChecked(e.target.checked);
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
        dispatch(createPackageRequest({...packageRegister, ...user, navigate}));
    };

    useEffect(() => {
        return () => {
            dispatch(clearTextFieldsErrors());
        };
    }, [dispatch]);

    return (
        <Container
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
                    <FormControl variant="standard" fullWidth error={Boolean(getFieldError('country'))}>
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
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormElement
                        name="trackNumber"
                        value={packageRegister.trackNumber}
                        required
                        fullWidth
                        onChange={inputChangeHandler}
                        variant="outlined"
                        label="Трек-номер"
                        error={getFieldError('trackNumber')}
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormElement
                        name="title"
                        value={packageRegister.title}
                        onChange={inputChangeHandler}
                        required
                        fullWidth
                        variant="outlined"
                        label="Название"
                        error={getFieldError('title')}
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormElement
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
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormElement
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
                </Grid>
                <Grid
                    container
                    justifyContent="center"
                    className={classes.checkboxContainer}
                    alignItems="center">
                    <Typography variant="h4">Габариты</Typography>
                    <Checkbox checked={checked} onChange={onCheckedChange}/>
                </Grid>
                {checked ? (
                    <Dimension
                        width={packageRegister.width}
                        height={packageRegister.height}
                        length={packageRegister.length}
                        getFieldError={getFieldError}
                        packageHandler={inputChangeHandler}
                    />) : null}
                <Grid container
                      justifyContent="center"
                      alignItems="center"
                      className={classes.packageBtnContainer}>
                    {
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