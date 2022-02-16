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
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";
import logo from "../../../assets/logo.svg";
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
    sitesCompany, wareHouseCompany
} from "../../../paths";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const pages = [
    {title: "Новости", icon: <NewspaperIcon/>, url: newsCompany},
    {title: "Правила", icon: <ReceiptLongIcon/> , url: rulesCompany},
    {title: "Контакты", icon: <ContactPhoneIcon/>, url: contactsCompany},
    {title: "Как это работает?", icon: <QuestionMarkIcon/>, url: howCompany},
    {title: "О нас", icon: <InfoIcon/>, url: aboutCompany},
    {title: "Где покупать?", icon: <StoreIcon/>, url: sitesCompany},
    {title: "FAQ", icon: <LiveHelpIcon/>, url: faqCompany},
    {title: "Адреса складов", icon: <BusinessIcon/>, url: wareHouseCompany},
];

const styles = {
    boxContainer: {
        position: "fixed",
        top: "0",
        left: "0",
        display: {md: "flex", xs: "none"},
        flexDirection: "column",
        overflowY: "auto",
        height: "100vh",
        width: "300px",
        background: "grey",
        padding: "6px 14px"
    },
    pages: {
        flexGrow: "999",
        alignSelf: "start",
        width: "100%",
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
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={styles.boxContainer}>
            <Link to="/" className={classes.logo}>
                <img src={logo} alt="logo" style={{width: "40px"}}/>
                <span>Alga Express</span>
            </Link>

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

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '100%', flexShrink: 0 }}>

                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box sx={styles.user}>
                {user ?
                    <UserMenu user={user}/>
                    :
                    <Anonymous/>}
            </Box>
        </Box>
    );
};

export default AppSidebar;