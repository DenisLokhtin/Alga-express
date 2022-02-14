import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {addNewsRequest} from "../../store/actions/newsActions";

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


    const handleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };


    // const handleRemoveClick = index => {
    //     const list = [...inputList];
    //     list.splice(index, 1);
    //     setInputList(list);
    // };
    //
    // const handleAddClick = () => {
    //     setInputList([...inputList, {newField: "", newValue: ""}]);
    // };

    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.news.createLoading);
    const error = useSelector(state => state.news.addError);

    const [news, setNews] = useState({
        title: "",
        image: null,
        description: "",
    });


    const [quoteBody, setQuoteBody] = useState({
        country: '',
        info: '',
    });

    const submitFormHandler = e => {
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


    // const inputChangeHandler = e => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setNews(prevState => {
    //         return {...prevState, [name]: value};
    //     });
    // };

    // const fileChangeHandler = e => {
    //     const name = e.target.name;
    //     const file = e.target.files[0];
    //     setNews(prevState => {
    //         return {...prevState, [name]: file};
    //     });
    // };

    const onInputTextareaChange = e => {
        const {name, value} = e.target;
        setQuoteBody(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // const getFieldError = fieldName => {
    //     try {
    //         return error.errors[fieldName].message;
    //     } catch (e) {
    //         return undefined;
    //     }
    // };

    // const handleEditorChange = (content) => {
    //     console.log(content);
    //     setNews(prevState => {
    //         return {...prevState, description: content}
    //     });
    // };

    const addWareHouse = () => {
        addNewsRequest({
            country: quoteBody.country,
            info: quoteBody.info,
        });
    }

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
            </Grid>

            <form>
                <div className="country">
                    <p><label htmlFor="Country" className="country">Страна</label></p>
                    <input
                        className="form"
                        name="country"
                        type="text"
                        value={quoteBody.country}
                        onChange={onInputTextareaChange}
                    />
                </div>
                <div>
                    <p><label htmlFor="Description" className="description">Данные по складу</label></p>
                    <textarea
                        name="info"
                        value={quoteBody.info}
                        onChange={onInputTextareaChange} cols="55" rows="5"
                        className="form"/>
                </div>
                <button onClick={addWareHouse} className="Button" type="button">Сохранить</button>
            </form>
        </Container>
    );
};

export default AddWareHouseAdmin;