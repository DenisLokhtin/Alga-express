import React, {useEffect, useMemo, useState} from 'react';
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
    Typography,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import FormElement from "../../components/UI/Form/FormElement";
import {clearError, editPassportRequest, editUserDataRequest, userDateRequest} from "../../store/actions/usersActions";
import {useParams} from "react-router-dom";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import PhoneInput from "react-phone-input-2";
import ru from 'react-phone-input-2/lang/ru.json'
import Avatar from "@mui/material/Avatar";
import noImage from '../../assets/no_avatar.png';
import {apiURL} from "../../config";
import FileInput from "../../components/UI/FileInput/FileInput";


const useStyles = makeStyles(() => ({
    container: {
        marginTop: '10px',
        paddingBottom: '40px',
        display: "flex"
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
        margin: theme.spacing(3, 0, 2),
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


function ExpandMoreIcon() {
    return null;
}

const UserProfileEdit = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {id} = useParams();
    const loading = useSelector(state => state.users.loadUserDate);
    const error = useSelector(state => state.users.userError);
    const userData = useSelector(state => state.users.userDate);

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

    const [refresh, setRefresh] = useState(true);

    let imageURL = noImage;
    let imagesPassport = [];

    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        dispatch(userDateRequest(id));
        userData && setDataUser(prevState => ({
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
        }));

        userData && setPhone(prevState => ([
            ...userData.phone,
        ]));

        userData && setPassport([...userData.passport]);
        return () => {
            dispatch(clearError());
        };
    }, [dispatch, id]);

    useMemo(() => {
        userData && setDataUser(prevState => ({
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
        }));

        userData && setPhone(prevState => ([
            ...userData.phone,
        ]));

        userData && setPassport([...userData.passport]);
    }, [userData && userData.passport,
        refresh,
    ]);

    useEffect(() => {
        if (!(phone.length <= 3)) {
            setDisabled(true);
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
        dataUser.phone = JSON.stringify(phone);

        const formData = new FormData();

        Object.keys(dataUser).forEach(key => {

            formData.append(key, dataUser[key]);
        });
        dispatch(editUserDataRequest({id, data: formData}));
        setRefresh(!refresh);
    };

    const submitFormPassportHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        passport.forEach(key => {
            formData.append(`passport`, key);
        });

        dispatch(editPassportRequest({id, data: formData}));
        setRefresh(!refresh);
    };

    if (dataUser.avatar) {
        imageURL = apiURL + '/uploads/' + userData.avatar;
    }

    if (userData && userData.passport) {
        userData.passport.forEach((pas, i) => {
            imagesPassport[i] = apiURL + '/uploads/' + pas.image;
        })
    }
    console.log('render');
    return (
        <Container
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
                    sx={{width: 150, height: 150}}
                />
            </Grid>

            <Grid container item>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography
                            variant="h4"
                            className={classes.packageMainTitle}
                        >
                            профиль пользователя
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
                                onSubmit={submitFormProfileHandler}
                                justifyContent="center"
                                container
                                noValidate
                                spacing={5}
                            >
                                <Grid item xs={12} sm={9} md={8} lg={8}>
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
                                <Grid item xs={12} sm={9} md={8} lg={8}>
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
                                <Grid item xs={12} sm={8} md={7} lg={7}>
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
                                                    onChange={e => inputChangePhoneHandler(id, 'number', e)}
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
                                                width="50px"
                                            >
                                                <FormControl sx={{m: 1, minWidth: 120}}>
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
                                        Сохранить
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
                                onSubmit={submitFormPassportHandler}
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
                                    <ImageList sx={{width: 500, height: 450}}>
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
    )
        ;
};

export default UserProfileEdit;