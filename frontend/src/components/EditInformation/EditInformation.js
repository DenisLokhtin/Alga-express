import React, {useEffect, useRef, useState} from "react";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {Container, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Editor} from "@tinymce/tinymce-react";
import {createTheme} from "@mui/material/styles";
import {changeInformationRequest, fetchInformationRequest} from "../../store/actions/informationActions";

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

    container: {
        width: "90%",
        margin: "0 auto",
        marginTop: '16px',
        paddingTop: '170px',
        [theme.breakpoints.up('sm')]: {
            width: '60%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: '90px',
        },
    },
}));

const EditPages = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const information = useSelector(state => state.information.information);

    const [data, setData] = useState({
        information: "",
        text: "",
    });

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }
        if (!!information) {
            setData({information: information.name, text: information.text});
        }
    }, [information, messagesEndRef]);

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(changeInformationRequest(data));
    };

    const inputChangeHandler = e => {
        dispatch(fetchInformationRequest(e.target.value));

        setData(prevState => {
            return {...prevState, text: information.text};
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
            ref={messagesEndRef}
            className={classes.container}
            style={{textAlign: 'center'}}
        >
            <Grid
                container
                direction="column"
                spacing={2}
                component="form"
                autoComplete="off"
                onSubmit={submitFormHandler}
                noValidate
            >
                <h2 style={theme.title}>Отредактировать информацию</h2>

                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-controlled-open-select-label">Информация</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            defaultValue=''
                            label="Страница"
                            name="information"
                            required
                            onChange={inputChangeHandler}
                        >
                            <MenuItem value={''}/>
                            <MenuItem value={'schedule'}>График работы</MenuItem>
                            <MenuItem value={'officeAdress'}>Адрес офиса</MenuItem>
                            <MenuItem value={'warehouseAddresses'}>Адреса Складов</MenuItem>
                            <MenuItem value={'contacts'}>Контакты</MenuItem>
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
                                'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullinformation | forecolor backcolory | outdent indent'
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
                        sx={{marginBottom: '30px'}}
                    >
                        Изменить
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditPages;