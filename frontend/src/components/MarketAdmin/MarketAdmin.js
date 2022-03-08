import React, {useState} from "react";
import FormElement from "../../components/UI/Form/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FileInput from "../../components/UI/FileInput/FileInput";
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {addMarketRequest} from "../../store/actions/marketActions";
import theme from "../../theme";

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container:{
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

const MarketAdmin = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.market.createLoading);
    const error = useSelector(state => state.market.createError);

    const [picture, setPicture] = useState({
        title: "",
        image: null,
        url: "",
    });

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(picture).forEach(key => {
            formData.append(key, picture[key]);
        });

        dispatch(addMarketRequest(formData));
        setPicture({
            title: "",
            image: null,
            url: "",
        })
    };

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value=e.target.value;
        setPicture(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setPicture(prevState => {
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

    return (
        <Grid
            container
            direction="column"
            spacing={2}
            component="form"
            autoComplete="off"
            onSubmit={submitFormHandler}
            style={theme.container}
            noValidate
        >
            <h3 style={theme.title}>Добавить в список сайтов</h3>
            <FormElement
                required
                label="Название"
                name="title"
                value={picture.title}
                onChange={inputChangeHandler}
                error={getFieldError('title')}
            />

            <FormElement
                required
                label="Ссылка"
                name="url"
                value={picture.url}
                onChange={inputChangeHandler}
                error={getFieldError('url')}

            />

            <Grid item xs>
                <FileInput
                    required
                    label="Логотип"
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
                    Добавить
                </ButtonWithProgress>
            </Grid>
        </Grid>
    );
};

export default MarketAdmin;