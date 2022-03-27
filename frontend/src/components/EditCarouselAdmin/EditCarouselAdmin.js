import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {makeStyles} from "@mui/styles";
import {changeCarouselsRequest, fetchOneCarouselsRequest} from "../../store/actions/carouselActions";
import FormElement from "../UI/Form/FormElement";
import FileInput from "../UI/FileInput/FileInput";
import Container from "@mui/material/Container";
import {apiURL} from "../../config";

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    tableContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        marginBottom: '80px'
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

const EditCarouselAdmin = () => {
    const navigate = useNavigate();
    const oneCarousel = useSelector(state => state.carousels.oneCarousel);
    const classes = useStyles();
    const [singleCarousel, setSingleCarousel] = useState({
        info: '',
        picture: '',
    });
    const dispatch = useDispatch();
    const params = useParams();
    const loading = useSelector(state => state.carousels.carouselsLoading);
    const error = useSelector(state => state.carousels.carouselsError);

    useEffect(() => {
        dispatch(fetchOneCarouselsRequest(params.id));

    }, [dispatch, params.id, oneCarousel.info]);

    useEffect(() => {
        oneCarousel && setSingleCarousel({
            info: oneCarousel.info,
            picture: oneCarousel.picture,
        });
    }, [oneCarousel]);

    const changeCarousel = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(singleCarousel).forEach(key => {
            formData.append(key, singleCarousel[key]);
        });
        dispatch(changeCarouselsRequest({formData, carouselId: params.id, navigate}));
    };

    const onInputTextareaChange = e => {
        const {name, value} = e.target;
        setSingleCarousel(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const fileChangeHandler = async (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        if (name === 'picture') {
            setImagePreload(URL.createObjectURL(e.target.files[0]));
        }
        setSingleCarousel(prevState => {
            return {...prevState, [name]: file};
        });
    };

    const [imagePreload, setImagePreload] = useState(null);
    return (
        <div>
            <Container
                component="section"
                maxWidth="md"
                className={classes.container}
                style={{paddingTop: '150px'}}
            >
                <h2>Редактирование изображения для слайдера</h2>
                <Grid
                    component="form"
                    onSubmit={changeCarousel}
                    justifyContent="center"
                    container
                    noValidate
                    spacing={5}
                >
                    <Grid item xs={12}>
                        <FormElement
                            label={singleCarousel.info ? "" : "Заголовок изображения"}
                            required
                            name="info"
                            value={singleCarousel.info || ''}
                            onChange={onInputTextareaChange}
                            error={getFieldError('info')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {imagePreload ?
                            <img src={imagePreload} alt="preview imagePreload"/> :
                            singleCarousel.picture && <img src={apiURL + '/' + singleCarousel.picture} alt={singleCarousel.info}/>
                        }
                    </Grid>

                    <Grid item xs={12}>
                        <FileInput
                            required
                            label="Изменить картинку"
                            type
                            name="picture"
                            onChange={fileChangeHandler}
                        />
                    </Grid>

                    <Grid item xs={3} sm={8} md={3} lg={7}
                          className={classes.submit}>
                        <ButtonWithProgress
                            type="submit"
                            variant="contained"
                            color="success"
                            className={classes.submit}
                            loading={loading}
                            disabled={loading}
                        >
                            Применить
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default EditCarouselAdmin;