import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    clearAdminErrors,
    editAdminPackageRequest,
    fetchPackageAdminRequest
} from "../../store/actions/packageRegisterActions";
import {
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {makeStyles} from "@mui/styles";
import Dimension from "../../components/Dimension/Dimension";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useParams} from "react-router-dom";

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

const AdminEditPackage = () => {
    const classes = useStyles();
    const loading = useSelector(state => state.package.editAdminLoading);
    const dispatch = useDispatch();
    const error = useSelector(state => state.package.editAdminError);
    console.log('In edit error - ', error)
    const packageAdmin = useSelector(state => state.package.packageAdmin);
    const {id} = useParams();

    const [packageEdit, setPackageEdit] = useState({
        trackNumber: '',
        title: '' ,
        amount: '' ,
        price: '' ,
        country: '',
        width: '',
        height: '' ,
        length: '' ,
        urlPackage: '' ,
        cargoPrice: '',
        cargoWeight: '',
        status:'' ,
    });

    useEffect(() => {
        dispatch(fetchPackageAdminRequest(id));
        packageAdmin && setPackageEdit(prev=>({
            ...prev,
            trackNumber: packageAdmin.trackNumber,
            title: packageAdmin.title ,
            amount: packageAdmin.amount ,
            price: packageAdmin.price ,
            country: packageAdmin.country,
            width: packageAdmin.width ,
            height: packageAdmin.height ,
            length: packageAdmin.length ,
            urlPackage: packageAdmin.urlPackage ,
            cargoPrice: packageAdmin.cargoPrice ,
            cargoWeight: packageAdmin.cargoWeight,
            status:packageAdmin.status ,
        }));
        return () => {
            dispatch(clearAdminErrors());
        };
    }, [dispatch,id, packageAdmin.trackNumber, packageAdmin.title, packageAdmin.price,
        packageAdmin.amount, packageAdmin.country, packageAdmin.width, packageAdmin.height,
        packageAdmin.length, packageAdmin.urlPackage, packageAdmin.cargoPrice, packageAdmin.cargoWeight,
        packageAdmin.status]);


    const inputChangeHandler = event => {
        let {name, value} = event.target;

        if (name === 'amount' ||
            name === 'price' ||
            name === 'width' ||
            name === 'length' ||
            name === 'height' ||
            name === 'cargoPrice' ||
            name === 'cargoWeight') {
            if (event.target.value < 0) {
                value = 0;
                setPackageEdit(prevState => ({...prevState, [name]: value}));
            }
        }

        setPackageEdit(prevState => ({...prevState, [name]: value}));
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
        dispatch(editAdminPackageRequest({obj: packageEdit, id}))
    };

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
                                value={packageEdit.country}
                                label="Страна"
                                name="country"
                                required
                                onChange={inputChangeHandler}
                            >
                                <MenuItem value={'USA'}>USA</MenuItem>
                                <MenuItem value={'Turkey'}>Turkey</MenuItem>
                                <MenuItem value={'China'}>China</MenuItem>
                            </Select>
                            <FormHelperText error={true}>{error?.errors?.['country']?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <FormControl fullWidth error={Boolean(getFieldError('status'))}>
                            <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                value={packageEdit.status}
                                label="Статус"
                                name="status"
                                required
                                onChange={inputChangeHandler}
                            >
                                <MenuItem value={'REGISTERED'}>Оформлен</MenuItem>
                                <MenuItem value={'ON_WAREHOUSE'}>На складе</MenuItem>
                                <MenuItem value={'ON_WAY'}>Вылетел</MenuItem>
                                <MenuItem value={'PROCESSED'}>Обрабатывается</MenuItem>
                                <MenuItem value={'DELIVERED'}>Готово к выдаче</MenuItem>
                                <MenuItem value={'DONE'}>Выдано</MenuItem>
                            </Select>
                            <FormHelperText error={true}>{error?.errors?.['status']?.message}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="trackNumber"
                            value={packageEdit.trackNumber}
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
                            value={packageEdit.title}
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
                            value={packageEdit.amount}
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
                            name="cargoPrice"
                            type="number"
                            value={packageEdit.cargoPrice}
                            onChange={inputChangeHandler}
                            fullWidth
                            required
                            variant="outlined"
                            label="Стоимость доставки"
                            error={Boolean(getFieldError('amount'))}
                            helperText={getFieldError('amount')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="cargoWeight"
                            type="number"
                            value={packageEdit.cargoWeight}
                            onChange={inputChangeHandler}
                            fullWidth
                            required
                            variant="outlined"
                            label="Вес посылки"
                            error={Boolean(getFieldError('amount'))}
                            helperText={getFieldError('amount')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="urlPackage"
                            type="text"
                            value={packageEdit.urlPackage}
                            onChange={inputChangeHandler}
                            className={classes.textField}
                            fullWidth
                            required
                            variant="outlined"
                            label="Ссылка"
                            error={Boolean(getFieldError('price'))}
                            helperText={getFieldError('price')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="price"
                            type="number"
                            value={packageEdit.price}
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

                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <Dimension
                            width={packageEdit.width}
                            height={packageEdit.height}
                            length={packageEdit.length}
                            getFieldError={getFieldError}
                            packageHandler={inputChangeHandler}
                        />
                    </Grid>
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

export default AdminEditPackage;