import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Grid, TextareaAutosize, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {addWareHouseRequest} from "../../store/actions/wareHouseActions";
import FormElement from "../UI/Form/FormElement";
import {useNavigate} from "react-router-dom";

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

const AddWareHouseAdmin = () => {
    const [inputList, setInputList] = useState([{newField: "", newValue: ""}]);

    const navigate = useNavigate();

    const handleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };


    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.news.createLoading);
    const error = useSelector(state => state.news.addError);

    const [news, setNews] = useState({
        title: "",
        image: null,
        description: "",
    });


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
            console.log('Ключ: ' + key)
            console.log('Значение: ' + wareHouse[key])
        });
        console.log('Перед отправкой запроса: ' + wareHouseData);
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

    console.log(wareHouse);

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
                <h3 className={classes.title}>Добавить склад</h3>

                {/*<div className="country">*/}
                {/*    <p><label htmlFor="Country" className="country">Страна</label></p>*/}
                {/*    <input*/}
                {/*        className="form"*/}
                {/*        name="country"*/}
                {/*        type="text"*/}
                {/*        value={wareHouse.country}*/}
                {/*        onChange={onInputTextareaChange}*/}
                {/*    />*/}
                {/*</div>*/}

                <FormElement
                    required
                    label="Страна"
                    name="country"
                    value={wareHouse.country}
                    onChange={onInputTextareaChange}
                    error={getFieldError('country')}
                />
                <br/>
                {/*<TextareaAutosize*/}
                {/*    required*/}
                {/*    aria-label="Сведения"*/}
                {/*    placeholder="Добавьте сведения о складе"*/}
                {/*    minRows={10}*/}
                {/*    name="info"*/}
                {/*    value={wareHouse.info}*/}
                {/*    onChange={onInputTextareaChange}*/}
                {/*    error={getFieldError('info')}*/}
                {/*/>*/}
                <FormElement
                    label="Сведения о складе"
                    required
                    name="info"
                    value={wareHouse.info}
                    onChange={onInputTextareaChange}
                    error={getFieldError('info')}
                />
                {/*<div>*/}
                {/*    <p><label htmlFor="Description" className="description">Данные по складу</label></p>*/}
                {/*    <textarea*/}
                {/*        name="info"*/}
                {/*        value={wareHouse.info}*/}
                {/*        onChange={onInputTextareaChange} cols="55" rows="5"*/}
                {/*        className="form"/>*/}
                {/*</div>*/}

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