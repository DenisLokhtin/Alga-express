import * as React from 'react';
import {Box, ListItemIcon, ListItemText, MenuItem, MenuList} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";
import logo from "../../../assets/logo.svg";
import Container from "@mui/material/Container";
import {useSelector} from "react-redux";
import Anonymous from "../Toolbar/Menu/Anonymous";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import InfoIcon from '@mui/icons-material/Info';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import StoreIcon from '@mui/icons-material/Store';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import UserMenu from "../Toolbar/Menu/UserMenu";
import {
    aboutCompany,
    contactsCompany,
    faqCompany,
    howCompany,
    newsCompany,
    rulesCompany,
    sitesCompany
} from "../../../paths";

const pages = [
    {title: "Новости", icon: <NewspaperIcon/>, url: newsCompany},
    {title: "Правила", icon: <ReceiptLongIcon/> , url: rulesCompany},
    {title: "Контакты", icon: <ContactPhoneIcon/>, url: contactsCompany},
    {title: "Как это работает?", icon: <QuestionMarkIcon/>, url: howCompany},
    {title: "О нас", icon: <InfoIcon/>, url: aboutCompany},
    {title: "Где покупать?", icon: <StoreIcon/>, url: sitesCompany},
    {title: "FAQ", icon: <LiveHelpIcon/>, url: faqCompany},
];

const styles = {
    boxContainer: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%"
    },
    pages: {
        flexGrow: "999",
        alignSelf: "start",
        width: "100%"
    },
    user: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
        width: "100%"
    },
}

const useStyles = makeStyles({
    logo: {
        color: '#F5F5F7',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
        margin: "10px 0"
    },
})

const AppSidebar = () => {
    const classes = useStyles();
    const user = useSelector(state => state.users.user);

    return (
        <Container>
            <Box sx={styles.boxContainer}>
                <Box>
                    <Link to="/" className={classes.logo}>
                        <img src={logo} alt="logo" style={{width: "40px"}}/>
                        <span>Alga Express</span>
                    </Link>
                </Box>

                <Box sx={styles.pages}>
                    <MenuList>
                        {pages.map(page => (
                            <MenuItem
                                key={page.title}
                                component={Link}
                                to={page.url}
                                sx={{color: "#F5F5F7"}}
                            >
                                <ListItemIcon
                                    sx={{color: "#F5F5F7"}}
                                >
                                    {page.icon}
                                </ListItemIcon>
                                <ListItemText>
                                    {page.title}
                                </ListItemText>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Box>

                <Box sx={styles.user}>
                    {user ?
                        <UserMenu user={user}/>
                        :
                        <Anonymous/>
                    }
                </Box>
            </Box>

        </Container>
    );
};

export default AppSidebar;