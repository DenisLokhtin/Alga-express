import React from 'react';
import {useSelector} from "react-redux";
import {AppBar, Box, Button, CssBaseline, Slide, Tab, Toolbar, useScrollTrigger} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import {Link, useNavigate} from "react-router-dom";
import logo from '../../../assets/logo.svg';
import {makeStyles} from "@mui/styles";
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
    sitesCompany
} from "../../../paths";
import {TabContext, TabList, TabPanel} from "@mui/lab";


const pages = [
    {url: rulesCompany, title: 'правила'},
    {url: aboutCompany, title: 'о нас'},
    {url: contactsCompany, title: 'контакты'},
    {url: howCompany, title: 'как это работает ?'},
    {url: newsCompany, title: 'новости'},
    {url: sitesCompany, title: 'сайты'},
    {url: faqCompany, title: 'FAQ'},
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

const AppToolbar = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const user = useSelector(state => state.users.user);

    const navigateTo = (url) => {
        navigate(url);
    };

    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <CssBaseline/>
            <HideOnScroll {...props}>
                <AppBar sx={{background: 'rgba(0,0,0,0.82)'}}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                            >
                                <Link to="/" className={classes.logo}>
                                    <img src={logo} alt="logo" style={{width: "40px"}}/>
                                    <span>Alga-Express</span>
                                </Link>
                            </Typography>

                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                <BurgerMenu pages={pages}/>
                            </Box>

                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                            >
                                <Link to={root} className={classes.logo}>
                                    <img src={logo} alt="logo" style={{width: "40px"}}/>
                                    <span>Alga-Express</span>
                                </Link>
                            </Typography>


                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>

                                {pages.map((page) => (
                                    <Button
                                        key={page.title}
                                        onClick={() => navigateTo(page.url)}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {page.title}
                                    </Button>
                                ))}
                            </Box>


                            <Box sx={{flexGrow: 0}}>
                                {user ?
                                    <UserMenu
                                        user={user}
                                    />
                                    :
                                    <Anonymous/>
                                }
                            </Box>
                        </Toolbar>

                        <Box sx={{width: '100%', typography: 'body1'}}>
                            <TabContext value={value}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        {/*<Tab icon={<IconButton><IconFlagUS/></IconButton>} value="1" label="США"/>*/}
                                        {/*<Tab icon={<IconButton><IconFlagCN/></IconButton>} value="2" label="Китай"/>*/}
                                        {/*<Tab icon={<IconButton><IconFlagTR/></IconButton>} value="3" label="Турция"/>*/}
                                        <Tab value="1" label="США"/>
                                        <Tab value="2" label="Китай"/>
                                        <Tab value="3" label="Турция"/>
                                    </TabList>
                                </Box>
                                <TabPanel value="1">Item One</TabPanel>
                                <TabPanel value="2">Item Two</TabPanel>
                                <TabPanel value="3">Item Three</TabPanel>
                            </TabContext>
                        </Box>
                    </Container>


                </AppBar>
            </HideOnScroll>
            <Toolbar/>
        </>
    );
};

export default AppToolbar;