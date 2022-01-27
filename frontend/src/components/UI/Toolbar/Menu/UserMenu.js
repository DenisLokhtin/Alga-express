import React, {useEffect, useState} from 'react';
import './UserMenu.css';
import PersonIcon from '@mui/icons-material/Person';
import {Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';
import {Logout} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../../store/actions/usersActions";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {Link} from "react-router-dom";
import FlightIcon from '@mui/icons-material/Flight';

const UserMenu = ({setOpen}) => {
    const dispatch = useDispatch();
    const [width, setWidth] = useState(window.innerWidth);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const user = useSelector(state => state.users.user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toLogOut = () => {
        setOpen(false);
        dispatch(logout());
    };

    let renderComponent = (
        <>
            <IconButton
                onClick={handleClick}
            >
                <PersonIcon sx={{fontSize: 30, color: "#F5F5F7"}}/>
                <span className="text">{user?.name}</span>
            </IconButton>
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
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
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
                <MenuItem>
                    <ListItemIcon>
                        <ManageAccountsIcon/>
                    </ListItemIcon>
                    Личный кабинет
                </MenuItem>
                <MenuItem component={Link} to={'/orders/history'}>
                    <ListItemIcon>
                        <HistoryIcon/>
                    </ListItemIcon>
                    История заказов
                </MenuItem>
                <MenuItem component={Link} to={'/package/register'}>
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                    Оформить заказ
                </MenuItem>
                <Divider/>
                {user.role === 'admin' &&
                    <>
                        <MenuItem
                            component={Link}
                            to={'/flights'}
                        >
                            <ListItemIcon>
                                <FlightIcon/>
                            </ListItemIcon>
                            Рейсы
                        </MenuItem>

                        <MenuItem
                            component={Link}
                            to={'/newFlight'}
                        >
                            <ListItemIcon>
                                <AddIcon/>
                            </ListItemIcon>
                            Добавить рейс
                        </MenuItem>
                    </>
                }
                <Divider/>
                <MenuItem>
                    <ListItemIcon>
                        <AccountBalanceWalletIcon/>
                    </ListItemIcon>
                    Ваш баланс {user?.balance + ' сом'}
                </MenuItem>
                <MenuItem onClick={toLogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </>
    )

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        });

        return () => {
            setWidth(window.innerWidth);
        }
    }, []);

    if (width < 900) {
        renderComponent = (
            <List>
                <ListItemButton
                    sx={{color: "#F5F5F7"}}
                    //Здесь будет onclick
                >
                    <ListItemIcon>
                        <ManageAccountsIcon sx={{color: "#F5F5F7", fontSize: 30}}/>
                    </ListItemIcon>
                    <ListItemText>
                        Личный кабинет
                    </ListItemText>
                </ListItemButton>
                <ListItemButton
                    sx={{color: "#F5F5F7"}}
                    component={Link} to={'/orders/history'}
                    //Здесь будет onclick
                >
                    <ListItemIcon>
                        <HistoryIcon sx={{color: "#F5F5F7", fontSize: 30}}/>
                    </ListItemIcon>
                    <ListItemText>
                        История заказов
                    </ListItemText>
                </ListItemButton>
                <ListItemButton
                    sx={{color: "#F5F5F7"}}
                    component={Link} to={'/package/register'}
                    // onClick={setOpen}
                >
                    <ListItemIcon>
                        <AddIcon sx={{color: "#F5F5F7", fontSize: 30}}/>
                    </ListItemIcon>
                    <ListItemText>
                        Оформить заказ
                    </ListItemText>
                </ListItemButton>

                <Divider/>
                {user.role === 'admin' &&
                    <>
                        <ListItemButton
                            sx={{color: "#F5F5F7"}}
                            component={Link}
                            to='/flights'
                        >
                            <ListItemIcon>
                                <FlightIcon sx={{color: "#F5F5F7", fontSize: 30}}/>
                            </ListItemIcon>
                            <ListItemText>
                                Рейсы
                            </ListItemText>
                        </ListItemButton>

                        <ListItemButton
                            sx={{color: "#F5F5F7"}}
                            component={Link}
                            to='/newFlight'
                        >
                            <ListItemIcon>
                                <AddIcon sx={{color: "#F5F5F7", fontSize: 30}}/>
                            </ListItemIcon>
                            <ListItemText>
                                Добавить рейс
                            </ListItemText>
                        </ListItemButton>
                    </>
                }
                <Divider/>

                <ListItemButton
                    sx={{color: "#F5F5F7"}}
                    onClick={toLogOut}
                >
                    <ListItemIcon>
                        <LogoutIcon sx={{color: "#F5F5F7", fontSize: 30}}/>
                    </ListItemIcon>
                    <ListItemText>
                        Выйти
                    </ListItemText>
                </ListItemButton>
            </List>
        );
    }

    return renderComponent;
};

export default UserMenu;