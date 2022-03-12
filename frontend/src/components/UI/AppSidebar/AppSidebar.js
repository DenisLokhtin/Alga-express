import * as React from 'react';
import {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import logo from "../../../assets/images/logo.svg";
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
import BusinessIcon from '@mui/icons-material/Business';
import {
    aboutCompany,
    contactsCompany,
    faqCompany,
    howCompany,
    newsCompany,
    rulesCompany,
    sitesCompany,
    wareHouseCompany
} from "../../../paths";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from "../../../theme";


const pages = [
    {title: "Новости", icon: <NewspaperIcon/>, url: newsCompany},
    {title: "Правила", icon: <ReceiptLongIcon/>, url: rulesCompany},
    {title: "Контакты", icon: <ContactPhoneIcon/>, url: contactsCompany},
    {title: "Как это работает?", icon: <QuestionMarkIcon/>, url: howCompany},
    {title: "О нас", icon: <InfoIcon/>, url: aboutCompany},
    {title: "Где покупать?", icon: <StoreIcon/>, url: sitesCompany},
    {title: "FAQ", icon: <LiveHelpIcon/>, url: faqCompany},
    {title: "Адреса складов", icon: <BusinessIcon/>, url: wareHouseCompany},
];

const AppSidebar = () => {
    const user = useSelector(state => state.users.user);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const scroll = () => {
        window.focus();
        window.scroll({
            top: 100,
            left: 100,
            behavior: 'smooth'
        });
    };

    return (
        <Box sx={theme.boxContainer}>
            <Link to="/" style={theme.logo}>
                <img src={logo} alt="logo" style={{width: "40px"}}/>
                <span>Alga Express</span>
            </Link>

            <Box style={theme.pages}>
                <MenuList>
                    {pages.map(page => (
                        <MenuItem
                            key={page.title}
                            component={Link}
                            onClick={() => scroll()}
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

            <Box style={theme.user}>
                <Box>
                    {user ?
                        <UserMenu user={user}/>
                        :
                        <Anonymous/>}
                </Box>
            </Box>
        </Box>
    );
};

export default AppSidebar;