import React, {useEffect, useMemo, useState} from 'react';
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Container, Grid, TextField, Typography,} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import FormElement from "../../components/UI/Form/FormElement";
import {clearError, editUserDataRequest, userDateResponse} from "../../store/actions/usersActions";
import {useParams} from "react-router-dom";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import PhoneInput from "react-phone-input-2";
import ru from 'react-phone-input-2/lang/ru.json'
import Avatar from "@mui/material/Avatar";
import {apiURL} from "../../config";


const useStyles = makeStyles(() => ({
    container: {
        marginTop: '50px',
    },

    packageBtnContainer: {
        textAlign: 'center',
    },

    packageMainTitle: {
        textAlign: 'center',
        paddingBottom: '50px',
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
        margin: theme.spacing(3, 0, 2),
    },
}));

const theme = createTheme();

theme.typography.h4 = {
    fontSize: '1.3rem',
    '@media (min-width:600px)': {
        fontSize: '1.6rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};


const UserProfileEdit = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {id} = useParams();
    const user = useSelector(state => state.users.user);
    const loading = useSelector(state => state.users.loadUserDate);
    const error = useSelector(state => state.users.userError);
    const userDate = useSelector(state => state.users.userDate);

    const [dataUser, setDataUser] = useState({
        name: '',
        email: '',
        avatar: null,
        passport: [],
    });

    const [phone, setPhone] = useState([
        {
            number: '',
            type: '',
        }
    ]);

    let imageURL = null;

    useEffect(async () => {
        dispatch(userDateResponse(id));

        return () => {
            dispatch(clearError());
            setDataUser({
                name: '',
                email: '',
                avatar: null,
                passport: [],
            });
            setPhone([
                {
                    number: '',
                    type: '',
                }
            ]);

        };
    }, [dispatch,
    ]);

    useMemo(() => {
        userDate && setDataUser(prevState => ({
            name: userDate.name,
            email: userDate.email,
            avatar: userDate.avatar,
            passport: userDate.passport,
        }));

        userDate && setPhone(prevState => ([
            ...userDate.phone,
        ]));
    }, [userDate]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setDataUser(prevState => ({...prevState, [name]: value}));
    };

    const inputChangePhoneHandler = (i, name, value) => {
        console.log(i, name, value);
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
        const file = e.target.files[0];
        setDataUser(prevState => {
            return {...prevState, [name]: file};
        });
    };

    const submitFormHandler = e => {
        e.preventDefault();

        dataUser.phone = JSON.stringify(phone);
        dataUser.passport = JSON.stringify(dataUser.passport);

        const formData = new FormData();

        Object.keys(dataUser).forEach(key => {
            formData.append(key, dataUser[key]);
        });
        dispatch(editUserDataRequest({id, data: formData}));
    };

    if (user.avatar) {
        imageURL = apiURL + '/uploads/' + user.avatar;
    }

    return (
        <Container
            component="section"
            maxWidth="md"
            className={classes.container}>
            <Grid>
                <Avatar
                    alt="Remy Sharp"
                    src={imageURL}
                    sx={{width: 150, height: 150}}
                />
            </Grid>
            <Grid item>
                <Typography
                    variant="h4"
                    className={classes.packageMainTitle}>
                    профиль пользователя
                </Typography>
            </Grid>
            <Grid
                component="form"
                onSubmit={submitFormHandler}
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
                <Grid container
                      display="flex"
                      item
                      justifyContent="space-between"
                      xs={12} sm={8} md={7} lg={7}>
                    <Grid item xs={10}>
                        {phone.map((phone, id) => (
                            <Box
                                key={id}
                                display="flex"
                                container
                                flexWrap="nowrap"
                                alignItems="center"
                                justifyContent="space-between"
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
                                        onChange={e => inputChangePhoneHandler(id, 'number', e)}
                                        error={getFieldError('phone')}
                                    />
                                    <IconButton
                                        aria-label="erase"
                                        className={classes.submit}
                                        type='button'
                                        onClick={() => eraseInputPhone(id)}
                                    >
                                        <DeleteForeverIcon/>
                                    </IconButton>
                            </Box>
                        ))}

                    </Grid>
                    <Grid item
                          alignSelf='flex-end'
                    >
                        <IconButton
                            aria-label="add"
                            className={classes.submit}
                            type='button'
                            onClick={inputPhone}
                        >
                            <AddCircleOutlineTwoToneIcon/>
                        </IconButton>
                    </Grid>

                </Grid>

                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <label>
                        Аватар
                        <TextField
                            name="avatar"
                            type="file"
                            fullWidth
                            // value="ВВедите"
                            onChange={fileChangeHandler}
                            error={getFieldError('avatar')}
                        >
                            <Button>Text</Button>
                        </TextField>
                    </label>
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
        </Container>
    );
};

export default UserProfileEdit;