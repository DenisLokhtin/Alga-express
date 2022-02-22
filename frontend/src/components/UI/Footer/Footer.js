import React from 'react';
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import {
    aboutCompany,
    contactsCompany,
    faqCompany,
    howCompany,
    newsCompany,
    rulesCompany,
    sitesCompany
} from "../../../paths";
import {Box, IconButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import theme from "../../../theme";

const pages = [
    {title: "Новости", url: newsCompany},
    {title: "Правила", url: rulesCompany},
    {title: "Контакты", url: contactsCompany},
    {title: "Как это работает?", url: howCompany},
    {title: "О нас", url: aboutCompany},
    {title: "Где покупать?", url: sitesCompany},
    {title: "FAQ", url: faqCompany},
];

const useStyles = makeStyles({
    link: {
        color: "white",
        textDecoration: "none"
    },
    netLinks: {
        display: "flex"
    }
})

const Footer = () => {
    const classes = useStyles();

    return (
        <footer style={theme.footer}>
            <Grid container sx={{flexWrap: "wrap"}}>
                <Grid item xs={12} md={6} lg={4}>
                    <Box style={theme.pages}>
                        {pages.map(item => (
                            <Link key={item.url} to={item.url} className={classes.link} style={{display: "block"}}>
                                {item.title}
                            </Link>
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Box style={theme.address}>
                        <Typography variant="h6" sx={{display: "flex"}}>
                            <LocationOnIcon/> Бишкек
                        </Typography>
                        <Typography>
                            Юнусалиева, 142
                        </Typography>

                        <Typography>
                            Тел.: 0 774 769 434 (Выкуп)
                        </Typography>
                        <Typography>
                            ️0 702 465 333 (Склад)
                        </Typography>
                        <Box className={classes.netLinks}>
                            <IconButton component={Link} to="https://www.instagram.com/alga_express/">
                                <InstagramIcon sx={{color: "white"}}/>
                            </IconButton>

                            <IconButton component={Link} to="https://api.whatsapp.com/send?phone=996774769434">
                                <WhatsAppIcon sx={{color: "white"}}/>
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;