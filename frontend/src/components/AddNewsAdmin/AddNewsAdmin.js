import React, {useState} from "react";
import FormElement from "../../components/UI/Form/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FileInput from "../../components/UI/FileInput/FileInput";
import {useDispatch, useSelector} from "react-redux";
import {Container, Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {addNewsRequest} from "../../store/actions/newsActions";
import {Editor} from "@tinymce/tinymce-react";
import Resizer from "react-image-file-resizer";

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
    title: {
        textAlign: "center",
    }
}));

const AddNewsAdmin = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.news.createLoading);
    const error = useSelector(state => state.news.addError);

    const [news, setNews] = useState({
        title: "",
        image: null,
        description: "",
    });

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
        return new Blob([ia], { type: mimeString });
    };


    const submitFormHandler =  (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(news).forEach(key => {
            formData.append(key, news[key]);
        });
        dispatch(addNewsRequest(formData));
        setNews({
            title: "",
            image: null,
            description: "",
        })
    };


    const inputChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNews(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = async (e) => {
        const name = e.target.name;
        const file = e.target.files[0]
        const image = await resizeFile(file);
        const newFile = dataURIToBlob(image);
        setNews(prevState => {
            return {...prevState, [name]: newFile};
        });
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const handleEditorChange = (content) => {
        console.log(content);
        setNews(prevState => {
            return {...prevState, description: content}
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
                <h3 className={classes.title}>Добавить новость</h3>
                <FormElement
                    required
                    label="Название"
                    name="title"
                    value={news.title}
                    onChange={inputChangeHandler}
                    error={getFieldError('title')}
                />

                <Grid item>
                    <Editor
                        apiKey='rd2sys4x7q7uu8l0tvehv3sl6wisqzs1pp15gvq3jwssgvft'
                        value={news.description}
                        init={{
                            height: 400,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image',
                                'charmap print preview anchor help',
                                'searchreplace visualblocks code',
                                'insertdatetime media table paste wordcount'
                            ],
                            toolbar:
                                'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolory | outdent indent'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </Grid>

                <Grid item xs>
                    <FileInput
                        required
                        label="Добавить картинку"
                        type
                        name="image"
                        onChange={fileChangeHandler}
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
        </Container>
    );
};

export default AddNewsAdmin;