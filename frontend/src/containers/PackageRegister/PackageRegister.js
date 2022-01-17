import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearTextFieldsErrors, createPackageRequest} from "../../store/actions/packageRegisterActions";
import {Checkbox, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {makeStyles} from "@mui/styles";
import Dimension from "../../components/Dimension/Dimension";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: '50px',
    },

    packageBtnContainer: {
        textAlign: 'center',
    },

    packageMainTitle: {
        textAlign: 'center',
        paddingBottom: '50px',
        '@media (max-width:600px)': {
            padding: '10px',
        },
    },

    textField: {
        '&:last-child': {
            marginBottom: '50px',
        },
    },
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

const PackageRegister = () => {
    const classes = useStyles();
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
    });

    const [checked, setChecked] = useState(false);

    const [dimensions, setDimensions] = useState({
        width: '',
        height: '',
        length: '',
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setPackageRegister(prevState => ({...prevState, [name]: value}));
    };

    const onCheckedChange = e => {
        setChecked(e.target.checked);
    };

    const dimensionsHandler = e => {
        const {name, value} = e.target;
        setDimensions(prevState => ({...prevState, [name]: value}));
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

        if (checked) {
            dispatch(createPackageRequest({...packageRegister, ...dimensions, ...user}));
        } else {
            dispatch(createPackageRequest({...packageRegister, ...user}));
        }
    };

    useEffect(() => {
        return () => {
            dispatch(clearTextFieldsErrors());
        };
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
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
                        <FormControl fullWidth error={Boolean(getFieldError('country'))}>
                            <InputLabel id="demo-controlled-open-select-label">Country</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                value={packageRegister.country}
                                label="Страна"
                                name="country"
                                required
                                onChange={inputChangeHandler}
                            >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value={'USA'}>USA</MenuItem>
                                <MenuItem value={'Turkey'}>Turkey</MenuItem>
                                <MenuItem value={'China'}>China</MenuItem>
                            </Select>
                            <FormHelperText error={true}>{error.errors?.['country']?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="trackNumber"
                            value={packageRegister.trackNumber}
                            required
                            fullWidth
                            onChange={inputChangeHandler}
                            variant="outlined"
                            label="Трек-номер"
                            error={Boolean(getFieldError('trackNumber'))}
                            helperText={getFieldError('trackNumber')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="title"
                            value={packageRegister.title}
                            onChange={inputChangeHandler}
                            required
                            fullWidth
                            variant="outlined"
                            label="Название"
                            error={Boolean(getFieldError('title'))}
                            helperText={getFieldError('title')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="amount"
                            type="number"
                            value={packageRegister.amount}
                            onChange={inputChangeHandler}
                            fullWidth
                            required
                            variant="outlined"
                            label="Количество"
                            error={Boolean(getFieldError('amount'))}
                            helperText={getFieldError('amount')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="price"
                            type="number"
                            value={packageRegister.price}
                            onChange={inputChangeHandler}
                            className={classes.textField}
                            fullWidth
                            required
                            variant="outlined"
                            label="Цена"
                            error={Boolean(getFieldError('price'))}
                            helperText={getFieldError('price')}
                        />
                    </Grid>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center">
                        <Typography variant="h4">Габариты</Typography>
                        <Checkbox checked={checked} onChange={onCheckedChange}/>
                    </Grid>
                    {checked ? (
                        <Dimension
                            width={dimensions.width}
                            height={dimensions.height}
                            length={dimensions.length}
                            getFieldError={getFieldError}
                            dimensionsHandler={dimensionsHandler}
                        />) : null}
                    <Grid item xs={12} sm={8} md={7} lg={7}
                          className={classes.packageBtnContainer}>
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            variant="contained">
                            Оформить
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default PackageRegister;