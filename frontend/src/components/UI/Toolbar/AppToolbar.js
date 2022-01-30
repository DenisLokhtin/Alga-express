import React from 'react';
import {useSelector} from "react-redux";
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import {Link, useNavigate} from "react-router-dom";
import logo from '../../../assets/logo.svg';
import {makeStyles} from "@mui/styles";
import UserMenu from "./Menu/UserMenu";
import Anonymous from "./Menu/Anonymous";

const pages = [
    {url: '/rules', title: 'правила'},
    {url: '/about', title: 'о нас'},
    {url: '/contacts', title: 'контакты'},
    {url: '/how', title: 'как это работает ?'},
    {url: '/news', title: 'новости'},
    {url: '/sites', title: 'сайты'},
    {url: '/faq', title: 'FAQ'},
];

const useStyles = makeStyles({
    logo: {
        color: '#F5F5F7',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center'
    }
})

const AppToolbar = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const user = useSelector(state => state.users.user);

    const navigateTo = (url) => {
        navigate(url);
    }

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
                        <BurgerMenu pages={pages}/>
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
                        {user ?
                            <UserMenu user={user}/>
                            :
                            <Anonymous/>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppToolbar;