import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {Container, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useNavigate, useParams} from "react-router-dom";
import {changeNewsRequest, clearNewsErrors, fetchOneNewsRequest} from "../../store/actions/newsActions";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: '50px',
    },

    newsBtnContainer: {
        textAlign: 'center',
    },

    form: {
        display: 'flex'
    },

  newsMainTitle: {
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

const EditNews = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const oneNews = useSelector(state => state.news.oneNews);
    const error = useSelector(state => state.news.addError);
    const loading = useSelector(state => state.news.singleLoading);

    const [news, setNews] = useState({
        title: '',
        description: '',
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setNews(prevState => ({...prevState, [name]: value}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    useEffect( () => {
        setNews(prev=>({
            ...prev,
            title: oneNews.title,
            description: oneNews.description,
        }));

        dispatch(fetchOneNewsRequest(params.id));
        return () => {
            dispatch(clearNewsErrors());
        };
    }, [dispatch,params.id, oneNews.title, oneNews.description]);

    const changeNews = (e) => {
        e.preventDefault();
        dispatch(changeNewsRequest({news, id: params.id, navigate}));
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
                        className={classes.newsMainTitle}>
                        Редактирование новости
                    </Typography>
                </Grid>
                <Grid
                    component="form"
                    onSubmit={changeNews}
                    justifyContent="center"
                    container
                    noValidate
                    spacing={5}
                >

                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <TextField
                            name="title"
                            value={news.title || ''}
                            onChange={inputChangeHandler}
                            required
                            fullWidth
                            variant="outlined"
                            label="Название"
                            error={Boolean(getFieldError('title'))}
                            helperText={getFieldError('title')}
                        />
                    </Grid>
                    {/*<Grid item xs={12} sm={8} md={7} lg={7}>*/}
                    {/*    <TextField*/}
                    {/*        name="description"*/}
                    {/*        type="text"*/}
                    {/*        value={news.description || ''}*/}
                    {/*        onChange={inputChangeHandler}*/}
                    {/*        fullWidth*/}
                    {/*        required*/}
                    {/*        variant="outlined"*/}
                    {/*        label="Описание"*/}
                    {/*        error={Boolean(getFieldError('description'))}*/}
                    {/*        helperText={getFieldError('description')}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} sm={8} md={7} lg={7}
                          className={classes.newsBtnContainer}>
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            variant="contained">
                           Изменить
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default EditNews;