import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearBuyoutsError, editBuyoutRequest, fetchSingleBuyoutRequest} from "../../store/actions/buyoutActions";
import {useParams} from "react-router-dom";
import {Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import FormElement from "../UI/Form/FormElement";
import FileInput from "../UI/FileInput/FileInput";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import CurrencyYuanIcon from '@mui/icons-material/CurrencyYuan';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 767,
        },
    },
});

const useStyles = makeStyles(() => ({
    breakpoints: {
        values: {
            sm: 767,
        },
    },

    submit: {
        margin: '24px 0 16px',
    },
    container: {
        textAlign: 'center',
        paddingTop: '175px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '115px',
        },
    },

    item: {
        width: '30%',
    }
}));

const EditBuyout = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const oneBuyout = useSelector(state => state.buyouts.singleBuyout);
    const error = useSelector(state => state.buyouts.createError);
    const loading = useSelector(state => state.buyouts.createLoading);
    const user = useSelector(state => state.users.user);
    const {id} = useParams();

    const [buyout, setBuyout] = useState({
        description: '',
        image: null,
        url: '',
        country: '',
        price: '',
        commission: '',
        value: '',
    });

    useEffect(() => {
        dispatch(fetchSingleBuyoutRequest(id));
    }, [dispatch, id]);

    useEffect(() => {
        oneBuyout && setBuyout(prevState => ({
            ...prevState,
            description: oneBuyout.description,
            image: oneBuyout.image,
            url: oneBuyout.url,
            country: oneBuyout.country,
            price: oneBuyout.price || '',
            commission: oneBuyout.commission,
            value: oneBuyout.value || '',
        }));
    }, [oneBuyout]);

    const inputChangeHandler = e => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === 'price') {
            if (e.target.value < 0) {
                value = 0;
                setBuyout(prevState => ({...prevState, [name]: value}));
            }
        }
        setBuyout(prevState => ({...prevState, [name]: value}))
    };

    const submitFormHandler = e => {
        e.preventDefault();
        if (user.role === 'user') {
            const formData = new FormData();
            Object.keys(buyout).forEach(key => {
                formData.append(key, buyout[key]);
            });
            dispatch(editBuyoutRequest({id, obj: formData}));
        } else {
            dispatch(editBuyoutRequest({id, obj: buyout}));
        }

        setBuyout({
            description: "",
            image: null,
            url: "",
            country: "",
            price: '',
            commission: '',
            value: '',
        })
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setBuyout(prevState => {
            return {...prevState, [name]: file};
        });
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    useEffect(() => {
        return () => {
            dispatch(clearBuyoutsError());
        };
    }, [dispatch])

    return (
        <Container
            component="section"
            maxWidth="sm"
            className={classes.container}>
            <Grid
                container
                direction="column"
                spacing={3}
                component="form"
                autoComplete="off"
                onSubmit={submitFormHandler}
                noValidate
            >
                <h3 style={theme.title}>Заказать выкуп</h3>
                <Grid item xs={12} sm={8} md={7} lg={9}>
                    <FormControl variant="outlined" fullWidth error={Boolean(getFieldError('country'))}>
                        <InputLabel id="demo-controlled-open-select-label">Страна</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={buyout?.country}
                            label="Страна"
                            name="country"
                            required
                            onChange={inputChangeHandler}
                        >
                            <MenuItem value={'USA'}>Америка</MenuItem>
                            <MenuItem value={'Turkey'}>Турция</MenuItem>
                            <MenuItem value={'China'}>Китай</MenuItem>
                        </Select>
                        <FormHelperText error={true}>{error?.errors?.['country']?.message}</FormHelperText>
                    </FormControl>
                </Grid>
                <FormElement
                    xs={12} sm={8} md={7} lg={9}
                    disabled={Boolean(user?.role)}
                    required
                    label="Описание товара (размер, цвет и тд.)"
                    name="description"
                    value={buyout.description}
                    onChange={inputChangeHandler}
                    error={getFieldError('description')}
                />
                <FormElement
                    xs={12} sm={8} md={7} lg={9}
                    required
                    label="Ссылка"
                    name="url"
                    value={buyout.url}
                    onChange={inputChangeHandler}
                    error={getFieldError('url')}

                />
                <Grid item xs={12} sm={8} md={7} lg={9}>
                    <FileInput
                        // disabled={show}
                        required
                        label="Скриншот или фото желаемого товара"
                        name="image"
                        onChange={fileChangeHandler}
                        error={Boolean(getFieldError('image'))}
                        helperText={getFieldError('image')}
                    />
                </Grid>
                {(user?.role === 'admin' || user?.role === 'superAdmin') && (
                    <Grid  item xs={12} sm={8} md={7} lg={9}>
                        <Grid container sx={{marginTop: '5px'}} spacing={2}>
                            <FormElement
                                xs={6} sm={4} md={4} lg={4}
                                type="number"
                                required
                                label="Цена за выкуп"
                                name="price"
                                value={buyout.price}
                                onChange={inputChangeHandler}
                                error={getFieldError('price')}
                            />
                            <FormElement
                                xs={6} sm={4} md={4} lg={4}
                                type="number"
                                required
                                label="Комиссия"
                                name="commission"
                                value={buyout.commission}
                                onChange={inputChangeHandler}
                                error={getFieldError('commission')}
                            />
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <FormControl variant="outlined" fullWidth error={Boolean(getFieldError('value'))}>
                                    <InputLabel id="demo-controlled-open-select-label">Валюта</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        value={buyout.value}
                                        label="Валюта"
                                        name="value"
                                        required
                                        onChange={inputChangeHandler}
                                    >
                                        <MenuItem defaultValue=""/>
                                        <MenuItem value={'USD'}><AttachMoneyIcon/>Доллар</MenuItem>
                                        <MenuItem value={'TRY'}><CurrencyLiraIcon/>Лира</MenuItem>
                                        <MenuItem value={'CNY'}><CurrencyYuanIcon/>Юань</MenuItem>
                                    </Select>
                                    <FormHelperText error={true}>{error?.errors?.['value']?.message}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                <Grid item xs={12} sm={8} md={7} lg={9}>
                    <ButtonWithProgress
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        loading={loading}
                        disabled={loading}
                    >
                        Обновить
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditBuyout;