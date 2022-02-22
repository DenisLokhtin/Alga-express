import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import FormElement from "../UI/Form/FormElement";
import FileInput from "../UI/FileInput/FileInput";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {makeStyles} from "@mui/styles";
import {addBuyoutRequest, clearBuyoutsError} from "../../store/actions/buyoutActions";
import theme from "../../theme";


const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        width: "90%",
        margin: "0 auto",
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            width: '60%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
    },
}));


const Buyout = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.buyouts.createLoading);
    const error = useSelector(state => state.buyouts.createError);


    const [buyout, setBuyout] = useState({
        description: "",
        image: null,
        url: "",
        country:"",
    });

    // useEffect(()=>{
    //         oneBuyout && setBuyout(prevState => ({
    //             ...prevState,
    //             description: oneBuyout.description,
    //             image: oneBuyout.image,
    //             url: oneBuyout.url,
    //             country:oneBuyout.country,
    //         }))
    // },[oneBuyout.description,oneBuyout.url, oneBuyout.image, oneBuyout.country])

    console.log(buyout);

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(buyout).forEach(key => {
            formData.append(key, buyout[key]);
        });

        console.log(formData);
        console.log(buyout);

        dispatch(addBuyoutRequest(formData));
        setBuyout({
            description: "",
            image: null,
            url: "",
            country: "",
        })
    };


    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setBuyout(prevState => {
            return {...prevState, [name]: value};
        });
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

    useEffect(()=>{
        return () => {
            dispatch(clearBuyoutsError());
        };
    },[dispatch])

    return (
        <Container
            component="section"
            maxWidth="md"
            className={classes.container}>
            <Grid
                container
                direction="column"
                spacing={2}
                component="form"
                autoComplete="off"
                onSubmit={submitFormHandler}
                noValidate
            >
                <h3 style={theme.title}>Заказать выкуп</h3>
                <FormControl variant="standard" fullWidth error={Boolean(getFieldError('country'))}>
                    <InputLabel id="demo-controlled-open-select-label">Страна</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={buyout.country}
                        label="Из какой страны выкупить"
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
                <FormElement
                    required
                    label="Описание товара (размер, цвет и тд.)"
                    name="description"
                    value={buyout.description}
                    onChange={inputChangeHandler}
                    error={getFieldError('description')}
                />

                <FormElement
                    required
                    label="Ссылка"
                    name="url"
                    value={buyout.url}
                    onChange={inputChangeHandler}
                    error={getFieldError('url')}

                />

                <Grid item xs>
                    <FileInput
                        required
                        label="Скриншот или фото желаемого товара"
                        name="image"
                        onChange={fileChangeHandler}
                        error={Boolean(getFieldError('image'))}
                        helperText={getFieldError('image')}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ButtonWithProgress
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        loading={loading}
                        disabled={loading}
                    >
                        Заказать
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Buyout;