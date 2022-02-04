import React, {useState} from 'react';
import {Button, Divider, IconButton, ListItemIcon, Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {Logout} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HistoryIcon from "@mui/icons-material/History";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from '@mui/icons-material/Notifications';
import FlightIcon from "@mui/icons-material/Flight";
import PersonIcon from "@mui/icons-material/Person";
import {logout} from "../../../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import {
    addFlightAdmin,
    listFlightAdmin,
    listPaymentsAdmin,
    newPackageRegister,
    packageHistory
} from "../../../../paths";

const userSettings = [
    {url: '', title: 'Личный кабинет', icon: <ManageAccountsIcon sx={{fontSize: 30}}/>},
    {url: packageHistory, title: 'История заказов', icon: <HistoryIcon sx={{fontSize: 30}}/>},
    {url: newPackageRegister, title: 'Оформить заказ', icon: <AddIcon sx={{fontSize: 30}}/>},
];

const adminSettings = [
    {url: listFlightAdmin, title: 'Рейсы', icon: <FlightIcon sx={{fontSize: 30}}/>},
    {url: addFlightAdmin, title: 'Добавить рейс', icon: <AddIcon sx={{fontSize: 30}}/>}
];

const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const payments = useSelector(state => state.payments.payment);
    const users = useSelector(state => state.users.user);


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
        <>
            {users?.role === 'admin' && (<IconButton
                color="inherit"
                component={Link}
                to={listPaymentsAdmin}
            >
                <Badge badgeContent={payments && payments.totalElements} color="error">
                    <NotificationsIcon/>
                </Badge>
            </IconButton>)}
            <Button
                sx={{color: '#F5F5F7',}}
                color='inherit'
                size='large'
                onClick={handleClick}
                startIcon={<PersonIcon/>}
            >
                {user?.name}
            </Button>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
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
                <Divider/>
                <MenuItem>
                    <ListItemIcon>
                        <AccountBalanceWalletIcon/>
                    </ListItemIcon>
                    Ваш баланс {user?.balance + ' сом'}
                </MenuItem>
                <MenuItem onClick={toLogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;