import React from 'react';
import {useSelector} from "react-redux";
import {AppBar, Box, Slide, Toolbar, useScrollTrigger} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import {Link} from "react-router-dom";
import logo from '../../../../public/assets/logo.svg';
import UserMenu from "./Menu/UserMenu";
import Anonymous from "./Menu/Anonymous";
import {
    aboutCompany,
    contactsCompany,
    faqCompany,
    howCompany,
    newsCompany,
    root,
    rulesCompany,
    sitesCompany,
    wareHouseCompany
} from "../../../paths";
import theme from "../../../theme";


const pages = [
    {url: rulesCompany, title: 'правила'},
    {url: aboutCompany, title: 'о нас'},
    {url: contactsCompany, title: 'контакты'},
    {url: howCompany, title: 'как это работает ?'},
    {url: newsCompany, title: 'новости'},
    {url: sitesCompany, title: 'сайты'},
    {url: faqCompany, title: 'FAQ'},
    {url: wareHouseCompany, title: 'адреса складов'},
];

function HideOnScroll(props) {
    const {children, window} = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const toolbar = {
    display: {xs: "block", md: "none"},
}

const AppToolbar = (props) => {
    const user = useSelector(state => state.users.user);

    return (
        <Box sx={toolbar}>
            <HideOnScroll {...props}>
                <AppBar sx={{background: 'grey'}}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                <BurgerMenu pages={pages}/>
                            </Box>

                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                <Link to={root} style={theme.logo}>
                                    <img src={logo} alt="logo" style={{width: "40px"}}/>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{display: {xs: "none", sm: "block"}}}
                                    >
                                        Alga Express
                                    </Typography>
                                </Link>
                            </Box>

                            <Box sx={{flexGrow: 0}}>
                                {user ?
                                    <UserMenu
                                        user={user}
                                    />
                                    :
                                    <Anonymous/>}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
        </Box>
    );
};

export default AppToolbar;