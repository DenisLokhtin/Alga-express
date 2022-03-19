import React, {useEffect, useMemo, useRef, useState} from 'react';
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    ImageList,
    ImageListItem,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import FormElement from "../../components/UI/Form/FormElement";
import {
    clearError,
    editPassportRequest,
    editUserDataRequest,
    fetchUsersRequest,
    userDateRequest
} from "../../store/actions/usersActions";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import PhoneInput from "react-phone-input-2";
import ru from 'react-phone-input-2/lang/ru.json'
import Avatar from "@mui/material/Avatar";
import noImage from '../../assets/images/no_avatar.png';
import {apiURL} from "../../config";
import FileInput from "../../components/UI/FileInput/FileInput";
import Autocomplete from '@mui/material/Autocomplete';

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 768,
        },
    },
});

const useStyles = makeStyles(() => ({
    breakpoints: {
        values: {
            sm: 768,
        },
    },

    container: {
        display: "flex",
        paddingTop: '180px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '95px',
        },
    },

    packageBtnContainer: {
        textAlign: 'center',
    },

    packageMainTitle: {
        textAlign: 'center',
        '@media (max-width:600px)': {
            padding: '10px',
        },
    },

    textField: {
        '&:last-child': {
            marginBottom: '50px',
        },
    },

    phoneField: {
        '&:last-child': {
            marginBottom: '100px',
        },
    },

    submit: {
        margin: '24px 0 16px',
    },

    margin0: {
        margin: 0,
    },

    addButton: {
        position: "relative",
        bottom: '-35px',
    },

    padding: {
        padding: '15px',
        marginTop: '20px',
    }
}));

function ExpandMoreIcon() {
    return null;
}

const UserProfileEdit = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.users.loadUserDate);
    const error = useSelector(state => state.users.userError);
    const userData = useSelector(state => state.users.userDate);
    const user = useSelector(state => state.users.user);
    const users = useSelector(state => state.users.users);

    const [dataUser, setDataUser] = useState({
        name: '',
        email: '',
        avatar: null,
    });
    const [phone, setPhone] = useState([
        {
            number: '',
            type: '',
        }
    ]);
    const [passport, setPassport] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [expanded, setExpanded] = useState('panel1');
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    let imageURL = noImage;
    let imagesPassport = [];

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (user.role === 'user') {
            dispatch(userDateRequest(user._id));
        } else {
            dispatch(fetchUsersRequest());
        }

        return () => {
            dispatch(clearError());
        };
    }, [dispatch, user._id, user.role]);

    useEffect(() => {
        value && dispatch(userDateRequest(value._id));

    }, [dispatch, value]);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        return () => {
            dispatch(clearError());
        };
    }, [dispatch, messagesEndRef]);

    useMemo(() => {
        userData && setDataUser({
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
        });

        userData && setPhone([
            ...userData.phone,
        ]);

        userData && setPassport([...userData.passport]);
    }, [userData]);

    useEffect(() => {
        if (!(phone.length <= 3)) {
            setDisabled(true);
        }
        if (phone.length <= 3) {
            setDisabled(false);
        }

    }, [disabled, phone.length]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setDataUser(prevState => ({...prevState, [name]: value}));
    };

    const inputChangePhoneHandler = (i, name, value) => {
        setPhone(prevState => {
            const copyPhone = {
                ...prevState[i],
                [name]: value,
            }
            return prevState.map((phone, index) => {

                if (i === index) return copyPhone;

                return phone
            });
        })
    };

    const inputPhone = () => {
        setPhone(prevState => [
            ...prevState,
            {
                number: '',
                type: 'PHONE',
            }]);
    };

    const eraseInputPhone = (index) => {
        setPhone(phone.filter((phone, i) => i !== index));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const files = e.target.files;

        if (name === 'avatar') {
            setDataUser(prevState => {
                return {...prevState, [name]: files[0]};
            });
        }

        for (let i = 0; i < files.length; i++) {
            setPassport(prevState => ([
                ...prevState,
                files[i]
            ]))
        }
    };

    const submitFormProfileHandler = e => {
        e.preventDefault();
        let id = null;
        dataUser.phone = JSON.stringify(phone);

        const formData = new FormData();

        Object.keys(dataUser).forEach(key => {
            formData.append(key, dataUser[key]);
        });

        if (user.role === 'admin') {
            id = value._id;
        } else if (user.role === 'user') {
            id = user._id;
        }

        dispatch(editUserDataRequest({id, data: formData}));
    };

    const submitFormPassportHandler = e => {
        e.preventDefault();
        let id = null;
        const formData = new FormData();

        passport.forEach(key => {
            formData.append(`passport`, key);
        });

        if (user.role === 'admin') {
            id = value._id;
        } else if (user.role === 'user') {
            id = user._id
        }
        dispatch(editPassportRequest({id, data: formData}));
    };

    if (dataUser.avatar) {
        imageURL = apiURL + '/' + userData.avatar;
    }

    if (userData && userData.passport) {
        userData.passport.forEach((pas, i) => {
            imagesPassport[i] = apiURL + '/' + pas.image;
        })
    }

    return (
        <Container
            ref={messagesEndRef}
            component="section"
            maxWidth="md"
            className={classes.container}>
            <Grid
                item
                position="relative"
            >
                <Avatar
                    alt="Remy Sharp"
                    src={imageURL}
                    sx={{width: 150, height: 150, margin: '0 auto'}}
                />
            </Grid>

            <Grid container justifyContent="center">
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography
                            variant="h4"
                            sx={{margin: '0 auto'}}
                            className={classes.packageMainTitle}
                        >
                            Профиль пользователя
                        </Typography>
                    </AccordionSummary>
                    {user && user.role === 'admin' ? (<Grid>
                        <Autocomplete
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            name={users}
                            id="usersSelected"
                            options={users}
                            getOptionLabel={(option) => (option.name + ' ' + option.email)}
                            sx={{width: 300}}
                            renderInput={(params) => <TextField {...params} label="Пользователи"/>}
                        />
                    </Grid>) : null}
                    <AccordionDetails>
                        <Grid
                            container
                            item
                            justifyContent='center'
                        >
                            <Grid
                                component="form"
                                onSubmit={submitFormProfileHandler}
                                justifyContent="center"
                                container
                                noValidate
                                spacing={5}
                            >
                                <Grid item xs={12} sm={8} md={7} lg={7}>
                                    <FormElement
                                        name="email"
                                        type="email"
                                        value={dataUser.email}
                                        fullWidth
                                        onChange={inputChangeHandler}
                                        variant="outlined"
                                        label="E-mail"
                                        error={getFieldError('email')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={7} lg={7}>
                                    <FormElement
                                        name="name"
                                        type="text"
                                        value={dataUser.name}
                                        onChange={inputChangeHandler}
                                        fullWidth
                                        variant="outlined"
                                        label="ФИО"
                                        error={getFieldError('name')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={7} md={6} lg={6}>
                                    {phone.map((phone, id) => (
                                        <Box
                                            key={id}
                                            display="flex"
                                            container
                                            flexWrap="nowrap"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid
                                                item
                                                container
                                                // flexGrow={20}
                                                display="flex"
                                                flexWrap="nowrap"
                                                flexDirection='column'
                                                justifyContent="space-between"

                                                className={classes.margin0}
                                            >
                                                <PhoneInput
                                                    style={{'margin': '8px'}}
                                                    country={'kg'}
                                                    localization={ru}
                                                    required
                                                    type="text"
                                                    label="Номер"
                                                    name="number"
                                                    value={phone.number}
                                                    className={classes.phoneField}
                                                    onChange={value => inputChangePhoneHandler(id, 'number', value)}
                                                    error={getFieldError('phone')}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                alignSelf='center'
                                                justifySelf='center'
                                            >
                                                <IconButton
                                                    aria-label="erase"
                                                    className={classes.submit}
                                                    type='button'
                                                    onClick={() => eraseInputPhone(id)}
                                                >
                                                    <DeleteForeverIcon/>
                                                </IconButton>
                                            </Grid>
                                            <Grid
                                                item
                                                alignSelf='center'
                                            >
                                                <FormControl>
                                                    <Select
                                                        defaultValue="PHONE"
                                                        labelId="demo-simple-select-helper-label"
                                                        id="demo-simple-select-helper"
                                                        value={phone.type}
                                                        onChange={e => inputChangePhoneHandler(id, 'type', e.target.value)}
                                                    >
                                                        <MenuItem value="PHONE">Phone</MenuItem>
                                                        <MenuItem value="TELEGRAM">Telegram</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Box>
                                    ))}
                                </Grid>
                                <Grid item
                                      justifySelf='center'
                                      alignSelf='end'
                                >
                                    <IconButton
                                        className={classes.addButton}
                                        aria-label="add"
                                        type='button'
                                        onClick={inputPhone}
                                        disabled={disabled}
                                        error={getFieldError('add')}
                                    >
                                        <AddCircleOutlineTwoToneIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid
                                    item
                                    xs={12} sm={8} md={7} lg={7}
                                >
                                    <label>
                                        Аватар
                                        <FileInput
                                            name="avatar"
                                            type="file"
                                            fullWidth
                                            onChange={fileChangeHandler}
                                            error={getFieldError('avatar')}
                                        >
                                            <Button>Text</Button>
                                        </FileInput>
                                    </label>
                                </Grid>
                                <Grid item xs={12} sm={8} md={7} lg={7}
                                      className={classes.packageBtnContainer}>
                                    <ButtonWithProgress
                                        loading={loading}
                                        disabled={loading}
                                        type="submit"
                                        variant="contained">
                                        <span>Сохранить</span>
                                    </ButtonWithProgress>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography
                                variant="h5"
                                sx={{margin: '0 auto'}}
                                className={classes.packageMainTitle}
                            >
                                Доверенные Лица
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid
                                container
                                item
                                justifyContent='center'
                            >
                                <Grid
                                    component="form"
                                    onSubmit={e => submitFormPassportHandler(e, user._id)}
                                    justifyContent="center"
                                    container
                                    noValidate
                                    spacing={5}
                                >
                                    <Grid
                                        item
                                        xs={12} sm={8} md={8} lg={8}

                                    >
                                        <FileInput
                                            name="image"
                                            type="file"
                                            multiple="multiple"
                                            fullWidth
                                            onChange={fileChangeHandler}
                                            error={getFieldError('passport')}
                                        >

                                        </FileInput>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={7} lg={7}
                                          className={classes.packageBtnContainer}>
                                        <ButtonWithProgress
                                            loading={loading}
                                            disabled={loading}
                                            type="submit"
                                            variant="contained">
                                            Сохранить
                                        </ButtonWithProgress>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Paper
                                        className={classes.padding}
                                    >
                                        <ImageList sx={{maxWidth: 500, minHeight: 450}}>
                                            {imagesPassport.map(passport => (
                                                <Grid item
                                                      key={passport}
                                                >
                                                    <ImageListItem>
                                                        <img
                                                            alt={passport}
                                                            src={`${passport}?w=248&fit=crop&auto=format`}
                                                            srcSet={`${passport}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                        />
                                                    </ImageListItem>
                                                </Grid>
                                            ))}
                                        </ImageList>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
            </Grid>
        </Container>
    );
};

export default UserProfileEdit;