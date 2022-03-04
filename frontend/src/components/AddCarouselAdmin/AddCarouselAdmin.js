import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import FormElement from "../UI/Form/FormElement";
import {useNavigate} from "react-router-dom";
import theme from "../../theme";
import FileInput from "../UI/FileInput/FileInput";
import {addCarouselsRequest} from "../../store/actions/carouselActions";

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

const AddCarouselAdmin = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.carousels.carouselsError);
    const loading = useSelector(state => state.carousels.carouselsLoading);

    const [carousel, setCarousel] = useState({
        info: '',
        picture: null,
    });

    const submitFormHandler = e => {
        // e.preventDefault();
        // const formData = new FormData();
        // const carouselData = {};
        // Object.keys(carousel).forEach(key => {
        //     formData.append(key, carousel[key]);
        //     carouselData[key] = carousel[key];
        // });
        // console.log(carouselData);
        // dispatch(addCarouselsRequest({carouselData, navigate}));
        // setCarousel({
        //     info: '',
        // })

        e.preventDefault();

        const formData = new FormData();
        Object.keys(carousel).forEach(key => {
            formData.append(key, carousel[key]);
        });
        dispatch(addCarouselsRequest({formData, navigate}));
        setCarousel({
            info: "",
            picture: null,
        })
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const onInputTextareaChange = e => {
        const {name, value} = e.target;
        setCarousel(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // const resizeFile = (file) =>
    //     new Promise((resolve) => {
    //         Resizer.imageFileResizer(
    //             file,
    //             300,
    //             400,
    //             "JPEG",
    //             100,
    //             0,
    //             (uri) => {
    //                 resolve(uri);
    //             },
    //             "base64"
    //         );
    //     });

    // const dataURIToBlob = (dataURI) => {
    //     const splitDataURI = dataURI.split(",");
    //     const byteString =
    //         splitDataURI[0].indexOf("base64") >= 0
    //             ? atob(splitDataURI[1])
    //             : decodeURI(splitDataURI[1]);
    //     const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    //     const ia = new Uint8Array(byteString.length);
    //     for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    //     return new Blob([ia], {type: mimeString});
    // };

    const fileChangeHandler = async (e) => {
        const name = e.target.name;
        const file = e.target.files[0]
        // const image = await resizeFile(file);
        // const newFile = dataURIToBlob(image);
        setCarousel(prevState => {
            return {...prevState, [name]: file};
        });
    };

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
                <h3 style={theme.title}>Добавить изображение на слайдер</h3>
                <Grid item xs={12}>
                    {/*<p>Заголовок изображения</p>*/}
                    <FormElement
                        label="Заголовок изображения"
                        required
                        name="info"
                        value={carousel.info}
                        onChange={onInputTextareaChange}
                        error={getFieldError('info')}
                    />
                </Grid>

                <Grid item xs>
                    <FileInput
                        required
                        label="Добавить картинку"
                        type
                        name="picture"
                        onChange={fileChangeHandler}
                    />

                </Grid>

                <Grid item xs={12}>
                    <ButtonWithProgress
                        type="submit"
                        variant="contained"
                        color="success"
                        className={classes.submit}
                        loading={loading}
                        disabled={loading}
                    >
                        Сохранить
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddCarouselAdmin;