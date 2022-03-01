import React, {useEffect, useMemo, useState} from 'react';
import {Box, Divider, FormControlLabel, Grid, IconButton, ListItemIcon, Menu, MenuItem, Switch} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {Logout} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HistoryIcon from "@mui/icons-material/History";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from '@mui/icons-material/Notifications';
import FlightIcon from "@mui/icons-material/Flight";
import {changeNotificationRequest, logout, switchNotificationRequest} from "../../../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import Fade from '@mui/material/Fade';
import {
    addFlightAdmin,
    addPaymentHandler,
    addUserPayment,
    adminPagePath, cargoCreateUser,
    editingSingleTrackNumber,
    editPages,
    listBuyouts,
    listFlightAdmin,
    listPaymentsAdmin,
    newPackageRegister,
    orderBuyouts,
    packageHistory,
    packageInfo,
    processingTrackNumbersAdmin,
    userPaymentsList
} from "../../../../paths";
import Avatar from "@mui/material/Avatar";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import InfoIcon from '@mui/icons-material/Info';

const userSettings = [
    {url: '', title: 'Личный кабинет', icon: <ManageAccountsIcon/>},
    {url: packageHistory, title: 'История заказов', icon: <HistoryIcon/>},
    {url: newPackageRegister, title: 'Оформить заказ', icon: <AddIcon/>},
    {url: orderBuyouts, title: 'Заказать выкуп', icon: <ShoppingCartIcon/>},
    {url: listBuyouts, title: 'Список заказов', icon: <FactCheckIcon/>},
    {url: addUserPayment, title: 'Пополнить баланс', icon: <PaidIcon/>},
    {url: userPaymentsList, title: 'История пополнения', icon: <HistoryIcon/>},
    {url: packageInfo, title: 'Информация доставки', icon: <InfoIcon/>},
];

const superAdminSettings = [
    {url: '', title: 'Личный кабинет', icon: <ManageAccountsIcon/>},
    {url: packageHistory, title: 'История всех заказов', icon: <HistoryIcon/>},
    {url: newPackageRegister, title: 'Оформить заказ', icon: <AddIcon/>},
    {url: cargoCreateUser, title: 'Создать пользователя', icon: <AddIcon/>},
    {url: orderBuyouts, title: 'Заказать выкуп', icon: <ShoppingCartIcon/>},
    {url: listBuyouts, title: 'Список заказов', icon: <FactCheckIcon/>},
    {url: addUserPayment, title: 'Пополнить баланс', icon: <PaidIcon/>},
    {url: userPaymentsList, title: 'История пополнения', icon: <HistoryIcon/>},
    {url: packageInfo, title: 'Информация доставки', icon: <InfoIcon/>},
    {url: adminPagePath, title: 'Администратор', icon: <ManageAccountsIcon/>},
    {url: listFlightAdmin, title: 'Рейсы', icon: <FlightIcon/>},
    {url: addFlightAdmin, title: 'Добавить рейс', icon: <AddIcon/>},
    {url: listPaymentsAdmin, title: 'Список пополнений', icon: <FactCheckIcon/>},
    {url: editPages, title: 'Редактировать страницы', icon: <EditIcon/>},
    {url: addPaymentHandler, title: 'Пополнение баланса пользователя', icon: <PaidIcon/>},
    {url: editingSingleTrackNumber, title: 'Смена статуса одной посылки', icon: <EditIcon/>},
    {url: processingTrackNumbersAdmin, title: 'Смена статуса посылок', icon: <EditIcon/>},
];

const warehousemanSetting = [
    {url: editingSingleTrackNumber, title: 'Смена статуса одной посылки', icon: <EditIcon/>},
    {url: processingTrackNumbersAdmin, title: 'Смена статуса посылок', icon: <EditIcon/>},
];

const adminSettings = [
    {url: adminPagePath, title: 'Администратор', icon: <ManageAccountsIcon/>},
    {url: listFlightAdmin, title: 'Рейсы', icon: <FlightIcon/>},
    {url: addFlightAdmin, title: 'Добавить рейс', icon: <AddIcon/>},
    {url: listPaymentsAdmin, title: 'Список пополнений', icon: <FactCheckIcon/>},
    {url: editPages, title: 'Редактировать страницы', icon: <EditIcon/>},
    {url: addPaymentHandler, title: 'Пополнение баланса пользователя', icon: <PaidIcon/>},
    {url: listBuyouts, title: 'Список заказов', icon: <FactCheckIcon/>},
    {url: editingSingleTrackNumber, title: 'Смена статуса одной посылки', icon: <EditIcon/>},
    {url: processingTrackNumbersAdmin, title: 'Смена статуса посылок', icon: <EditIcon/>},
];
const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [not, setNot] = useState(false);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const users = useSelector(state => state.users.user);
    const notification = useSelector(state => state.users.notification);
    const total = useSelector(state => state.users.total);

    useEffect(() => {
        dispatch(switchNotificationRequest());
    }, [dispatch]);

    useMemo(() => {
        setNot(notification);
    }, [notification]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toLogOut = () => {
        setAnchorEl(false);
        dispatch(logout());
        navigate('/');
    };

    const changeSwitchNotification = () => {
        dispatch(changeNotificationRequest(!not));
    };

    return (
        <Grid container alignItems="center" justifyContent="space-evenly">
            <Grid item>
            {users?.role === 'admin' &&
                <IconButton
                    sx={{color: '#F5F5F7',}}
                    size="small"
                    component={Link}
                    to={listPaymentsAdmin}
                >
                    <Badge badgeContent={total} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>}
                <FormControlLabel control={<Switch checked={not} onChange={changeSwitchNotification}/>} label="Оповещение" />

            </Grid>

            <Grid item>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {user.name[0]}
                    </Avatar>
                </IconButton>

                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Box sx={{padding: "6px 16px", display: "flex", alignItems: "center", alignContent: "start"}}>
                        <Avatar src={user?.avatar}/>
                        <Box marginLeft={2}>
                            <Typography>
                                {user.name}
                            </Typography>
                            <Typography>
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider/>

                    {user.role === 'admin' && adminSettings.map(setting => (

                        <MenuItem
                            key={setting.title}
                            component={Link}
                            to={setting.url}
                        >
                            <ListItemIcon>
                                {setting.icon}
                            </ListItemIcon>
                            <Typography textAlign="center">{setting.title}</Typography>
                        </MenuItem>
                    ))}
                    {user.role === 'superAdmin' && superAdminSettings.map(setting => (
                        <MenuItem
                            key={setting.title}
                            component={Link}
                            to={setting.url}
                        >
                            <ListItemIcon>
                                {setting.icon}
                            </ListItemIcon>
                            <Typography textAlign="center">{setting.title}</Typography>
                        </MenuItem>
                    ))}
                    {user.role === 'warehouseman' && warehousemanSetting.map(setting => (
                        <MenuItem
                            key={setting.title}
                            component={Link}
                            to={setting.url}
                        >
                            <ListItemIcon>
                                {setting.icon}
                            </ListItemIcon>
                            <Typography textAlign="center">{setting.title}</Typography>
                        </MenuItem>
                    ))}
                    {user.role === 'user' &&
                        <div>
                            {userSettings.map((setting) => (
                                <MenuItem
                                    key={setting.title}
                                    component={Link}
                                    to={setting.url}
                                >
                                    <ListItemIcon>
                                        {setting.icon}
                                    </ListItemIcon>
                                    <Typography textAlign="center">{setting.title}</Typography>
                                </MenuItem>
                            ))}

                            <Divider/>
                            <MenuItem>
                                <ListItemIcon>
                                    <AccountBalanceWalletIcon/>
                                </ListItemIcon>
                                Ваш баланс {user?.balance + ' сом'}
                            </MenuItem>
                            <Divider/>
                        </div>}

                    <MenuItem onClick={toLogOut}>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Выйти
                    </MenuItem>
                </Menu>
            </Grid>
        </Grid>
    );
};

export default UserMenu;