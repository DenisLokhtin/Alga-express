import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editAdminPackageRequest} from "../../store/actions/packageRegisterActions";
import {
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Dimension from "../../components/Dimension/Dimension";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FormElement from "../UI/Form/FormElement";
import {createTheme} from "@mui/material/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";

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
        [theme.breakpoints.down('sm')]: {
            paddingTop: '120px',
        },
    },

    packageMainTitle: {
        textAlign: 'center',
        paddingBottom: '50px',
    },

    textField: {
        '&:last-child': {
            marginBottom: '50px',
        },
    },
}));

const AdminEditPackage = ({packageAdmin, id}) => {
    const classes = useStyles();
    const loading = useSelector(state => state.package.editAdminLoading);
    const dispatch = useDispatch();
    const error = useSelector(state => state.package.editAdminError);

    const [packageEdit, setPackageEdit] = useState({
        trackNumber: packageAdmin.trackNumber,
        title: packageAdmin.title,
        amount: packageAdmin.amount,
        price: packageAdmin.price,
        country: packageAdmin.country,
        width: packageAdmin.width || '',
        height: packageAdmin.height || '',
        length: packageAdmin.length || '',
        urlPackage: packageAdmin.urlPackage,
        cargoWeight: packageAdmin.cargoWeight || '',
        status: packageAdmin.status,
        priceCurrency: packageAdmin.priceCurrency,
    });

    const inputChangeHandler = event => {
        let {name, value} = event.target;

        if (name === 'amount' ||
            name === 'price' ||
            name === 'width' ||
            name === 'length' ||
            name === 'height' ||
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
        <Container
            component="section"
            maxWidth="sm"
            className={classes.container}>
            <Grid item>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: {
                            xs: '18px',
                            sm: '20px',
                            md: '22px',
                            lg: '26px',
                        }
                    }}
                    className={classes.packageMainTitle}>
                    Редактирование посылки
                </Typography>
            </Grid>
            <Grid
                component="form"
                onSubmit={submitFormHandler}
                justifyContent="center"
                container
                noValidate
                spacing={3}
            >
                <Grid item xs={11} sm={9} md={9} lg={9}>
                    <FormControl variant="outlined" fullWidth error={Boolean(getFieldError('country'))}>
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
                            <MenuItem value={'usa'}>Америка</MenuItem>
                            <MenuItem value={'turkey'}>Турция (Авия доставка)</MenuItem>
                            <MenuItem value={'turkeyGround'}>Турция (Наземная доставка)</MenuItem>
                            <MenuItem value={'china'}>Китай (Авия доставка)</MenuItem>
                            <MenuItem value={'chinaGround'}>Китай (Наземная доставка)</MenuItem>
                        </Select>
                        <FormHelperText error={true}>{error?.errors?.['country']?.message}</FormHelperText>
                    </FormControl>
                </Grid>
                {/*<Grid item xs={11} sm={9} md={9} lg={9}>*/}
                {/*    <FormControl variant="outlined" fullWidth error={Boolean(getFieldError('status'))}>*/}
                {/*        <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>*/}
                {/*        <Select*/}
                {/*            labelId="demo-controlled-open-select-label"*/}
                {/*            id="demo-controlled-open-select"*/}
                {/*            value={packageEdit.status}*/}
                {/*            label="Статус"*/}
                {/*            name="status"*/}
                {/*            required*/}
                {/*            onChange={inputChangeHandler}*/}
                {/*        >*/}
                {/*            <MenuItem value={'REGISTERED'}>Оформлен</MenuItem>*/}
                {/*            <MenuItem value={'ON_WAREHOUSE'}>На складе</MenuItem>*/}
                {/*            <MenuItem value={'ON_WAY'}>В пути</MenuItem>*/}
                {/*            <MenuItem value={'DELIVERED'}>Прибыл</MenuItem>*/}
                {/*            <MenuItem value={'DONE'}>Выдан</MenuItem>*/}
                {/*        </Select>*/}
                {/*        <FormHelperText error={true}>{error?.errors?.['status']?.message}</FormHelperText>*/}
                {/*    </FormControl>*/}
                {/*</Grid>*/}
                <FormElement
                    xs={11} sm={9} md={9} lg={9}
                    name="trackNumber"
                    value={packageEdit.trackNumber}
                    required
                    fullWidth
                    onChange={inputChangeHandler}
                    variant="outlined"
                    label="Трек-номер"
                    error={getFieldError('trackNumber')}
                />
                <FormElement
                    xs={11} sm={9} md={9} lg={9}
                    name="title"
                    value={packageEdit.title}
                    onChange={inputChangeHandler}
                    required
                    fullWidth
                    variant="outlined"
                    label="Название"
                    error={getFieldError('title')}
                />
                <FormElement
                    xs={11} sm={9} md={9} lg={9}
                    name="amount"
                    type="number"
                    value={packageEdit.amount}
                    onChange={inputChangeHandler}
                    fullWidth
                    required
                    variant="outlined"
                    label="Количество"
                    error={getFieldError('amount')}
                />
                <FormElement
                    xs={11} sm={9} md={9} lg={9}
                    name="cargoWeight"
                    type="number"
                    value={packageEdit.cargoWeight}
                    onChange={inputChangeHandler}
                    fullWidth
                    required
                    variant="outlined"
                    label="Вес посылки"
                    error={getFieldError('amount')}
                />
                <FormElement
                    xs={11} sm={9} md={9} lg={9}
                    name="urlPackage"
                    type="text"
                    value={packageEdit?.urlPackage}
                    onChange={inputChangeHandler}
                    className={classes.textField}
                    fullWidth
                    required
                    variant="outlined"
                    label="Ссылка"
                    error={getFieldError('urlPackage')}
                />
                <FormElement
                    xs={11} sm={4.5} md={4.5} lg={4.5}
                    name="price"
                    type="number"
                    value={packageEdit.price}
                    onChange={inputChangeHandler}
                    className={classes.textField}
                    fullWidth
                    required
                    variant="outlined"
                    label="Цена"
                    error={getFieldError('price')}
                />
                <Grid item xs={11} sm={4.5} md={4.5} lg={4.5}>
                    <FormControl variant="outlined" fullWidth error={Boolean(getFieldError('priceCurrency'))}>
                        <InputLabel id="demo-controlled-open-select-label">Выберите Валюту</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={packageEdit.priceCurrency}
                            label="Выберите валюту"
                            name="priceCurrency"
                            required
                            onChange={inputChangeHandler}
                        >
                            <MenuItem value={'USD'}>
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
                <Grid item xs={11} sm={9} md={9} lg={9}>
                    <Dimension
                        width={packageEdit.width}
                        height={packageEdit.height}
                        length={packageEdit.length}
                        getFieldError={getFieldError}
                        packageHandler={inputChangeHandler}
                    />
                </Grid>
                <Grid item xs={11} sm={9} md={9} lg={9} sx={{my: '1em'}}>
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
    );
};

export default AdminEditPackage;