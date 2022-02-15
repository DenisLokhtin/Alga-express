import React, {useState} from 'react';
import {Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {Logout} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HistoryIcon from "@mui/icons-material/History";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FlightIcon from "@mui/icons-material/Flight";
import {logout} from "../../../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import Fade from '@mui/material/Fade';
import {
    addFlightAdmin,
    editPages,
    listFlightAdmin,
    listPaymentsAdmin,
    newPackageRegister,
    orderBuyouts,
    packageHistory
} from "../../../../paths";
import Avatar from "@mui/material/Avatar";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EditIcon from '@mui/icons-material/Edit';

const userSettings = [
    {url: '', title: 'Личный кабинет', icon: <ManageAccountsIcon/>},
    {url: packageHistory, title: 'История заказов', icon: <HistoryIcon/>},
    {url: newPackageRegister, title: 'Оформить заказ', icon: <AddIcon/>},
];

const adminSettings = [
    {url: listFlightAdmin, title: 'Рейсы', icon: <FlightIcon/>},
    {url: addFlightAdmin, title: 'Добавить рейс', icon: <AddIcon/>},
    {url: listPaymentsAdmin, title: 'Список пополнений', icon: <FactCheckIcon/>},
    {url: editPages, title: 'Редактировать страницы', icon: <EditIcon/>},
];

const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const payments = useSelector(state => state.payments.payment);
    const users = useSelector(state => state.users.user);
    const buyouts = useSelector(state => state.buyouts.buyouts);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toLogOut = () => {
        setAnchorEl(false);
        dispatch(logout());
    };

    return (
        <Grid container alignItems="center" justifyContent="space-evenly">
            <Grid item>
                <IconButton
                    sx={{color: '#F5F5F7'}}
                    component={Link}
                    size="small"
                    to={orderBuyouts}
                >
                    <Badge badgeContent={buyouts && buyouts.total} color="error">
                        <AddShoppingCartIcon/>
                    </Badge>
                </IconButton>
            </Grid>

            <Grid item>
            {users?.role === 'admin' &&
                <IconButton
                    sx={{color: '#F5F5F7',}}
                    size="small"
                    component={Link}
                    to={listPaymentsAdmin}
                >
                    <Badge badgeContent={payments && payments.totalElements} color="error">
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

                    {user.role === 'user' &&
                        <>
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
                        </>}

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