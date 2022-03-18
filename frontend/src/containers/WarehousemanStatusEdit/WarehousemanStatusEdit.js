import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Container,
    FormControl,
    Grid,
    InputLabel,
    List, ListItem, ListItemIcon, ListItemText,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import {changeStatusesRequest, clearTextFieldsErrors} from "../../store/actions/packageRegisterActions";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FormElement from "../../components/UI/Form/FormElement";
import {createTheme} from "@mui/material/styles";

const menuItems = [
    {value: 'REGISTERED', text: 'Оформлен'},
    {value: 'ON_WAREHOUSE', text: 'На складе'},
    {value: 'ON_WAY', text: 'Вылетел'},
    {value: 'PROCESSED', text: 'Обрабатывается'},
    {value: 'DELIVERED', text: 'Готово к выдаче'},
    {value: 'DONE', text: 'Выдано'},
];

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 786,
        },
    },
});


const useStyles = makeStyles(() => ({
    breakpoints: {
        values: {
            sm: 786,
        },
    },

    container: {
        textAlign: 'center',
        paddingTop: '175px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '100px',
        },
    },

    btnContainer: {
        textAlign: 'center',
    },

    notFoundTrackNumbersContainer: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        padding: '30px 0',
        fontSize: '15px',
    },

    notFoundTitleContainer: {
        marginBottom: '30px',
        padding: '0px',
    },
}));

const WarehousemanStatusEdit = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const notFoundTrackNumbers = useSelector(state => state.package.notFoundTrackNumbers);
    const error = useSelector(state => state.package.changeStatusesError);
    const loading = useSelector(state => state.package.changeStatusesLoading);

    const [packageStatus, setPackageStatus] = useState({
        status: '',
        trackNumbers: '',
    });

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const onInputChange = e => {
        const {name, value} = e.target;
        setPackageStatus(prevState => ({...prevState, [name]: value}));
    };

    const submit = e => {
        e.preventDefault();
        dispatch(changeStatusesRequest(packageStatus));
    };

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        return () => {
            dispatch(clearTextFieldsErrors());
        };
    }, [dispatch, messagesEndRef]);

    return (
        <Container ref={messagesEndRef} className={classes.container} maxWidth="md" style={{textAlign: 'center'}}>
            <Grid container component="form" onSubmit={submit} justifyContent="center" spacing={4}>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-controlled-open-select-label" required>Выберите статус
                            трек-номеров</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={packageStatus.status}
                            name="status"
                            required
                            onChange={onInputChange}
                        >
                            {menuItems.map(menuItem => (
                                <MenuItem key={menuItem.value} value={menuItem.value}>
                                    {menuItem.text}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormElement
                        name="trackNumbers"
                        value={packageStatus.trackNumbers}
                        onChange={onInputChange}
                        variant="outlined"
                        label="Введите трек-номера"
                        multiline
                        error={getFieldError('trackNumber')}
                        minRows={3}
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7} className={classes.btnContainer}>
                    <ButtonWithProgress
                        variant="contained"
                        type="submit"
                        loading={loading}
                        disabled={loading}
                    >
                        Обновить статус заказов
                    </ButtonWithProgress>
                </Grid>
                {notFoundTrackNumbers.length > 0 ? (
                    <>
                        <Grid item xs={12} sm={8} md={7} lg={7} className={classes.notFoundTitleContainer}>
                            <Typography variant="h4" align='center' mb={4}>Не найденные трек-номера</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={7} lg={7} mb={4}
                              className={classes.notFoundTrackNumbersContainer}>
                            <List>
                                {notFoundTrackNumbers.map(packageInfo => (
                                    <ListItem key={packageInfo.trackNumber}>
                                        <ListItemIcon>
                                            <WarningAmberOutlinedIcon/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primaryTypographyProps={{fontSize: '1.3em'}}
                                            primary={`Трек-Номер`}
                                            secondary={`${packageInfo.trackNumber}`}
                                            secondaryTypographyProps={{fontSize: '1.2em'}}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </>
                ) : null}
            </Grid>
        </Container>
    );
};

export default WarehousemanStatusEdit;