import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {addWareHouseRequest} from "../../store/actions/wareHouseActions";
import FormElement from "../UI/Form/FormElement";
import {useNavigate} from "react-router-dom";
import {Editor} from "@tinymce/tinymce-react";
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

const AddWareHouseAdmin = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.wareHouses.addLoading);
    const error = useSelector(state => state.wareHouses.addError);
    const [wareHouse, setWareHouse] = useState({
        country: '',
        info: '',
    });
    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        const wareHouseData = {};
        Object.keys(wareHouse).forEach(key => {
            formData.append(key, wareHouse[key]);
            wareHouseData[key] = wareHouse[key];
        });
        dispatch(addWareHouseRequest({wareHouseData, navigate}));
        setWareHouse({
            country: '',
            info: '',
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
        setWareHouse(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditorChange = (content) => {
        setWareHouse(prevState => {
            return {...prevState, info: content}
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
                <h3 style={theme.title}>Добавить склад</h3>
                <FormElement
                    required
                    label="Страна"
                    name="country"
                    value={wareHouse.country}
                    onChange={onInputTextareaChange}
                    error={getFieldError('country')}
                />
                <Grid item>
                    <Editor
                        apiKey='jucp3aljkh783o2yj0379rihg44ldm2wgjxvz10pu9i9m7ja'
                        value={wareHouse.info || ''}
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

export default AddWareHouseAdmin;