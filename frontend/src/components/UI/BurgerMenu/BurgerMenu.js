import React from 'react';
import {
    Box, Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer,
    Toolbar
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import FlightIcon from '@mui/icons-material/Flight';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../store/actions/usersActions";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const usersButton = [
    {url: '', title: 'Личный кабинет', icon: <ManageAccountsIcon sx={{color: "#F5F5F7", fontSize: 30}}/>},
    {url: '/orders/history', title: 'История заказов', icon: <HistoryIcon sx={{color: "#F5F5F7", fontSize: 30}}/>},
    {url: '/package/register', title: 'Оформить заказ', icon: <AddIcon sx={{color: "#F5F5F7", fontSize: 30}}/>},
];

const adminButton = [
    {url: '/flights', title: 'Рейсы', icon: <FlightIcon sx={{color: "#F5F5F7", fontSize: 30}}/>},
    {url: '/newFlight', title: 'Добавить рейс', icon: <AddIcon sx={{color: "#F5F5F7", fontSize: 30}}/>}
];

const useStyles = makeStyles({
    paper: {
        width: '80vw',
        height: '100%',
        zIndex: 99,
        color: '#F5F5F7'
    },
    contentPaper: {
        background: '#424245',
        width: '100%',
        height: '100%'
    }
})

const BurgerMenu = ({open, setOpen}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    const toLogOut = () => {
        setOpen(false);
        dispatch(logout());
    };

    return (
        <SwipeableDrawer
            anchor='left'
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => {}}
        >
            <Box
                className={classes.paper}
                onKeyDown={() => setOpen(false)}
            >
                <Box>
                    <Toolbar sx={{background: 'rgba(0,0,0,0.82)'}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => setOpen(false)}
                            color="inherit"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </Box>

                <Box className={classes.contentPaper}>
                    <List>
                        {usersButton.map(item => (
                            <ListItemButton
                                key={item.title}
                                sx={{color: "#F5F5F7"}}
                                component={Link}
                                to={item.url}
                                onClick={() => setOpen(false)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText>
                                    {item.title}
                                </ListItemText>
                            </ListItemButton>
                        ))}
                        <Divider/>
                        {user.role === 'admin' &&
                            adminButton.map(item => (
                                <ListItemButton
                                    key={item.title}
                                    component={Link}
                                    to={item.url}
                                    onClick={() => setOpen(false)}
                                >
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText>
                                        {item.title}
                                    </ListItemText>
                                </ListItemButton>
                            ))
                        }
                        <Divider/>

                        <ListItemButton
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
                </Box>
            </Box>
        </SwipeableDrawer>
    );
};

export default BurgerMenu;