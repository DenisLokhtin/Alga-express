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
import {statuses} from "../../dataLocalization";
import {getFlightsRequest} from "../../store/actions/flightActions";
import dayjs from "dayjs";

const menuItems = [
    {value: 'REGISTERED'},
    {value: 'ON_WAREHOUSE'},
    {value: 'ON_WAY'},
    {value: 'DELIVERED'},
    {value: 'DONE'},
];

const warehousemanMenuItems = [
    {value: 'ON_WAREHOUSE'},
    {value: 'ON_WAY'},
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
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const notFoundTrackNumbers = useSelector(state => state.package.notFoundTrackNumbers);
    const flights = useSelector(state => state.flights.flights);
    const error = useSelector(state => state.package.changeStatusesError);
    const loading = useSelector(state => state.package.changeStatusesLoading);

    const [packageStatus, setPackageStatus] = useState({
        status: '',
        trackNumbers: '',
    });

    const [flightSelect, setFlightSelect] = useState({id: ''});

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

    const onFlightChange = e => {
        const {name, value} = e.target;
        setFlightSelect(prevState => ({...prevState, [name]: value}));
    };

    const submit = e => {
        e.preventDefault();
        dispatch(changeStatusesRequest({...packageStatus, ...flightSelect}));
    };

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!!messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth'
            }, 200);
        }
        dispatch(getFlightsRequest({page: 0, limit: 100, status: 'ACTIVE'}));
        return () => {
            dispatch(clearTextFieldsErrors());
        };
    }, [dispatch, messagesEndRef]);

    return (
        <Container ref={messagesEndRef} className={classes.container} maxWidth="md">
            <Grid container component="form" onSubmit={submit} justifyContent="center" spacing={3}>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: {
                                xs: '18px',
                                sm: '20px',
                                md: '22px',
                                lg: '26px',
                            }
                        }}>
                        Смена статуса посылок
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-controlled-open-select-label" required>Выберите статус
                            трек-номеров</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            label="Выберите статус трек-номеров"
                            value={packageStatus.status}
                            name="status"
                            required
                            onChange={onInputChange}
                        >
                            {user?.role === 'admin' || user?.role === 'superAdmin' ? (
                                menuItems.map(menuItem => {
                                    return (
                                        <MenuItem key={menuItem.value} value={menuItem.value}>
                                            {statuses[menuItem.value]}
                                        </MenuItem>
                                    )
                                })
                            ) : (
                                warehousemanMenuItems.map(menuItem => (
                                    <MenuItem key={menuItem.value} value={menuItem.value}>
                                        {statuses[menuItem.value]}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={8} md={7} lg={7}>
                    {packageStatus.status === 'ON_WAY' ? (
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Номер Рейса</InputLabel>
                            <Select
                                name="id"
                                label="Номер Рейса"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={flightSelect.id}
                                onChange={onFlightChange}
                            >
                                {flights.map(flight => (
                                    <MenuItem key={flight._id} value={flight._id}>
                                        {`"Номер Рейса": ${flight.number} | "Дата Вылета": ${dayjs(flight.depart_date).format('DD-MM-YYYY')}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : null}
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