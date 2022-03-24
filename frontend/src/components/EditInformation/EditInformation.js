import React, {useEffect, useRef, useState} from "react";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {Container, FormControl, Grid, InputLabel, MenuItem, Select, TextareaAutosize} from "@mui/material";
import {makeStyles} from "@mui/styles";
import FormElement from "../UI/Form/FormElement";
import {createTheme} from "@mui/material/styles";
import {changeInformationRequest} from "../../store/actions/informationActions";

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
    const information = useSelector(state => state.information.allInformation);
    const [data, setData] = useState('');
    const [changedArr, setChangeArr] = useState({
        information: '',
        text: [],
    });

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 250);
        }

        let arr = information.filter(item => item.name === data);
        if (arr.length !== 0) {
            setChangeArr(prevState => {
                return {...prevState, text: [...arr[0].text], information: data}
            });
        }
    }, [messagesEndRef, information, data]);

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(changeInformationRequest(changedArr));
    };

    const inputChangeHandler = e => {
        setData(e.target.value);
    };

    const handleEditorChange = (e, i) => {
        const copyArr = [...changedArr.text];
        copyArr[i] = e.target.value;
        setChangeArr(prevState => {
            return {...prevState, text: [...copyArr]};
        });
    };

    const printInputs = (name) => {
        const days = ['Пн:', 'Вт:', 'Ср:', 'Чт:', 'Пт:', 'Сб:', 'Вс:'];

        if (information.length !== 0 && name) {
            if (name === 'schedule') {
                return (
                    changedArr.text.map((item, index) => {
                        return (
                            <FormElement
                                type="text"
                                key={index}
                                label={days[index]}
                                name="schedule"
                                value={changedArr.text[index]}
                                required={true}
                                onChange={(e) => handleEditorChange(e, index)}
                            />
                        )
                    })
                )
            } else {
                return (
                    changedArr.text.map((item, index) => {
                        return (
                            <TextareaAutosize name="info" style={{height: '100px', marginLeft: '10px'}} id="info"
                                              onChange={(e) => handleEditorChange(e, index)}
                                              value={changedArr.text[index]} key={index}/>
                        )
                    })
                )
            }
        }
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
                    <FormControl variant="outlined" fullWidth>
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
                            <MenuItem value={'contacts'}>Контакты</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid
                    container spacing={2} direction="column"
                    style={{'marginBottom': '15px', 'marginTop': '15px', 'marginLeft': '5px'}}
                >
                    {printInputs(data)}
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