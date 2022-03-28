import React, {useState} from 'react';
import {Box, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import {Logout} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from '@mui/icons-material/Notifications';
import FlightIcon from "@mui/icons-material/Flight";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
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
    editPages, editTariffGroup,
    editUserProfile,
    listFlightAdmin,
    newPackageRegister,
    orderBuyouts,
    processingTrackNumbersAdmin,
    root,
    userPage,
} from "../../../../paths";
import Avatar from "@mui/material/Avatar";
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import HomeIcon from '@mui/icons-material/Home';
import {makeStyles} from "@mui/styles";
import {apiURL} from "../../../../config";
import {createTheme} from "@mui/material/styles";

const userSettings = [
    {url: editUserProfile, title: 'Мой профиль', icon: <ManageAccountsIcon/>},
    {url: userPage, title: 'Мой кабинет', icon: <HomeIcon/>},
    // {url: packageHistory, title: 'История заказов', icon: <HistoryIcon/>},
    {url: newPackageRegister, title: 'Оформить заказ', icon: <AddIcon/>},
    {url: orderBuyouts, title: 'Заказать выкуп', icon: <ShoppingCartIcon/>},
    // {url: listBuyouts, title: 'Список заказов', icon: <FactCheckIcon/>},
    {url: addUserPayment, title: 'Пополнить баланс', icon: <PaidIcon/>},
    // {url: packageInfo, title: 'Информация доставки', icon: <InfoIcon/>},
];

const superAdminSettings = [
    {url: adminPagePath, title: 'Администратор', icon: <ManageAccountsIcon/>},
    {url: editUserProfile, title: 'Профиль пользователей', icon: <ManageAccountsIcon/>},
    // {url: packageHistory, title: 'История всех заказов', icon: <HistoryIcon/>},
    // {url: newPackageRegister, title: 'Оформить заказ', icon: <AddIcon/>},
    // {url: orderBuyouts, title: 'Заказать выкуп', icon: <ShoppingCartIcon/>},
    // {url: listBuyouts, title: 'Список заказов', icon: <FactCheckIcon/>},
    // {url: addUserPayment, title: 'Пополнить баланс', icon: <PaidIcon/>},
    // {url: packageInfo, title: 'Информация доставки', icon: <InfoIcon/>},
    {url: listFlightAdmin, title: 'Рейсы', icon: <FlightIcon/>},
    {url: editTariffGroup, title: 'Тарифы', icon: <ContentPasteSearchIcon/>},
    {url: addFlightAdmin, title: 'Добавить рейс', icon: <AddIcon/>},
    // {url: listPaymentsAdmin, title: 'Список пополнений', icon: <FactCheckIcon/>},
    {url: editPages, title: 'Редактировать страницы', icon: <EditIcon/>},
    {url: processingTrackNumbersAdmin, title: 'Смена статуса посылок', icon: <EditIcon/>},
    {url: editInformation, title: 'Редактировать информацию', icon: <EditIcon/>},
    {url: addPaymentHandler, title: 'Пополнение баланса пользователя', icon: <PaidIcon/>},
    {url: cargoCreateUser, title: 'Создать пользователя', icon: <PersonAddAlt1Icon/>},
];

const warehousemanSetting = [
    {url: processingTrackNumbersAdmin, title: 'Смена статуса посылок', icon: <EditIcon/>},
];

const adminSettings = [
    {url: adminPagePath, title: 'Администратор', icon: <ManageAccountsIcon/>},
    {url: editUserProfile, title: 'Профиль пользователей', icon: <ManageAccountsIcon/>},
    // {url: packageHistory, title: 'История всех заказов', icon: <HistoryIcon/>},
    {url: newPackageRegister, title: 'Оформить заказ', icon: <AddIcon/>},
    {url: listFlightAdmin, title: 'Рейсы', icon: <FlightIcon/>},
    {url: addFlightAdmin, title: 'Добавить рейс', icon: <AddIcon/>},
    {url: editTariffGroup, title: 'Тарифы', icon: <ContentPasteSearchIcon/>},
    // {url: listPaymentsAdmin, title: 'Список пополнений', icon: <FactCheckIcon/>},
    {url: editPages, title: 'Редактировать страницы', icon: <EditIcon/>},
    {url: processingTrackNumbersAdmin, title: 'Смена статуса посылок', icon: <EditIcon/>},
    // {url: listBuyouts, title: 'Список заказов', icon: <FactCheckIcon/>},
    {url: editInformation, title: 'Редактировать информацию', icon: <EditIcon/>},
    {url: addPaymentHandler, title: 'Пополнение баланса пользователя', icon: <PaidIcon/>},
];

const theme = createTheme({
    breakpoints: {
        values: {
            sm: 768,
        },
    },
});

const useStyles = makeStyles(() => ({
    avatarContainer: {
        zIndex: '2',
        minWidth: '407px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            minWidth: '0',
            justifyContent: 'center',
        },
    },
}));

const UserMenu = () => {
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
        navigate(root);
    };

    return (
        <Grid className={classes.avatarContainer}>
            <Grid item>
            {(users?.role === 'admin' || users?.role === 'superAdmin') &&
                <IconButton
                    sx={{color: '#F5F5F7',}}
                    size="small"
                    component={Link}
                    to={adminPagePath}
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
                        {users.name[0]}
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
                    onClick={handleClose}
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
                        <Avatar src={users.avatar && apiURL + '/' + users?.avatar}/>
                        <Box marginLeft={2}>
                            <Typography>
                                {users.name}
                            </Typography>
                            <Typography>
                                {users.email}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider/>
                    {users.role === 'admin' && adminSettings.map(setting => (
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
                    {users.role === 'superAdmin' && superAdminSettings.map(setting => (
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
                    {users.role === 'warehouseman' && warehousemanSetting.map(setting => (
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
                    {users.role === 'user' &&
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
                                Ваш баланс {users?.balance + ' сом'}
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