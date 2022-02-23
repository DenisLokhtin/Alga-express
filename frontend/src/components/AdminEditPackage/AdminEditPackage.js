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
import theme from "../../theme";
import FormElement from "../UI/Form/FormElement";

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

    textField: {
        '&:last-child': {
            marginBottom: '50px',
        },
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
        width: '',
        height: '',
        length: '',
        urlPackage: packageAdmin.urlPackage,
        cargoPrice: '',
        cargoWeight: '',
        status: packageAdmin.status,
    });


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
                onSubmit={submitFormHandler}
                justifyContent="center"
                container
                noValidate
                spacing={5}
            >
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormControl variant="standard" fullWidth error={Boolean(getFieldError('country'))}>
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
                    <FormControl variant="standard" fullWidth error={Boolean(getFieldError('status'))}>
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
                    <FormElement
                        name="trackNumber"
                        value={packageEdit.trackNumber}
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
                        value={packageEdit.title}
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
                        value={packageEdit.amount}
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
                        name="cargoPrice"
                        type="number"
                        value={packageEdit.cargoPrice}
                        onChange={inputChangeHandler}
                        fullWidth
                        required
                        variant="outlined"
                        label="Стоимость доставки"
                        error={getFieldError('amount')}
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormElement
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
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormElement
                        name="urlPackage"
                        type="text"
                        value={packageEdit?.urlPackage}
                        onChange={inputChangeHandler}
                        className={classes.textField}
                        fullWidth
                        required
                        variant="outlined"
                        label="Ссылка"
                        error={getFieldError('price')}
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormElement
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
                <Grid item xs={12} sm={8} md={7} lg={7} sx={{my: '3em', py: '1em'}}>
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