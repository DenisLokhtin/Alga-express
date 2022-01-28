import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppBar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from "react-router-dom";
import logo from '../../../assets/logo.svg';
import {makeStyles} from "@mui/styles";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HistoryIcon from "@mui/icons-material/History";
import AddIcon from "@mui/icons-material/Add";
import FlightIcon from "@mui/icons-material/Flight";
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {Logout} from "@mui/icons-material";
import {logout} from "../../../store/actions/usersActions";

const pages = [
    {url: '/rules', title: 'правила'},
    {url: '/about', title: 'о нас'},
    {url: '/contacts', title: 'контакты'},
    {url: '/how', title: 'как это работает ?'},
    {url: '/news', title: 'новости'},
    {url: '/sites', title: 'сайты'},
    {url: '/faq', title: 'FAQ'},
];

const userSettings = [
    {url: '', title: 'Личный кабинет', icon: <ManageAccountsIcon sx={{fontSize: 30}}/>},
    {url: '/orders/history', title: 'История заказов', icon: <HistoryIcon sx={{fontSize: 30}}/>},
    {url: '/package/register', title: 'Оформить заказ', icon: <AddIcon sx={{fontSize: 30}}/>},
];

const adminSettings = [
    {url: '/flights', title: 'Рейсы', icon: <FlightIcon sx={{fontSize: 30}}/>},
    {url: '/newFlight', title: 'Добавить рейс', icon: <AddIcon sx={{fontSize: 30}}/>}
];

const useStyles = makeStyles({
    logo: {
        color: '#F5F5F7',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center'
    },
    userBtn: {
        color: '#F5F5F7',
    }
})

const AppToolbar = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const [openNav, setOpenNav] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const user = useSelector(state => state.users.user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateTo = (url) => {
        navigate(url);
    }

    const toLogOut = () => {
        setAnchorEl(false);
        dispatch(logout());
    };

    return (
        <AppBar position="static" sx={{background: 'rgba(0,0,0,0.82)'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <Link to="/" className={classes.logo}>
                            <img src={logo} alt="logo" style={{width: "40px"}}/>
                            <span>Alga-Express</span>
                        </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => setOpenNav(true)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <BurgerMenu open={openNav} setOpen={setOpenNav}/>
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <Link to="/" className={classes.logo} >
                            <img src={logo} alt="logo" style={{width: "40px"}}/>
                            <span>Alga-Express</span>
                        </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => navigateTo(page.url)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            className={classes.userBtn}
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
                                Ваш баланс {user?.balance + ' сом'}
                            </MenuItem>
                            <MenuItem onClick={toLogOut}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Выйти
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppToolbar;