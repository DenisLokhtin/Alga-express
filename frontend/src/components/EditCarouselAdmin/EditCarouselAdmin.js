import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {makeStyles} from "@mui/styles";
import {changeCarouselsRequest, fetchOneCarouselsRequest} from "../../store/actions/carouselActions";
import FormElement from "../UI/Form/FormElement";
import FileInput from "../UI/FileInput/FileInput";
import Resizer from "react-image-file-resizer";
import Container from "@mui/material/Container";

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

    useMemo(() => {
        setSingleCarousel({
            info: oneCarousel.info,
            picture: oneCarousel.picture,
        });
    }, [oneCarousel]);

    const changeCarousel = (e) => {
        e.preventDefault();
        dispatch(changeCarouselsRequest({singleCarousel, carouselId: params.id, navigate}));
    };

    const onInputTextareaChange = e => {
        const {name, value} = e.target;
        console.log(name, value);
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

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                400,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    const dataURIToBlob = (dataURI) => {
        const splitDataURI = dataURI.split(",");
        const byteString =
            splitDataURI[0].indexOf("base64") >= 0
                ? atob(splitDataURI[1])
                : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
        return new Blob([ia], {type: mimeString});
    };

    const fileChangeHandler = async (e) => {
        const name = e.target.name;
        const file = e.target.files[0]
        const image = await resizeFile(file);
        const newFile = dataURIToBlob(image);
        setSingleCarousel(prevState => {
            return {...prevState, [name]: newFile};
        });
    };


    return (
        <div>

            <Container
                component="section"
                maxWidth="md"
                className={classes.container}>

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
                        required
                        label="Заголовок изображения"
                        name="info"
                        value={oneCarousel.info || ''}
                        onChange={onInputTextareaChange}
                        error={getFieldError('info')}
                    />
                    </Grid>

                    <Grid item xs={12}>
                        <FileInput
                            required
                            label="Изменить картинку"
                            type
                            name="picture"
                            onChange={fileChangeHandler}
                            value={oneCarousel.picture || ''}
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