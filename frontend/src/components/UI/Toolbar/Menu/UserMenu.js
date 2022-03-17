import React, {useState} from 'react';
import {Box, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem} from "@mui/material";
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
import {logout} from "../../../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import Fade from '@mui/material/Fade';
import {
    addFlightAdmin,
    addPaymentHandler,
    addUserPayment,
    adminPagePath,
    cargoCreateUser,
    editInformation,
    editPages,
    editUserProfile,
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
import {makeStyles} from "@mui/styles";
import {apiURL} from "../../../../config";

const userSettings = [
    {url: editUserProfile, title: 'Личный кабинет', icon: <ManageAccountsIcon/>},
    {url: packageHistory, title: 'История заказов', icon: <HistoryIcon/>},
    {url: newPackageRegister, title: 'Оформить заказ', icon: <AddIcon/>},
    {url: orderBuyouts, title: 'Заказать выкуп', icon: <ShoppingCartIcon/>},
    {url: listBuyouts, title: 'Список заказов', icon: <FactCheckIcon/>},
    {url: addUserPayment, title: 'Пополнить баланс', icon: <PaidIcon/>},
    {url: userPaymentsList, title: 'История пополнения', icon: <HistoryIcon/>},
    {url: packageInfo, title: 'Информация доставки', icon: <InfoIcon/>},
];

const superAdminSettings = [
    {url: editUserProfile, title: 'Личный кабинет', icon: <ManageAccountsIcon/>},
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
    {url: processingTrackNumbersAdmin, title: 'Смена статуса посылок', icon: <EditIcon/>},
    {url: editInformation, title: 'Редактировать информацию', icon: <EditIcon/>},
];

const warehousemanSetting = [
    {url: processingTrackNumbersAdmin, title: 'Смена статуса посылок', icon: <EditIcon/>},
];

const adminSettings = [
    {url: editUserProfile, title: 'Личный кабинет пользователей', icon: <ManageAccountsIcon/>},
    {url: adminPagePath, title: 'Администратор', icon: <ManageAccountsIcon/>},
    {url: packageHistory, title: 'История всех заказов', icon: <HistoryIcon/>},
    {url: listFlightAdmin, title: 'Рейсы', icon: <FlightIcon/>},
    {url: addFlightAdmin, title: 'Добавить рейс', icon: <AddIcon/>},
    {url: listPaymentsAdmin, title: 'Список пополнений', icon: <FactCheckIcon/>},
    {url: editPages, title: 'Редактировать страницы', icon: <EditIcon/>},
    {url: addPaymentHandler, title: 'Пополнение баланса пользователя', icon: <PaidIcon/>},
    {url: listBuyouts, title: 'Список заказов', icon: <FactCheckIcon/>},
    {url: processingTrackNumbersAdmin, title: 'Смена статуса посылок', icon: <EditIcon/>},
    {url: editInformation, title: 'Редактировать информацию', icon: <EditIcon/>},
];

const useStyles = makeStyles(theme => ({
    test: {
        zIndex: '2',
        minWidth: '407px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            minWidth: '0',
        },
    },
}));

const UserMenu = ({user}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const users = useSelector(state => state.users.user);
    const total = useSelector(state => state.users.total);

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

    return (
        <Grid className={classes.test}>
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
                        <Avatar src={apiURL + '/' + user?.avatar}/>
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