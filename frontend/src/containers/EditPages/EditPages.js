import React, {useEffect, useState} from "react";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {Container, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Editor} from "@tinymce/tinymce-react";
import {changePagesRequest, fetchPagesRequest} from "../../store/actions/pagesAction";

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

const EditPages = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const page = useSelector(state => state.pages.page);

    const [data, setData] = useState({
        page: "",
        text: "",
    });

    useEffect(() => {
        if (!!page) {
            setData({page: page.nameURL, text: page.text});
        }
    }, [page]);

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(changePagesRequest(data));
    };

    const inputChangeHandler = e => {
        dispatch(fetchPagesRequest(e.target.value));

        setData(prevState => {
            return {...prevState, text: page.text};
        });
    };

    const handleEditorChange = (content) => {
        setData(prevState => {
            return {...prevState, text: content}
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
                <h2 className={classes.title}>Отредактировать страницу</h2>

                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-controlled-open-select-label">Страница</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            defaultValue=''
                            label="Страница"
                            name="page"
                            required
                            onChange={inputChangeHandler}
                        >
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={'rules'}>Правила</MenuItem>
                            <MenuItem value={'about'}>О нас</MenuItem>
                            <MenuItem value={'contacts'}>Контакты</MenuItem>
                            <MenuItem value={'how'}>Как это работает?</MenuItem>
                            <MenuItem value={'faq'}>FAQ</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <Editor
                        apiKey='rd2sys4x7q7uu8l0tvehv3sl6wisqzs1pp15gvq3jwssgvft'
                        value={data.text}
                        init={{
                            height: 600,
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

                <Grid item xs={12}>
                    <ButtonWithProgress
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Изменить
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditPages;