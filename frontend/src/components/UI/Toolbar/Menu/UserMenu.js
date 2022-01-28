import React from 'react';
import {Divider, ListItemIcon, Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {Logout} from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HistoryIcon from "@mui/icons-material/History";
import AddIcon from "@mui/icons-material/Add";
import FlightIcon from "@mui/icons-material/Flight";

const userSettings = [
    {url: '', title: 'Личный кабинет', icon: <ManageAccountsIcon sx={{fontSize: 30}}/>},
    {url: '/orders/history', title: 'История заказов', icon: <HistoryIcon sx={{fontSize: 30}}/>},
    {url: '/package/register', title: 'Оформить заказ', icon: <AddIcon sx={{fontSize: 30}}/>},
];

const adminSettings = [
    {url: '/flights', title: 'Рейсы', icon: <FlightIcon sx={{fontSize: 30}}/>},
    {url: '/newFlight', title: 'Добавить рейс', icon: <AddIcon sx={{fontSize: 30}}/>}
];

const UserMenu = ({user, anchorEl, open, handleClose, toLogOut}) => {
    return (
        <>
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
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
                    Ваш баланс {user?.user?.balance + ' сом'}
                </MenuItem>
                <MenuItem onClick={toLogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;