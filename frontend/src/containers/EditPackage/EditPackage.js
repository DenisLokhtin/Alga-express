import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {
    Container,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    changePackageRequest,
    clearTextFieldsErrors,
    getPackageByIdRequest
} from "../../store/actions/packageRegisterActions";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useNavigate, useParams} from "react-router-dom";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: '50px',
    },

    packageBtnContainer: {
        textAlign: 'center',
    },

    form: {
        display: 'flex'
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

const EditPackage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const error = useSelector(state => state.package.changePackageError);
    const loading = useSelector(state => state.package.createPackageRequest);
    const onePackage = useSelector(state => state.package.onePackage);


    const [packageRegister, setPackageRegister] = useState({
        trackNumber: '',
        title: '',
        amount: '',
        price: '',
        country: '',
        width: '',
        height: '',
        length: '',
        urlPackage: '',
    });

    const inputChangeHandler = event => {
        let {name, value} = event.target;

        if (name === 'amount' || name === 'price' || name === 'width' || name === 'length' || name === 'height') {
            if (event.target.value < 0) {
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


    useEffect( () => {
        dispatch(getPackageByIdRequest(params.id));
        onePackage && setPackageRegister(prevState => ({
            ...prevState,
            trackNumber: onePackage.trackNumber,
            title: onePackage.title,
            amount: onePackage.amount,
            price: onePackage.price,
            country: onePackage.country,
            width: onePackage.width,
            height: onePackage.height,
            length: onePackage.length,
            urlPackage: onePackage.urlPackage,
        }));
        return () => {
            dispatch(clearTextFieldsErrors());
        };
    }, [dispatch, onePackage.trackNumber, onePackage.title, onePackage.amount, onePackage.price,
        onePackage.country, onePackage.width, onePackage.height, onePackage.length, onePackage.urlPackage
    ]);



    const changePackage = (e) => {
        e.preventDefault();
        dispatch(changePackageRequest({packageRegister, packageId: params.id, navigate}));
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
                        Редактирование посылки
                    </Typography>
                </Grid>
                <Grid
                    component="form"
                    onSubmit={changePackage}
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
                                value={packageRegister.country || ''}
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
                        <TextField
                            name="trackNumber"
                            value={packageRegister.trackNumber || ''}
                            required
                            fullWidth
                            onChange={inputChangeHandler}
                            variant="standard"
                            label="Трек-номер"
                            error={Boolean(getFieldError('trackNumber'))}
                            helperText={getFieldError('trackNumber')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="title"
                            value={packageRegister.title || ''}
                            onChange={inputChangeHandler}
                            required
                            fullWidth
                            variant="standard"
                            label="Название"
                            error={Boolean(getFieldError('title'))}
                            helperText={getFieldError('title')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="amount"
                            type="number"
                            value={packageRegister.amount || ''}
                            onChange={inputChangeHandler}
                            fullWidth
                            required
                            variant="standard"
                            label="Количество"
                            error={Boolean(getFieldError('amount'))}
                            helperText={getFieldError('amount')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="price"
                            type="number"
                            value={packageRegister.price || ''}
                            onChange={inputChangeHandler}
                            fullWidth
                            required
                            variant="standard"
                            label="Цена"
                            error={Boolean(getFieldError('price'))}
                            helperText={getFieldError('price')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="urlPackage"
                            value={packageRegister.urlPackage || ''}
                            onChange={inputChangeHandler}
                            fullWidth
                            variant="standard"
                            label="URL"
                            error={Boolean(getFieldError('urlPackage'))}
                            helperText={getFieldError('urlPackage')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="width"
                            type="number"
                            value={packageRegister.width || ''}
                            onChange={inputChangeHandler}
                            fullWidth
                            variant="standard"
                            label="Ширина"
                            error={Boolean(getFieldError('width'))}
                            helperText={getFieldError('width')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="height"
                            type="number"
                            value={packageRegister.height || ''}
                            onChange={inputChangeHandler}
                            fullWidth
                            variant="standard"
                            label="Высота"
                            error={Boolean(getFieldError('height'))}
                            helperText={getFieldError('height')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="length"
                            type="number"
                            value={packageRegister.length || ''}
                            onChange={inputChangeHandler}
                            fullWidth
                            variant="standard"
                            label="Длина"
                            error={Boolean(getFieldError('length'))}
                            helperText={getFieldError('length')}
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

export default EditPackage;